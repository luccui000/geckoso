<?php
$pageTitle = (isset($page_title)) ? $page_title : "";
$activePage = (isset($active_page)) ? $active_page : "";

$apiCore = new \App\Api\Core();
$viewer = $apiCore->getViewer();


?>

@extends('templates.be.master')

@section('content')
    <div>
        <div class="fade-in">
            <form
                action="/admin/policy-settings" method="post" enctype="multipart/form-data"
                id="frm-add" accept-charset="UTF-8" autocomplete="off"
            >
                @csrf

                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong>{{ $pageTitle }}</strong>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12" id="req-name">
                                        <div class="form-group">
                                            <label class="frm-label required">* Tiêu đề</label>
                                            <input name="title" type="text" autocomplete="off" class="form-control" />
                                        </div>
                                        @if($errors->has('title'))
                                            <div class="text-danger">{{ $errors->first('title') }}</div>
                                        @endif
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12" id="req-name">
                                        <div class="form-group">
                                            <label class="frm-label">Đường dẫn</label>
                                            <input name="href" type="text" autocomplete="off" class="form-control" />
                                        </div>
                                        <div class="form-group alert alert-danger hidden">Vui lòng đường dẫn.</div>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-12">
                                        <div class="form-check">
                                            <input name="active" type="checkbox" checked value="1" class="form-check-input custom-checkbox" id="check">
                                            <label class="form-check-label" for="check">Active</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group" id="frm-textarea">
                                            <textarea name="content" class="c-tinymce" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary btn-sm mb-1">
                                        <i class="fa fa-check-circle mr-1"></i>
                                        Xác Nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </form>
        </div>
    </div>
    <script type="text/javascript" src="{{url('public/js/back_end/policy_setting_edit.js')}}"></script>
    <script src="https://cdn.tiny.cloud/1/{{$apiCore->getKey('tinymce')}}/tinymce/5/tinymce.min.js"></script>
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

        tinymce.init({
            selector: 'textarea.c-tinymce',
            plugins: 'code print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help',
            toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen | link image media | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
            image_advtab: true,
            height: 700,
            //local upload
            images_upload_handler: function (blobInfo, success, failure) {
                var xhr, formData;

                xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.open('POST', '{{url('admin/tinymce/upload')}}');

                xhr.onload = function() {
                    var json;

                    if (xhr.status != 200) {
                        failure('HTTP Error: ' + xhr.status);
                        return;
                    }

                    json = JSON.parse(xhr.responseText);

                    if (!json || typeof json.location != 'string') {
                        failure('Invalid JSON: ' + xhr.responseText);
                        return;
                    }

                    success(json.location);
                };

                formData = new FormData();
                formData.append('_token', '{{csrf_token()}}');
                formData.append('file', blobInfo.blob(), blobInfo.filename());

                xhr.send(formData);
            },
        });
    </script>
@stop
