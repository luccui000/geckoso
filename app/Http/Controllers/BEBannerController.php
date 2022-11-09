<?php

namespace App\Http\Controllers;

use App\Api\Core;
use App\Http\Requests\BannerRequest;
use App\Model\Banner;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Session;

class BEBannerController extends Controller
{
    protected $_apiCore;
    protected $_viewer = null;

    public function __construct()
    {
        $this->_apiCore = new Core();
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
        if (!$this->_viewer->isAllowed('banner_setting')) {
            return redirect('/private');
        }

        $banners = Banner::orderBy('order', 'asc')
            ->get();

        $values = [
            'page_title' => 'Danh sách banner',
            'banners' => $banners
        ];

        return view('pages.back_end.banners.index', $values);
    }

    public function store(BannerRequest $request)
    {
        if (!$this->_viewer->isAllowed('banner_setting_add')) {
            return redirect('/private');
        }
        $values = $request->post();
        unset($values['_token']);

        if($request->has('desktop_image')) {
            $filename = $this->_saveImage($request->file('desktop_image'));
            $values['desktop_image' ] = $filename;
        }
        if($request->has('mobile_image')) {
            $filename = $this->_saveImage($request->file('mobile_image'));
            $values['mobile_image' ] = $filename;
        }
        $bannerMaxOrder = Banner::max('order') ?? 0;
        $values['order'] = $bannerMaxOrder + 1;
        $banner = Banner::create($values);

        Session::put('MESSAGE', 'ITEM_ADDED');

        return redirect('/admin/banners');
    }

    public function update(Request $request)
    {
        if (!$this->_viewer->isAllowed('banner_setting_edit')) {
            return redirect('/private');
        }

        $titles = $request->input('title', []);
        $links = $request->input('link', []);
        $desktop_images = $request->file('desktop_image', []);
        $mobile_images = $request->file('mobile_image', []);

        $data = [];

        foreach ($titles as $banner_id => $title) {
            $data[$banner_id]['title'] = $title;
        }
        foreach ($links as $banner_id => $link) {
            $data[$banner_id]['link'] = $link;
        }
        foreach ($desktop_images as $banner_id => $desktop_image) {
            $data[$banner_id]['desktop_image'] = $desktop_image;
        }
        foreach ($mobile_images as $banner_id => $mobile_image) {
            $data[$banner_id]['mobile_image'] = $mobile_image;
        }

        foreach ($data as $id => $item) {
            $banner = Banner::find($id);

            if(isset($item['desktop_image'])) {
                $prevPath = public_path('storage/' . $banner->desktop_image);
                if(file_exists($prevPath))
                    unlink($prevPath);
                $item['desktop_image'] = $this->_saveImage($item['mobile_image']);
            }
            if(isset($item['mobile_image'])) {
                $prevPath = public_path('storage/' . $banner->mobile_image);
                if(file_exists($prevPath))
                    unlink($prevPath);
                $item['mobile_image'] = $this->_saveImage($item['mobile_image']);
            }
            $banner->update($item);
        }

        Session::put('MESSAGE', 'ITEM_UPDATED');

        return redirect('/admin/banners');
    }

    public function updateStatus(Request $request)
    {
        if (!$this->_viewer->isAllowed('banner_setting_edit')) {
            return redirect('/private');
        }

        $values = $request->post();

        $itemId = $values['item_id'] ?? 0;
        $value = $values['value'] ?? 0;

        $banner = Banner::find($itemId);

        if ($banner) {
            $banner->active = $value;
            $banner->save();

            $this->_apiCore->addLog([
                'user_id' => $this->_viewer->id,
                'action' => 'banner_setting_update',
                'item_id' => $banner->id,
                'item_type' => 'banner_setting',
                'params' => json_encode([
                    'type' => 'active',
                    'value' => $value,
                ])
            ]);

            Session::put('MESSAGE', 'ITEM_UPDATED');
        }

        return response()->json([]);
    }

    private function _saveImage(UploadedFile $file)
    {
        $org = base64_encode($file->getClientOriginalName());
        $ext = $file->getClientOriginalExtension();
        $filename = $org . '.' . $ext;
        $file->storeAs('public', $filename);
        return ltrim($filename, '/');
    }
}
