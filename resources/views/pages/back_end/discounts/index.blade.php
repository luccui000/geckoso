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
                    @if ($viewer->isAllowed('discount_add'))
                        <button type="button" data-toggle="modal" data-target="#createUCategory" class="btn btn-primary btn-sm mb-1" >
                            <i class="fa fa-plus-circle mr-1"></i>
                            Thêm mới
                        </button>
                    @endif
                </div>

                @if (count($userCategories))
                    <div class="card">
                        <div class="card-header">
                            <strong>{{ $pageTitle }}</strong>

                            <div class="c-header-right font-weight-bold">
                                <span>Tổng Cộng: </span>
                                <span class="number_format">{{ count($userCategories) }}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table table-responsive-sm table-striped">
                                <thead>
                                    <tr>
                                        <th>Nhóm khách hàng</th>
                                        <th>Hình thức giảm</th>
                                        <th>Giá trị</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($userCategories as $group)
                                    <tr class="row-tr">
                                        <td class="row-parent" >
                                            @if ($group->child)
                                                <div class="frm-parent">
                                                    <a href="javascript:void(0)" onclick="toggleGroup({{ $group }})">
                                                        + {{ $group->name }}
                                                    </a>
                                                </div>
                                            @else
                                                + {{ $group->name }}
                                            @endif
                                        </td>
                                        @if($group->discount)
                                            <td class="row-parent">
                                                @if($group->discount->type == \App\Constants\DiscountType::PERCENT)
                                                    <span class="badge badge-success">{{ $group->discount->type }}</span>
                                                @else
                                                    <span class="badge badge-primary">{{ $group->discount->type }}</span>
                                                @endif
                                            </td>
                                            <td class="row-parent">
                                                @if($group->discount->type == \App\Constants\DiscountType::PERCENT)
                                                    {{ $group->discount->value }}%
                                                @else
                                                    {{ number_format($group->discount->value, 0, '', ',') }}đ
                                                @endif
                                            </td>
                                            <td>
                                                @if($group->discount->active === 1)
                                                    @if ($viewer->isAllowed('discount_edit'))
                                                        <a class="badge badge-success text-uppercase" onclick="updateStatus({{ $group}})" href="javascript:void(0)">
                                                            <i class="fa fa-check text-white mr-1"></i> active
                                                        </a>
                                                    @else
                                                        <div class="badge badge-success text-uppercase">
                                                            <i class="fa fa-check text-white mr-1"></i> active
                                                        </div>
                                                    @endif
                                                @else
                                                    @if ($viewer->isAllowed('discount_edit'))
                                                        <a class="badge badge-secondary text-uppercase text-black-50" onclick="updateStatus({{ $group}})" href="javascript:void(0)">
                                                            <i class="fa fa-check text-black-50 mr-1"></i> inactive
                                                        </a>
                                                    @else
                                                        <div class="badge badge-secondary text-uppercase text-black-50">
                                                            <i class="fa fa-check text-black-50 mr-1"></i> inactive
                                                        </div>
                                                    @endif
                                                @endif
                                            </td>
                                        @else
                                            <td colspan="3" >Không có</td>
                                        @endif

                                        <td>
                                            <div class="align-right d-inline-flex float-right">
                                                @if (user_can('discount_view'))
                                                    <button type="button" onclick="toggleGroup({{ $group}})" class="btn btn-primary btn-sm mb-1 mr-2 parent-{{ $group->id }}">
                                                        <i class="fa fa-eye-slash text-white"></i>
                                                    </button>
                                                @endif

                                                @if (user_can('discount_edit'))
                                                    <button type="button" onclick="updateDiscount({{ $group }})" class="btn btn-info btn-sm mb-1 mr-2">
                                                        <i class="fa fa-pencil-alt"></i>
                                                    </button>
                                                @endif

                                                @if (user_can('discount_delete'))
                                                    <form action="{{ url("/admin/client-discounts/" . $group->id) }}" method="POST">
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
                                    @if ($group->child)
                                        @foreach($group->child as $child)
                                            <tr class="row-tr sub-{{ $group->id }}" >
                                                <td class="row-parent" >
                                                    @if ($child)
                                                        <div class="frm-parent" style="padding-left: 50px;">
                                                            <a href="javascript:void(0)" onclick="toggleGroup({{ $group }})">
                                                                ++ {{ $child->name }}
                                                            </a>
                                                        </div>
                                                    @else
                                                        <div style="padding-left: 50px;">++ {{ $child->name }}</div>
                                                    @endif
                                                </td>

                                                @if($child->discount)
                                                    <td class="row-parent">
                                                        @if($child->discount->type == \App\Constants\DiscountType::PERCENT)
                                                            <span class="badge badge-success">{{ $child->discount->type }}</span>
                                                        @else
                                                            <span class="badge badge-primary">{{ $child->discount->type }}</span>
                                                        @endif

                                                    </td>
                                                    <td class="row-parent">
                                                        @if($child->discount->type == \App\Constants\DiscountType::PERCENT)
                                                            {{ $child->discount->value }}%
                                                        @else
                                                            {{ number_format($child->discount->value, 0, '', ',') }}đ
                                                        @endif
                                                    </td>

                                                    <td>
                                                        @if ($child->discount->active === 1)
                                                            @if (user_can('discount_edit'))
                                                                <a class="badge badge-success text-uppercase" onclick="updateStatus({{ $child }})" href="javascript:void(0)">
                                                                    <i class="fa fa-check text-white mr-1"></i> active
                                                                </a>
                                                            @else
                                                                <div class="badge badge-success text-uppercase">
                                                                    <i class="fa fa-check text-white mr-1"></i> active
                                                                </div>
                                                            @endif
                                                        @else
                                                            @if (user_can('discount_edit'))
                                                                <a class="badge badge-secondary text-uppercase text-black-50" onclick="updateStatus({{ $child}})" href="javascript:void(0)">
                                                                    <i class="fa fa-check text-black-50 mr-1"></i> inactive
                                                                </a>
                                                            @else
                                                                <div class="badge badge-secondary text-uppercase text-black-50">
                                                                    <i class="fa fa-check text-black-50 mr-1"></i> inactive
                                                                </div>
                                                            @endif
                                                        @endif
                                                    </td>
                                                @else
                                                    <td colspan="3">Không có</td>
                                                @endif

                                                <td>
                                                    <div class="align-right d-inline-flex float-right">
                                                        @if(user_can('discount_edit'))
                                                            <button
                                                                class="btn btn-info btn-sm mb-1 mr-2"
                                                                title="Sửa" data-original-title="Sửa"
                                                                onclick="updateDiscount({{ $child }})"
                                                            >
                                                                <i class="fa fa-pencil-alt"></i>
                                                            </button>
                                                        @endif

                                                        @if(user_can('discount_delete'))
                                                            <form action="{{ url("/admin/client-discounts/" . $child->id) }}" method="POST">
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
    <div class="modal fade" id="createUCategory" tabindex="-1" role="dialog" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form action="{{ url('/admin/client-discounts') }}" method="POST">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thêm ưu đãi cho nhóm khách hàng </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="">Chọn nhóm khách hàng</label>
                                    <select name="user_category_id" class="custom-select custom-select-lg mb-3">
                                        <option value="0" selected>--- Chọn nhóm khách hàng ---</option>
                                        @foreach($userCategories as $uCategory)
                                            @if(!$uCategory->discount)
                                                <option value="{{ $uCategory->id }}">{{ $uCategory->name }}</option>
                                            @else
                                                @if($uCategory->child)
                                                    @foreach($uCategory->child as $child)
                                                        @if(!$child->discount)
                                                            <option value="{{ $child->id }}" >---{{ $child->name }}</option>
                                                        @endif
                                                    @endforeach
                                                @endif
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-4">
                                <label for="">Giảm theo</label>
                                <select name="type" class="custom-select">
                                    <option value="percent">Phần trăm</option>
                                    <option value="amount">Tiền</option>
                                </select>
                            </div>
                            <div class="col-8">
                                <label for="">Giá trị</label>
                                <input name="value" type="number" class="form-control form-control-sm">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-primary">Lưu lại</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="editUCategory" tabindex="-1" role="dialog" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form action="{{ url('/admin/client-discounts') }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thay đổi thông tin </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <label for="">Tên nhóm khách hàng</label>
                                <h4 class="u-category-name"></h4>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-4">
                                <label for="">Giảm theo</label>
                                <select name="type" class="custom-select">
                                    <option value="percent">Phần trăm</option>
                                    <option value="amount">Tiền</option>
                                </select>
                            </div>
                            <div class="col-8">
                                <label for="">Giá trị</label>
                                <input name="value" type="number" class="form-control form-control-sm">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-primary">Lưu lại</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{url('public/js/back_end/discounts.js')}}"></script>
@stop
