<?php
$pageTitle = (isset($page_title)) ? $page_title : "";

$apiCore = new \App\Api\Core();
$viewer = $apiCore->getViewer();

?>

@extends('templates.be.master')

@section('content')
    <div>
        <div class="fade-in">
            <div class="row">
                <div class="col-md-12">
                    <div class="btn-menu">
                        @if ($viewer->isAllowed('user_cateogory_add'))
                            <button class="btn btn-primary btn-sm mb-1" data-toggle="modal" data-target="#createUserCategory" >
                                <i class="fa fa-plus-circle mr-1"></i>
                                Tạo nhóm khách hàng mới
                            </button>
                        @endif
                    </div>

                    @if (count($userCategories))
                        <div class="card">
                            <div class="card-header">
                                <strong>{{ $pageTitle }}</strong>

                                <div class="c-header-right font-weight-bold">
                                    <span>Tổng Cộng: </span>
                                    <span class="number_format">{{count($userCategories)}}</span>
                                </div>
                            </div>
                            <div class="card-body">
                                <table class="table table-responsive-sm table-striped">
                                    <thead>
                                        <tr>
                                            <th>tên nhóm</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        @foreach($userCategories as $userCategory)
                                            <tr class="row-tr" data-id="{{ $userCategory->id }}">
                                                <td class="row-parent" id="title-{{$userCategory->id}}" data-name="{{$userCategory->name}}">
                                                    @if ($userCategory->child)
                                                        <div class="frm-parent">
                                                            <a href="javascript:void(0)" onclick="toggleItem({{ $userCategory->id }}, 0)">
                                                                + {{ $userCategory->name }}
                                                            </a>
                                                        </div>
                                                    @else
                                                        + {{ $userCategory->name }}
                                                    @endif
                                                </td>

                                                <td>
                                                    <div class="align-right  d-inline-flex float-right">
                                                        @if($viewer->isAllowed('user_category_edit'))
                                                            <button class="btn btn-info btn-sm mb-1 mr-2"
                                                                    title="Sửa" data-original-title="Sửa"
                                                                    onclick="editItem({{ $userCategory }})"
                                                            >
                                                                <i class="fa fa-edit"></i>
                                                            </button>
                                                        @endif

                                                        @if($viewer->isAllowed('user_category_delete'))
                                                            <form action="{{ url("/admin/client-categories/" . $userCategory->id) }}" method="POST">
                                                                @csrf
                                                                @method('DELETE')
                                                                <button class="btn btn-danger btn-sm mb-1"
                                                                >
                                                                    <i class="fa fa-trash"></i>
                                                                </button>

                                                            </form>
                                                        @endif
                                                    </div>
                                                </td>
                                            </tr>

                                            @if ($userCategory->child)
                                                @foreach($userCategory->child as $child)
                                                <tr class="row-tr sub-{{ $userCategory->id }}" data-id="{{ $child->id }}">
                                                    <td class="row-parent" id="title-{{ $child->id }}" data-name="{{ $child->name}}" >

                                                        @if ($child)
                                                            <div class="frm-parent" style="padding-left: 50px;">
                                                                <a href="javascript:void(0)" onclick="toggleItem({{$userCategory->id}}, {{$child->id}})">
                                                                    ++ {{ $child->name }}
                                                                </a>
                                                            </div>
                                                        @else
                                                            <div style="padding-left: 50px;">++ {{ $child->name }}</div>
                                                        @endif
                                                    </td>

                                                    <td>
                                                        <div class="align-right d-inline-flex float-right">
                                                            @if($viewer->isAllowed('user_category_edit'))
                                                                <button class="btn btn-info btn-sm mb-1 mr-2"
                                                                        title="Sửa" data-original-title="Sửa"
                                                                        onclick="editItem({{ $child }})"
                                                                >
                                                                    <i class="fa fa-edit"></i>
                                                                </button>
                                                            @endif

                                                            @if($viewer->isAllowed('user_category_delete'))
                                                                <form action="{{ url("/admin/client-categories/" . $child->id) }}" method="POST">
                                                                    @csrf
                                                                    @method('DELETE')
                                                                    <button class="btn btn-danger btn-sm mb-1"
                                                                    >
                                                                        <i class="fa fa-trash"></i>
                                                                    </button>
                                                                </form>
                                                            @endif
                                                        </div>
                                                    </td>
                                                </tr>

                                                @endforeach
                                            @endif
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
    </div>

    <div class="modal fade" id="createUserCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form action="{{ url('/admin/client-categories') }}" method="POST">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thêm mới nhóm khách hàng</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Tên nhóm khách hàng </label>
                            <input name="name" type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="">Chọn nhóm khách hàng</label>
                            <select name="parent_id" class="custom-select custom-select-lg mb-3">
                                <option value="0" selected>--- Chọn nhóm khách hàng ---</option>
                                @foreach($userCategories as $userCategory)
                                    <option value="{{ $userCategory->id }}">{{ $userCategory->name }}</option>
                                    @if($userCategory->child)
                                        @foreach($userCategory->child as $child)
                                            <option value="{{ $child->id }}" >---{{ $child->name }}</option>
                                        @endforeach
                                    @endif
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-primary">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="updateUserCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form action="{{ url('/admin/client-categories') }}"  method="POST" id="modalUpdateUserCategory">
                    @csrf
                    @method('PUT')
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thêm mới nhóm khách hàng</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Tên nhóm khách hàng </label>
                            <input name="name" type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="">Chọn nhóm khách hàng</label>
                            <select name="parent_id" id="updateParent" class="custom-select custom-select-lg mb-3">
                                <option value="0" selected>--- Chọn nhóm khách hàng ---</option>
                                @foreach($userCategories as $userCategory)
                                    <option value="{{ $userCategory->id }}">{{ $userCategory->name }}</option>
                                    @if($userCategory->child)
                                        @foreach($userCategory->child as $child)
                                            <option value="{{ $child->id }}" >---{{ $child->name }}</option>
                                        @endforeach
                                    @endif
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-primary">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{url('public/js/back_end/user_categories.js')}}"></script>

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
