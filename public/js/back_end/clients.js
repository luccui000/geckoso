jQuery(document).ready(function () {
    jQuery('#modal_change_password form').on('submit', function(e){
        e.preventDefault();
        changePasswordConfirm();
    });

});

function changePassword(id) {
    var popup = jQuery('#modal_change_password');
    popup.find('input[name=item_id]').val(id);
    popup.modal('show');
    jsfocusat('modal_change_password', 'input[name=pwd]');
}

function changePasswordConfirm() {
    var popup = jQuery('#modal_change_password');
    var pwd = popup.find('input[name=pwd]').val().trim();

    popup.find('.alert').addClass('hidden');
    if (!pwd || pwd === '') {
        popup.find('.alert').removeClass('hidden');
        return false;
    }

    jspopuploading('modal_change_password');
    popup.find('form')[0].submit();
}

function filterBy(value) {
    switch (value) {
        case 'name':
            jQuery('#btn-filter').text("Họ Tên");
            break;
        case 'phone':
            jQuery('#btn-filter').text("Điện Thoại");
            break;
        case 'email':
            jQuery('#btn-filter').text("Email");
            break;
    }
    jQuery('#filter-by').val(value);
}

function deleteItem(id) {
    var popup = jQuery('#modal_delete_item');
    popup.find('input[name=item_id]').val(id);
    popup.modal('show');
}
function jspopupdelete() {
    var popup = jQuery('#modal_delete_item');
    jQuery.ajax({
        url: gks.baseURL + '/admin/client/delete',
        type: 'post',
        data: {
            item_id: popup.find('input[name=item_id]').val(),
            _token: gks.tempTK,
        },
        beforeSend: function () {
            jspopuploading('modal_delete_item');
        },
        success: function (response) {
            reloadPage();
        },
    });
}
