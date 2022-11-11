<?php

namespace App\Http\Controllers;

use App\Api\Core;
use App\Constants\Status;
use App\Contracts\FileUploadContract;
use App\Http\Requests\ProductRateRequest;
use App\Model\Product;
use App\Model\Rate;
use App\Services\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Session;

class BEProductRateController extends Controller
{
    protected $_apiCore;
    protected $_viewer = null;
    protected $_uploadService;

    public function __construct(Core $core, FileUpload $uploadService)
    {
        $this->_apiCore = $core;
        $this->_uploadService =  $uploadService;

        $this->middleware(function ($request, $next) {
            $this->_viewer = $this->_apiCore->getViewer();

            //
            if ($this->_viewer &&
                ($this->_viewer->isDeleted() || $this->_viewer->isBlocked() || !$this->_viewer->isStaff())
            ) {
                return redirect('/invalid');
            }

            return $next($request);
        });

        $this->middleware('auth');
    }

    public function index()
    {
        if (!$this->_viewer->isAllowed('product_rate_view')) {
            return redirect('/private');
        }

        $rates = Rate::with('products')
            ->paginate(config('constants.rate.pagination.per_page'));
        $products = Product::where('deleted', 0)->get();

        $values = [
            'page_title' => 'Đánh giá sản phẩm',
            'rates' => $rates,
            'products' => $products
        ];

        return view('pages.back_end.product_rates.index', $values);
    }

    public function store(ProductRateRequest $request)
    {
        if (!$this->_viewer->isAllowed('product_rate_add')) {
            return redirect('/private');
        }

        try {
            if($request->has('avatar')) {
                $file  = $this->_uploadService
                    ->upload($request->file('avatar'), 'public');
            }

            $rate = Rate::create([
                'name' => $request->post('name'),
                'role' => $request->post('role'),
                'vote' => $request->post('vote'),
                'content' => $request->post('content'),
                'avatar' => isset($file) ? $file->toArray()['name'] : '',
                'status' => 1,
            ]);

            $productIds = $request->post('product_ids');
            $rate->products()->attach($productIds);

            Session::put('MESSAGE', 'ITEM_ADDED');
        } catch (\Exception $ex) {

        }

        return redirect('/admin/product-rates');
    }

    public function update(ProductRateRequest $request, $id)
    {
        if (!$this->_viewer->isAllowed('product_rate_edit')) {
            return redirect('/private');
        }

        try {
            $rate = Rate::find($id);

            if($rate) {
                $rate->update([
                    'name' => $request->post('name'),
                    'role' => $request->post('role'),
                    'vote' => $request->post('vote'),
                    'content' => $request->post('content'),
                ]);
                $product_ids = $request->post('product_ids');

                if($rate->products) {
                    $rate->products()->detach();
                    $rate->products()->attach(Arr::wrap($product_ids));
                }

                $rate->save();
                Session::put('message', 'OK');
            }
        } catch (\Exception $ex) {
            Session::put('message', $ex->getMessage());
        }

        return redirect('/admin/product-rates')
            ->with('message', Session::get('message'));
    }

    public function updateStatus(Request $request, $id)
    {
        if (!$this->_viewer->isAllowed('product_rate_edit')) {
            return redirect('/private');
        }

        $rate = Rate::find($id);

        if ($rate) {
            try {
                $rate->status = $rate->status == Status::ACTIVE ?
                    Status::INACTIVE : Status::ACTIVE;
                $rate->save();

                $this->_apiCore->addLog([
                    'user_id' => $this->_viewer->id,
                    'action' => 'policy_setting_update',
                    'item_id' => $rate->id,
                    'item_type' => 'policy_setting',
                    'params' => json_encode([
                        'type' => 'active',
                        'value' => $rate,
                    ])
                ]);
            } catch (\Exception $ex) {

            }

            Session::put('MESSAGE', 'ITEM_UPDATED');
        }

        return response()->json([]);
    }

    public function destroy(Request $request, $id)
    {
        try {
            $rate = Rate::find($id);

            if($rate) {
                $rate->products()->delete();
                $rate->delete();
            }

        } catch (\Exception $ex) {

        }

        return redirect('/admin/product-rates');
    }
}
