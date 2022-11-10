$(document).ready(function() {
    $('#rating').starRating({
        initialRating: 5,
        useFullStars: true,
        callback: function(currentRating, $el){
            $("input[name=vote]").val(currentRating);
        }
    });

    $("#search-product-rate").keyup(function() {
        const listProduct = $('#list-product-rate');
        const searchText = $(this).val();
        handleSearchText(searchText, listProduct)
    })

    $("#search-edit-product-rate").keyup(function() {
        const listProduct = $('#list-edit-product-rate');
        const searchText = $(this).val();
        handleSearchText(searchText, listProduct)
    })
})

function handleSearchText(searchText, listProduct) {
    const formCheck = listProduct.find('.form-check');

    formCheck.each(function(index, el) {
        const labelText = $(el).find('label').text();

        if(labelText.includes(searchText)) {
            $(el).removeClass('hidden');
        } else {
            $(el).addClass('hidden');
        }
    })
}

function updateStatus(rate) {
    jQuery.ajax({
        url: gks.baseURL + `/admin/product-rates/${rate.id}/update-status`,
        type: 'PUT',
        data: {
            _token: gks.tempTK,
        },
        success: function (response) {
            // console.log(response)
            reloadPage();
        },
    });
}

function viewRate(rate) {
    const popup = $("#viewRate");
    popup.find('.rate-avatar').attr('src', rate.avatar)
    popup.find('.rate-name').text(rate.name)
    popup.find('.rate-content').text(rate.content)
    popup.find('.rate-created').text(`Ngày đánh giá: ${rate.created_at}`)
    popup.modal('show')
}


function editRate(rate) {
    const rateProduct = rate.products.map(el => el.id);
    const popup = $("#editRate");
    popup.find('form').attr('action', `${gks.baseURL}/admin/product-rates/${rate.id}`)
    popup.find('input[name=name]').val(rate.name)
    popup.find('#text-content').val(rate.content)
    popup.find('input[name=vote]').val(rate.vote)

    popup.find('.edit-rating').starRating({
        initialRating: rate.vote,
        strokeColor: '#ed143d',
        strokeWidth: 10,
        useFullStars: true,
        callback: function(currentRating, $el){
            popup.find("input[name=vote]").val(currentRating);
        }
    });
    const productIds =  popup.find('.product_ids');

    for(let inputId of productIds) {
        const inputValue = $(inputId).val();
        if(rateProduct.includes(+inputValue)) {
            $(inputId).attr('checked', true);
        }
    }

    popup.modal('show')
}

function deleteItem(rate) {
    jQuery.ajax({
        url: gks.baseURL + `/admin/product-rates/${rate.id}`,
        type: 'DELETE',
        data: {
            _token: gks.tempTK,
        },
        success: function (response) {
            reloadPage();
        },
    });
}
