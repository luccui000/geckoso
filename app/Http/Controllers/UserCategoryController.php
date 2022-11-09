<?php

namespace App\Http\Controllers;

use App\Api\Core;
use App\Http\Requests\UserCategoryRequest;
use App\Model\UserCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class UserCategoryController extends Controller
{
    protected $_apiCore = null;
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
        if (!$this->_viewer->isAllowed('user_category_view')) {
            return redirect('/private');
        }

        $userCategories = UserCategory::with(['child'])
            ->whereNull('parent_id')
            ->get();

        $values = [
            'page_title' => 'Nhóm khách hàng',
            'userCategories' => $userCategories
        ];

        return view('pages.back_end.user_categories.index', $values);
    }

    public function store(UserCategoryRequest $request)
    {
        if (!$this->_viewer->isAllowed('user_category_add')) {
            return redirect('/private');
        }

        $values = $request->only(['name', 'parent_id']);

        if(isset($values['parent_id']) && $values['parent_id'] == 0)
            unset($values['parent_id']);

        $userCategory = UserCategory::create($values);

        Session::put('MESSAGE', 'ITEM_ADDED');

        return redirect('/admin/client-categories');
    }

    public function update(UserCategoryRequest $request, $id)
    {
        if (!$this->_viewer->isAllowed('user_category_edit')) {
            return redirect('/private');
        }

        try {
            $userCategory = UserCategory::findOrFail($id);

            if($userCategory) {
                $userCategory->update($request->only(['name', 'parent_id']));
            }
        } catch (\Exception $ex) {

        }

        Session::put('MESSAGE', 'ITEM_UPDATED');

        return redirect('/admin/client-categories');
    }

    public function destroy(Request $request, $id)
    {
        if (!$this->_viewer->isAllowed('user_category_edit')) {
            return redirect('/private');
        }

        try {
            $userCategory = UserCategory::findOrFail($id);

            if($userCategory) {
                $userCategory->delete();
            }
        } catch (\Exception $ex) {

        }

        Session::put('MESSAGE', 'ITEM_DELETED'); 
        return redirect('/admin/client-categories');
    }
}
