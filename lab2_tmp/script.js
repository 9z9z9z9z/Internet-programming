$(document).ready(function() {
    jQuery.validator.addMethod("numbersonly", function(value, element) {
        return this.optional(element) || /^\d+$/.test(value);
        }, "Пожалуйста, введите только цифры.");

    jQuery("form").validate({
        errorPlacement: function(error, element) {
            if (error[0].innerHTML != null && error[0].innerHTML !== "") {
                $(element).tooltipster( { 
                    content: $(error).text(),
                    onlyOne: false, 
                    position: 'left',
                    animation: 'grow', 
                    theme: 'tooltipster-punk' 
                });
                $(element).tooltipster('open'); 
            }
        },
        success: function(element) {
            var obj = $(element);
            if (obj.hasClass('tooltipstered') && obj.hasClass('error')) {
                $(element).tooltipster('close');
            } 
        },
        rules: {
            onlynumber: {
                numbersonly: true,
                required: true,
            },
            textarea: {
                minlength: 20,
                maxlength: 200,
                required: true
            },
            radio: {
                required: true
            },
        },
        messages: {
            onlynumber: {
                numbersonly: "Input numbers!",
                required: "Please, input your number"
            },
            textarea: {
                required: "Please enter at least 20 characters"
            },
            radio: {
                required: "Please, choose first position"
            }
        }
    } );

    jQuery('input, textarea').each(function() {
        var number = $(this).attr('id');
        var value = localStorage.getItem(number);
        if (value !== null) {
            if ($(this).is(':radio')) {
                $(this).prop('checked', true);
            } else {
                $(this).val(value);
            }
        }
        $(this).on('input change', function() {
            var value;
            if ($(this).is(':adio')) {
                value = $(this).prop('checked');
            } else {
                value = $(this).val();
            }
            localStorage.setItem(number, value);
            localStorage.setItem('textarea', textarea.value);
        } );
    } );

    function loadFormData() {
        var numberFieldValue = localStorage.getItem('onlynumber');
        if (numberFieldValue !== null) {
            $('#onlynumber').val(numberFieldValue);
        }
        var textFieldValue = localStorage.getItem('textarea');
        if (textFieldValue !== null) {
            $('#textarea').val(textFieldValue);
        }
        var firstRadioValue = localStorage.getItem('radio1');
        if (firstRadioValue !== null) {
            $('#radio input[type="radio"]').eq(0).prop('checked', firstRadioValue);
        } else {
            $('#radio input[type="radio"]').eq(0).prop('checked', false);
        } 

        var secondRadioValue = localStorage.getItem('radio2');
        if (secondRadioValue !== null) {
            $('#radio input[type="radio"]').eq(1).prop('checked', secondRadioValue);
        } else {
            $('#radio input[type="radio"]').eq(1).prop('checked', false);
        }      
        var thirdRadioValue = localStorage.getItem('radio3');
        if (thirdRadioValue !== null) {
            $('#radio input[type="radio"]').eq(2).prop('checked', thirdRadioValue);
        } else {
            $('#radio input[type="radio"]').eq(2).prop('checked', false);
        }
    }
    $(document).ready(function() {
        loadFormData();
        console.log(localStorage);
    });
});