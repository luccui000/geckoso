<?php

if(!function_exists('get_image_url')) {
    function get_image_url($url) {
        return url('public/storage/' . ltrim($url, '/'));
    }
}


