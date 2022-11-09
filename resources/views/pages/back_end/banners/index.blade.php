<?php
    $pageTitle = (isset($page_title)) ? $page_title : "";
    $apiCore = new \App\Api\Core();
    $viewer = $apiCore->getViewer();
?>

@extends('templates.be.master')

@section('content')
    <style>
        .banner_img img {
            width: 313px;
            border-radius: 2px;
        }
    </style>

    <div class="fade-in">
        <div class="row">
            <div class="col-md-12">
                <div class="btn-menu">
                    @if ($viewer->isAllowed('banner_setting_add'))
                        <button class="btn btn-primary btn-sm" type="button" data-toggle="modal" data-target="#createBanner">
                            <i class="fa fa-plus-circle mr-1"></i>
                            Tạo mới
                        </button>
                    @endif
                </div>
                @if (count($banners))
                    <form action="/admin/banners" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="card">
                            <div class="card-header">
                                <strong>{{ $pageTitle }}</strong>
                                <div class="c-header-right font-weight-bold">
                                    <span>Tổng Cộng: </span>
                                    <span class="number_format">{{$banners->count()}}</span>
                                </div>
                            </div>
                            <div class="card-body">
                                @foreach($banners as $index => $banner)
                                    <div class="row mt-4">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label for="">Tiêu đề</label>
                                                        <input name="title[{{ $banner->id }}]" value="{{ $banner->title }}" type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <label for="">Banner {{ $index + 1 }} (Recommended: 1920 X 621)</label>
                                                        <input name="desktop_image[{{ $banner->id }}]"  type="file" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="banner_img">
                                                        <img src="{{ url('public/storage/' . ltrim($banner->desktop_image)) }}" alt="{{ $banner->title }}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-10">
                                                    <div class="form-group">
                                                        <label for="">Đường dẫn</label>
                                                        <input name="link[{{ $banner->id }}]" value="{{ $banner->link }}" type="text" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-2 mt-4">
                                                    @if ($banner->active)
                                                        @if ($viewer->isAllowed('banner_setting_edit'))
                                                            <a
                                                                class="badge badge-success"
                                                                onclick="updateStatus({{$banner->id}}, 'active', 0)"
                                                                href="javascript:void(0)">
                                                                <i class="fa fa-check text-white mr-1"></i>
                                                                active
                                                            </a>
                                                        @else
                                                            <div class="badge badge-success text-uppercase">
                                                                <i class="fa fa-check text-white mr-1"></i>
                                                                active
                                                            </div>
                                                        @endif
                                                    @else
                                                        @if ($viewer->isAllowed('banner_setting_edit'))
                                                            <a
                                                                class="badge badge-secondary text-uppercase text-black-50"
                                                               onclick="updateStatus({{$banner->id}}, 'active', 1)"
                                                               href="javascript:void(0)">
                                                                <i class="fa fa-check text-black-50 mr-1"></i>
                                                                inactive
                                                            </a>
                                                        @else
                                                            <div class="badge badge-secondary text-uppercase text-black-50">
                                                                <i class="fa fa-check text-black-50 mr-1"></i>
                                                                inactive
                                                            </div>
                                                        @endif
                                                    @endif
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <label for="">Mobi Banner  {{ $index + 1 }} (Recommended: 840 X 800)</label>
                                                        <input name="mobile_image[{{ $banner->id }}]" type="file" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="banner_img">
                                                        <img src="{{ url('public/storage/' . ltrim($banner->mobile_image)) }}" alt="{{ $banner->title }}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                                <button type="submit" class="btn btn-primary">Cập nhật</button>
                            </div>
                        </div>
                    </form>
                @else
                    <div class="clearfix mb-4 mt-4">
                        <span class="alert alert-info notfound"></span>
                    </div>
                @endif
            </div>
        </div>
    </div>
    <div class="modal fade" id="createBanner" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form action="{{ url('/admin/banners') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thêm mới banner</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="">Tiêu đề</label>
                                    <input type="text" name="title" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Liên kết</label>
                                    <input type="text" name="link" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Ảnh cho deskop</label>
                                    <input type="file" name="desktop_image" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Ảnh cho mobile</label>
                                    <input type="file" name="mobile_image" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{url('public/js/back_end/banner_setting.js')}}"></script>

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
