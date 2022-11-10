<?php
$pageTitle = (isset($page_title)) ? $page_title : "";

$apiCore = new \App\Api\Core();
$viewer = $apiCore->getViewer();

?>

@extends('templates.be.master')

@section('content')
    <div class="fade-in">
        <div class="row">
            <div class="col-md-12">
                <div class="btn-menu">
                    @if ($viewer->isAllowed('widget_reload'))
                        <button type="button" onclick="reloadWidget()" class="btn btn-primary btn-sm mb-1" >
                            <i class="fa fa-spinner mr-1"></i>
                            Reload
                        </button>
                    @endif
                </div>

                @if (count($widgets))
                    <div class="card">
                        <div class="card-header">
                            <strong>{{ $pageTitle }}</strong>

                            <div class="c-header-right font-weight-bold">
                                <span>Tổng Cộng: </span>
                                <span class="number_format">{{ count($widgets) }}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table table-responsive-sm table-striped">
                                <thead>
                                    <tr>
                                        <th>tên widget</th>
                                        <th>Thứ tự</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($widgets as $widget)
                                    <tr class="row-tr">
                                        <td class="row-parent">
                                            {{ $widget->view }}
                                        </td>
                                        <td class="row-parent">
                                            {{ $widget->order }}
                                        </td>
                                        <td>
                                            @if ($widget->active)
                                                @if ($viewer->isAllowed('widget_edit'))
                                                    <a class="badge badge-success text-uppercase" onclick="updateStatus({{ $widget }})" href="javascript:void(0)">
                                                        <i class="fa fa-check text-white mr-1"></i> active
                                                    </a>
                                                @else
                                                    <div class="badge badge-success text-uppercase">
                                                        <i class="fa fa-check text-white mr-1"></i> active
                                                    </div>
                                                @endif
                                            @else
                                                @if ($viewer->isAllowed('widget_edit'))
                                                    <a class="badge badge-secondary text-uppercase text-black-50" onclick="updateStatus({{ $widget }})" href="javascript:void(0)">
                                                        <i class="fa fa-check text-black-50 mr-1"></i> inactive
                                                    </a>
                                                @else
                                                    <div class="badge badge-secondary text-uppercase text-black-50">
                                                        <i class="fa fa-check text-black-50 mr-1"></i> inactive
                                                    </div>
                                                @endif
                                            @endif
                                        </td>
                                        <td>
                                            <div class="align-right">
                                                @if ($viewer->isAllowed('widget_edit'))
                                                    <button type="button" onclick="orderItem('up',{{ $widget }})" class="btn btn-info btn-sm mb-1">
                                                        <i class="fa fa-arrow-up"></i>
                                                    </button>
                                                    <button type="button" onclick="orderItem('down',{{ $widget }})" class="btn btn-info btn-sm mb-1">
                                                        <i class="fa fa-arrow-down"></i>
                                                    </button>
                                                @endif

                                                @if ($viewer->isAllowed('widget_delete'))
                                                    <button class="btn btn-danger btn-sm mb-1"
                                                            title="Xóa" data-original-title="Xóa"
                                                            onclick="deleteItem({{ $widget }})"
                                                    >
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                @else
                    <div class="clearfix mb-4 mt-4">
                        <span class="alert alert-info notfound"></span>
                    </div>
                @endif
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{url('public/js/back_end/widgets.js')}}"></script>

    <script type="text/javascript">
        jQuery(document).ready(function () {
            @if(!empty($message))
                @if($message == 'ITEM_ADDED')
                showMessage(gks.successADD);
                @elseif($message == 'ITEM_EDITED')
                showMessage(gks.successEDIT);
                @elseif($message == 'ITEM_DELETED')
                showMessage(gks.successDEL);
                @elseif($message == 'ITEM_UPDATED')
                showMessage(gks.successUPDATE);
                @endif
            @endif
        });
    </script>
@stop
