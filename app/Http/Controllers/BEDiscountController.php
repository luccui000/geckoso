<?php

namespace App\Http\Controllers;

use App\Api\Core;
use App\Constants\Status;
use App\Http\Requests\DiscountRequest;
use App\Model\Discount;
use App\Model\UserCategory;
use Illuminate\Http\Request;

class BEDiscountController extends Controller
{
    protected $_apiCore;
    protected $_viewer = null;

    public function __construct(Core $core)
    {
        $this->_apiCore = $core;
        $this->middleware('auth');
    }

    public function index()
    {
        abort_if_user_cant('discount_view');

        $userCategories = UserCategory::with(['discount', 'child.discount'])
            ->whereNull('parent_id')
            ->get();

        $values = [
            'page_title' => 'Danh sách ưu đãi dành cho nhóm khách hàng',
            'userCategories' => $userCategories,
        ];

        return view('pages.back_end.discounts.index', $values);
    }

    public function store(DiscountRequest $request)
    {
        abort_if_user_cant('discount_add');

        try {
            $id = $request->post('user_category_id');
            $uCategory = UserCategory::find($id);

            if($uCategory) {
                $uCategory->discount()->create([
                    'type'  => $request->post('type'),
                    'value' => $request->post('value'),
                    'active'=> 1,
                ]);
            }
        } catch (\Exception $ex) {

        }

        return redirect('/admin/client-discounts');
    }

    public function update(DiscountRequest $request, $id)
    {
        abort_if_user_cant('discount_edit');

        try {
            $uCategory = UserCategory::find($id);
            $discount = $uCategory->discount;

            if($uCategory && $discount) {
                $discount->update([
                    'type'  => $request->post('type'),
                    'value' => $request->post('value'),
                ]);
            } else if($uCategory && !$discount) {
                $uCategory->discount()->create([
                    'type'  => $request->post('type'),
                    'value' => $request->post('value'),
                    'active'=> 1,
                ]);
            }
        } catch (\Exception $ex) {

        }

        return redirect('/admin/client-discounts');
    }

    public function updateStatus(Request $request, $id)
    {
        abort_if_user_cant('discount_edit');
        try {
            $userCategory = UserCategory::find($id);
            $discount = $userCategory->discount;
            if(!$userCategory || !$discount) {
                return response()->json([
                    'message' => 'Cant update'
                ]);
            }

            $discount->active = $discount->active ? Status::INACTIVE : Status::ACTIVE;
            $discount->save();
        } catch (\Exception $ex) {

        }

        return response()->json([
            'message' => 'Update successfully'
        ]);
    }

    public function destroy(Request $request, $id)
    {
        abort_if_user_cant('discount_delete');

        try {
            $uCategory = UserCategory::find($id);
            $discount = $uCategory->discount;

            if($uCategory && $discount) {
                $discount->delete();
            }
        } catch (\Exception $ex) {

        }

        return redirect('/admin/client-discounts');
    }
}
