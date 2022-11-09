function updateStatus(id, col, val) {
    jQuery.ajax({
        url: gks.baseURL + '/admin/banners/update-status',
        type: 'post',
        data: {
            item_id: id,
            value: val,
            menu: col,
            _token: gks.tempTK,
        },
        success: function (response) {
            reloadPage();
        },
    });
}
