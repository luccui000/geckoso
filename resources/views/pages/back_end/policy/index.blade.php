<?php
$pageTitle = (isset($page_title)) ? $page_title : "";

$apiCore = new \App\Api\Core();
$viewer = $apiCore->getViewer();
$params = [];

?>

@extends('templates.be.master')

@section('content')

    <div>
        <div class="fade-in">
            <div class="row">
                <div class="col-md-12">
                    <div class="btn-menu">
                        @if ($viewer->isAllowed('policy_setting_add'))
                            <a class="btn btn-primary btn-sm mb-1" href="{{ url('/admin/policy-settings/create') }}">
                                <i class="fa fa-plus-circle mr-1"></i>
                                Tạo chính sách điều khoản mới
                            </a>
                        @endif
                    </div>

                    @if (count($items))

                        <div class="card">
                            <div class="card-header">
                                <strong>{{$pageTitle}}</strong>

                                <div class="c-header-right font-weight-bold">
                                    <span>Tổng Cộng: </span>
                                    <span class="number_format">{{$items->count()}}</span>
                                </div>
                            </div>
                            <div class="card-body">
                                <table class="table table-responsive-sm table-striped">
                                    <thead>
                                    <tr>
                                        <th>Tên chính sách</th>
                                        <th>Đường dẫn</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <?php foreach($items as $item): ?>
                                    <tr class="row-tr" data-id="{{$item->id}}">
                                        <td class="row-parent text-capitalize" >
                                            {{$item->title}}
                                        </td>
                                        <td class="row-parent " id="row-name-{{$item->id}}"  >
                                            <a href="/{{ $item->href }}">{{ $item->href }}</a>
                                        </td>
                                        <td>
                                            @if ($item->active)
                                                @if ($viewer->isAllowed('policy_setting_edit'))
                                                    <a class="badge badge-success text-uppercase" onclick="updateStatus({{$item->id}}, 'active', 0)" href="javascript:void(0)">
                                                        <i class="fa fa-check text-white mr-1"></i> active
                                                    </a>
                                                @else
                                                    <div class="badge badge-success text-uppercase">
                                                        <i class="fa fa-check text-white mr-1"></i> active
                                                    </div>
                                                @endif
                                            @else
                                                @if ($viewer->isAllowed('policy_setting_edit'))
                                                    <a class="badge badge-secondary text-uppercase text-black-50" onclick="updateStatus({{$item->id}}, 'active', 1)" href="javascript:void(0)">
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
                                            <div class="align-right d-flex">
                                                @if ($viewer->isAllowed('policy_setting_edit'))
                                                    <a class="btn btn-info btn-sm mb-1"
                                                        title="Sửa" data-original-title="Sửa"
                                                        href="/admin/policy-settings/{{ $item->id }}/edit"
                                                    >
                                                        <i class="fa fa-edit"></i>
                                                    </a>
                                                @endif

                                                @if ($viewer->isAllowed('policy_setting_delete'))
                                                    <form method="POST" action="/admin/policy-settings/{{ $item->id }}">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button
                                                            class="btn btn-danger btn-sm mb-1"
                                                            title="Xóa"
                                                        >
                                                            <i class="fa fa-trash"></i>
                                                        </button>
                                                    </form>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                    <?php endforeach;?>
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
    </div>

    {{--modal--}}
    <div id="modal_item_update"  class="modal fade" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title"></h4>
                </div>
                <form action="{{url('admin/system-category/save')}}" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group" id="req-title">
                            <input required name="title" type="text" autocomplete="off" class="form-control" />
                            <div class="alert alert-danger hidden"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Không</button>
                        <button type="submit" class="btn btn-primary">Xác Nhận</button>

                        <input type="hidden" name="item_id" />
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{url('public/js/back_end/policy_setting.js')}}"></script>

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
