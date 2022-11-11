function toggleGroup(group) {
    if($(`.sub-${group.id}`).hasClass('hidden')) {
        $(`.sub-${group.id}`).removeClass('hidden');
        $(`.parent-${group.id} i`).addClass('fa-eye-slash')
            .removeClass('fa-eye');

    } else {
        $(`.sub-${group.id}`).addClass('hidden')
        $(`.parent-${group.id} i`).addClass('fa-eye')
            .removeClass('fa-eye-slash');
    }
}

function updateDiscount(uCategory) {
    const popup = $('#editUCategory');
    popup.find('form').attr('action', gks.baseURL + `/admin/client-discounts/${uCategory.id}`)
    popup.find('.u-category-name').text(uCategory.name);
    if(uCategory.discount)
        popup.find('input[name=value]').val(uCategory.discount.value);
    popup.find('select[name=type] option').each(function(index, el) {
        const optionValue = $(el).val();
        const uCategoryType = uCategory.discount?.type;
        if(optionValue === uCategoryType) {
            $(el).attr('selected', true)
        } else {
            $(el).attr('selected', false)
        }
    })
    popup.modal('show');
}

function updateStatus(discount) {
    $.ajax({
        url: gks.baseURL + `/admin/client-discounts/${discount.id}/update-status`,
        type: 'PUT',
        data: {
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
