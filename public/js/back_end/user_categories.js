function editItem(item) {
    const popup = $("#updateUserCategory");

    $('#modalUpdateUserCategory').attr('action', `/admin/client-categories/${item.id}`)

    popup.find('input[name=name]').val(item.name);
    popup.find('select[name=parent_id] option').each(function() {
        const optionValue = $(this).attr('value');

        if(optionValue == item.parent_id) {
            $(this).attr('selected', true);
        } else {
            $(this).attr('selected', false);
        }
    })

    popup.modal('show');
}
