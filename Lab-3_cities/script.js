
$(document).ready(function() {
    $('#countries').change(function() {
        var country = $(this).val();
        $.getJSON('cities.json', function(data) {
            var options = '';
            $.each(data[country], function(index, value) {
                options += '<option value="' + value + '">' + value + '</option>';
            });
            $('#cities').html(options);
        });
    });
});