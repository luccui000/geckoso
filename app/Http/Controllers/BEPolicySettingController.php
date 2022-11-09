<?php

namespace App\Http\Controllers;

use App\Api\Core;
use App\Http\Requests\PolicySettingRequest;
use App\Model\PolicySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class BEPolicySettingController extends Controller
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
        if (!$this->_viewer->isAllowed('policy_setting')) {
            return redirect('/private');
        }

        $policies = PolicySetting::get();

        $values = [
            'page_title' => 'Chính sách và điều khoản',
            'items' => $policies
        ];

        return view("pages.back_end.policy.index", $values);
    }

    public function create()
    {
        if (!$this->_viewer->isAllowed('policy_setting_create')) {
            return redirect('/private');
        }

        $values = [
            'page_title' => 'Thêm mới chính sách điều khoản'
        ];

        return view("pages.back_end.policy.create", $values);
    }

    public function store(PolicySettingRequest $request)
    {
        $values = $request->post();

        $order = PolicySetting::max('order');
        $values['href'] = Str::slug($values['href']);
        $values['order'] = $order;
        $values['active']  = $values['active'] ?? 0;

        $policy = PolicySetting::create($values);

        return redirect('/admin/policy-settings')->with('MESSAGE', 'ITEM_ADDED');
    }

    public function edit(Request $request, $id)
    {
        if (!$this->_viewer->isAllowed('policy_setting_edit')) {
            return redirect('/private');
        }

        $policy = PolicySetting::findOrFail($id);

        $values = [
            'page_title'    => 'Thay đổi chính sách điều khoản',
            'policy'        => $policy,
            'id'            => $id
        ];

        return view("pages.back_end.policy.edit", $values);
    }

    public function update(Request $request, $id)
    {
        if (!$this->_viewer->isAllowed('policy_setting_update')) {
            return redirect('/private');
        }
        $policy = PolicySetting::findOrFail($id);

        if($policy) {
            $policy->title  = $request->input('title', $policy->title);
            $policy->href   = $request->input('href', $policy->href);
            $policy->content = $request->input('content', $policy->content);
            $policy->save();
        }

        Session::put('MESSAGE', 'ITEM_UPDATED');
        return redirect('/admin/policy-settings');
    }

    public function updateStatus(Request $request)
    {
        if (!$this->_viewer->isAllowed('policy_setting_edit')) {
            return redirect('/private');
        }

        $values = $request->post();

        $itemId = $values['item_id'] ?? 0;
        $value = $values['value'] ?? 0;

        $policySetting = PolicySetting::find($itemId);

        if ($policySetting) {
            $policySetting->active = $value;
            $policySetting->save();

            $this->_apiCore->addLog([
                'user_id' => $this->_viewer->id,
                'action' => 'policy_setting_update',
                'item_id' => $policySetting->id,
                'item_type' => 'policy_setting',
                'params' => json_encode([
                    'type' => 'active',
                    'value' => $value,
                ])
            ]);

            Session::put('MESSAGE', 'ITEM_UPDATED');
        }

        return response()->json([]);
    }

    public function destroy(Request $request, $id)
    {
        if (!$this->_viewer->isAllowed("policy_setting_delete")) {
            return redirect('/private');
        }

        $policy = PolicySetting::findOrFail($id);

        if($policy) {
            $policy->delete();
        }

        Session::put('MESSAGE', 'ITEM_DELETED');

        return redirect('/admin/policy-settings');
    }
}
