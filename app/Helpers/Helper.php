<?php

if(!function_exists('get_image_url')) {
    function get_image_url($url) {
        return url('public/storage/' . ltrim($url, '/'));
    }
}

if(!function_exists('abort_if_cant')) {
    function abort_if_user_cant($policy) {
        $user = auth()->user();

        if($user->isDeleted() || $user->isBlocked() || !$user->isStaff()) {
            return redirect('/invalid');
        }
        if(!$user->isAllowed($policy)) {
            return redirect('/private');
        }
    }
}

if(!function_exists('user_can')) {
    function user_can($policy) {
        $user = auth()->user();

        if($user->isDeleted() ||
            $user->isBlocked() ||
            !$user->isStaff() ||
            !$user->isAllowed($policy)
        ) {
            return false;
        }

        return true;
    }
}
