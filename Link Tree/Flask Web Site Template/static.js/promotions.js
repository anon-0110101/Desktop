$(document).ready(function() {
    $.getJSON("path/to/promotions.json", function(data) {
        var promotions = "";
        $.each(data, function(key, value) {
            promotions += '<div class="col-md-4">';
            promotions += '<div class="card promotion-card">';
            promotions += '<img src="' + value.image + '" alt="' + value.title + '">';
            promotions += '<div class="card-body">';
            promotions += '<h2 class="promotion-title">' + value.title + '</h2>';
            promotions += '<p class="promotion-description">' + value.description + '</p>';
            promotions += '</div></div></div>';
        });
        $(".row").html(promotions);
    });
});
