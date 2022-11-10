@extends('templates.front_end.master')

@section('content')
    @foreach($widget_share as $widget)
        @include($widget->view)
    @endforeach
@stop
