<?php
$pageTitle = (isset($page_title)) ? $page_title : "";

$apiCore = new \App\Api\Core();
$viewer = $apiCore->getViewer();

?>

@extends('templates.be.master')

@section('content')
    <link rel="stylesheet" href="{{ url('public/libraries/star-rating/src/css/star-rating-svg.css') }}">
    {{ app('session')->get('message') }}
    <div class="fade-in">
        <div class="row">
            <div class="col-md-12">
                <div class="btn-menu">
                    @if ($viewer->isAllowed('product_rate_add'))
                        <button type="button" data-toggle="modal" data-target="#createRate" class="btn btn-primary btn-sm mb-1" >
                            <i class="fa fa-plus-circle mr-1"></i>
                            Thêm mới
                        </button>
                    @endif
                </div>

                @if (count($rates))
                    <div class="card">
                        <div class="card-header">
                            <strong>{{ $pageTitle }}</strong>

                            <div class="c-header-right font-weight-bold">
                                <span>Tổng Cộng: </span>
                                <span class="number_format">{{ count($rates) }}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table table-responsive-sm table-striped">
                                <thead>
                                <tr>
                                    <th>Họ tên</th>
                                    <th>Nội dung</th>
                                    <th class="text-center">Sao</th>
                                    <th>Sản phẩm</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($rates as $rate)
                                    <tr class="row-tr">
                                        <td class="row-parent">
                                            {{ $rate->name }}
                                        </td>
                                        <td class="row-parent">
                                            {{ $rate->content }}
                                        </td>
                                        <td class="row-parent text-center">
                                            @for($i = 0; $i < $rate->vote; $i++)
                                                <i class="text-warning fa fa-star"></i>
                                            @endfor
                                        </td>
                                        <td class="row-parent" style="width: 500px">
                                            <ul class="list-group">
                                                @foreach($rate->products as $product)
                                                    <li class="">
                                                        <a href="{{ $product->getHref() }}">{{ $product->title }}</a>,
                                                    </li>
                                                @endforeach

                                            </ul>
                                        </td>
                                        <td>
                                            @if ($rate->status === 1)
                                                @if ($viewer->isAllowed('rate_edit'))
                                                    <a class="badge badge-success text-uppercase" onclick="updateStatus({{ $rate }})" href="javascript:void(0)">
                                                        <i class="fa fa-check text-white mr-1"></i> active
                                                    </a>
                                                @else
                                                    <div class="badge badge-success text-uppercase">
                                                        <i class="fa fa-check text-white mr-1"></i> active
                                                    </div>
                                                @endif
                                            @else
                                                @if ($viewer->isAllowed('rate_edit'))
                                                    <a class="badge badge-secondary text-uppercase text-black-50" onclick="updateStatus({{ $rate }})" href="javascript:void(0)">
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
                                                @if ($viewer->isAllowed('rate_view'))
                                                    <button type="button" onclick="viewRate({{ $rate }})" class="btn btn-warning btn-sm mb-1">
                                                        <i class="fa fa-eye text-white"></i>
                                                    </button>
                                                @endif

                                                @if ($viewer->isAllowed('rate_edit'))
                                                    <button type="button" onclick="editRate({{ $rate }})" class="btn btn-info btn-sm mb-1">
                                                        <i class="fa fa-pencil-alt"></i>
                                                    </button>
                                                @endif

                                                @if ($viewer->isAllowed('rate_delete'))
                                                    <button class="btn btn-danger btn-sm mb-1"
                                                            title="Xóa" data-original-title="Xóa"
                                                            onclick="deleteItem({{ $rate }})"
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

    <div class="row">
        <div class="col-12 d-flex justify-content-end">
            {!! $rates->links() !!}
        </div>
    </div>

    <div class="modal fade" id="createRate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form action="{{ url('admin/product-rates') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thêm mới đánh giá</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Họ tên người đánh giá</label>
                            <input name="name" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">Avatar</label>
                            <input name="avatar" type="file" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">Chức vụ</label>
                            <select name="role" id="roles" class="form-control">
                                <option value="1">Admin</option>
                                <option value="2">Nhân viên</option>
                                <option value="3">Khách hàng</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Số lượng đánh giá</label>
                            <div id="rating"></div>
                            <input hidden name="vote" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">Nội dung</label>
                            <textarea name="content" type="text" class="form-control"></textarea>
                        </div>
                        <div class="form-group" id="list-product-rate" >
                            <label for="">Chọn sản phẩm sẽ áp dụng</label>
                            <input type="search" id="search-product-rate" placeholder="Nhập từ khóa để tìm kiếm" class="form-control">
                            <div class="mt-4" style="max-height: 400px; overflow: scroll; ">
                                @foreach($products as $product)
                                    <div class="form-check">
                                        <input name="product_ids[]" class="form-check-input" type="checkbox" value="{{ $product->id }}" id="defaultCheck{{ $product->id }}">
                                        <label class="form-check-label" for="defaultCheck{{ $product->id }}">
                                            {{ $product->title }} <a href="{{$product->getHref() }}">Link sản phẩm</a>
                                        </label>
                                    </div>
                                @endforeach
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
    <div class="modal fade" id="editRate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form action="{{ url('admin/product-rates') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thay đổi đánh giá</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Họ tên người đánh giá</label>
                            <input name="name" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">Avatar</label>
                            <input name="avatar" type="file" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">Chức vụ</label>
                            <select name="role" id="roles" class="form-control">
                                <option value="1">Admin</option>
                                <option value="2">Nhân viên</option>
                                <option value="3">Khách hàng</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Số lượng đánh giá</label>
                            <div class="edit-rating"></div>
                            <input hidden name="vote" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">Nội dung</label>
                            <textarea name="content" id="text-content" type="text" class="form-control"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="">Chọn sản phẩm sẽ áp dụng</label>
                            <input type="search" id="search-edit-product-rate" placeholder="Nhập từ khóa để tìm kiếm" class="form-control">
                            <div id="list-edit-product-rate" class="mt-3">
                                @foreach($products as $product)
                                    <div class="form-check">
                                        <input name="product_ids[]" class="form-check-input product_ids" type="checkbox" value="{{ $product->id }}" id="editRateCheck{{ $product->id }}">
                                        <label class="form-check-label" for="editRateCheck{{ $product->id }}">
                                            {{ $product->title }} <a href="{{$product->getHref() }}">Link sản phẩm</a>
                                        </label>
                                    </div>
                                @endforeach
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
    <div class="modal fade" id="viewRate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Chi tiết đánh giá</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4">
                            <img class="rate-avatar img img-circle w-100 h-100" src="" >
                        </div>
                        <div class="col-8">
                            <div class="row">
                                <div class="col-12">
                                    <h4 class="rate-name"></h4>
                                </div>
                                <div class="col-12">
                                    <p class="rate-created text-sm"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="">Nội dung</label>
                                <p class="rate-content"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{url('public/libraries/star-rating/dist/jquery.star-rating-svg.js')}}"></script>
    <script type="text/javascript" src="{{url('public/js/back_end/rates.js')}}"></script>

@stop
