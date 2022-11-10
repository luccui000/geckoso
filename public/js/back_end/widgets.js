function reloadWidget() {
    $.ajax({
        url: gks.baseURL + `/admin/widgets/reload`,
        type: 'POST',
        data: {
            _token: gks.tempTK,
        },
        success: function (response) {
            reloadPage();
        },
    });
}

function updateStatus(widget) {
    $.ajax({
        url: gks.baseURL + `/admin/widgets/${widget.id}/update-status`,
        type: 'PUT',
        data: {
            _token: gks.tempTK,
        },
        success: function (response) {
            reloadPage();
        },
    });
}


function orderItem(direction, widget) {
    $.ajax({
        url: gks.baseURL + `/admin/widgets/${widget.id}/order`,
        type: 'post',
        data: {
            direction: direction,
            _token: gks.tempTK,
        },
        success: function (response) {
            reloadPage();
        },
    });
}


function deleteItem(widget) {
    $.ajax({
        url: gks.baseURL + `/admin/widgets/${widget.id}`,
        type: 'DELETE',
        data: {
            _token: gks.tempTK,
        },
        success: function (response) {
            // console.log(response)
            reloadPage();
        },
    });
}
