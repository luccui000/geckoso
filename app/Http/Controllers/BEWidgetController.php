<?php

namespace App\Http\Controllers;

use App\Api\Core;
use App\Model\Widget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class BEWidgetController extends Controller
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

    public function reload()
    {
        if (!$this->_viewer->isAllowed('widget_reload') || !$this->_viewer->isAdmin()) {
            return redirect('/private');
        }
        $resource = resource_path('views/widgets/front_end');
        $files = collect(scandir($resource))
            ->filter(function($item) {
                return str_contains($item, '.blade.php');
            })
            ->map(function($item) {
                $view = str_replace('.blade.php', '', $item);
                return 'widgets.front_end.' . $view;
            })->values()->toArray();

        $views = Widget::pluck('view')->toArray();
        $maxOrder = Widget::max('order') + 1;

        $newView = array_diff($files, $views);

        foreach ($newView as $index => $view) {
            Widget::create([
                'view'      => $view,
                'order'     => $maxOrder + $index,
                'active'    => 0,
                'deleted'   => 0,
            ]);
        }

        return response()->json([
            'resource' => $files,
            'views' => $views,
            'diff' => array_diff($files, $views)
        ]);
    }

    public function order(Request $request, $id)
    {
        if (!$this->_viewer->isAllowed('widget_edit')) {
            return redirect('/private');
        }

        $direction = $request->post('direction', 'down');
        if(!in_array($request->post('direction'), ['up', 'down']))
            return response()->json([
                'error' => 'Invalid direction'
            ]);

        $widget = Widget::find($id);
        $maxOrder = Widget::max('order');

        if($widget) {
            $order = $widget->order;
            if($order == 1 && $direction == 'up')
                return response()->json([]);
            if($order > $maxOrder && $direction == 'down')
                $order = $maxOrder + 1;

            $widgetNeighbor = null;
            if($direction == 'down') {
                $widgetNeighbor = Widget::where('order', '>', $order)
                    ->orderBy('order', 'asc')
                    ->first();

                $neighborOrder = $widgetNeighbor->order;
                $widgetNeighbor->order = $order;
                $widget->order = $neighborOrder;
                $widgetNeighbor->save();
                $widget->save();
            } else if ($direction == 'up') {
                $widgetNeighbor = Widget::where('order', '<', $order)
                    ->orderBy('order', 'desc')
                    ->first();

                $neighborOrder = $widgetNeighbor->order;
                $widgetNeighbor->order = $order;
                $widget->order = $neighborOrder;
                $widgetNeighbor->save();
                $widget->save();
            }

            return response()->json([
                'widgets' => $widget,
                'neighbor' => $widgetNeighbor
            ]);
        }

        return response()->json([]);
    }

    public function index()
    {
        if (!$this->_viewer->isAllowed('widget')) {
            return redirect('/private');
        }

        $widgets = Widget::query()
            ->orderBy('order')
            ->where('deleted', 0)
            ->get();

        $values = [
            'page_title' => 'Danh sách widget',
            'widgets' => $widgets
        ];

        return view('pages.back_end.widgets.index', $values);
    }

    public function updateStatus(Request $request, $id)
    {
        if (!$this->_viewer->isAllowed('widget_edit')) {
            return redirect('/private');
        }

        $widget = Widget::find($id);

        if ($widget) {
            $widget->active = $widget->active == 1 ? 0 : 1;
            $widget->save();

            $this->_apiCore->addLog([
                'user_id' => $this->_viewer->id,
                'action' => 'widget_update',
                'item_id' => $widget->id,
                'item_type' => 'widget',
                'params' => json_encode([
                    'type' => 'active',
                    'value' => $widget,
                ])
            ]);

            Session::put('MESSAGE', 'ITEM_UPDATED');
        }

        return response()->json([]);
    }

    public function destroy(Request $request, $id)
    {
        if (!$this->_viewer->isAllowed('widget_delete')) {
            return redirect('/private');
        }

        $widget = Widget::find($id);

        try {
            $widget->deleted = 1;
            $widget->save();
        } catch (\Exception $ex) {

        }

        return response()->json([
            'widget' => $widget
        ]);
    }
}
