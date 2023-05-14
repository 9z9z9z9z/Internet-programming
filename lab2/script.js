var myButton = document.querySelector(".mybutton");

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
            }
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
                required: "Please, choose one position"
            }
        }
    });
    // Сохранение введенных данных в полях с помощью хранилища LocalStorage
    jQuery('input, radio, text').each(function() {
        var number = $(this).attr('id');
        var value = localStorage.getItem(number);
        if (value !== null) {
            if ($(this).attr('id') === 'radio') {
                $(this).prop('checked','true');
            } else {
                $(this).val(value);
            }
        }
        $(this).on('input change', function() {
            var value;
            if ($(this).is(':radio')) {
                value = $(this).prop('checked');
            } else {
                value = $(this).val();
            }
            localStorage.removeItem('radio1');
            localStorage.removeItem('radio2');
            localStorage.removeItem('radio3');
            localStorage.setItem(number, value);
            localStorage.setItem('textarea', textarea.value);
        });
    });

    // Загрузка введенных данных в полях с помощью хранилища LocalStorage
    function loadFormData() {

        // Загрузка number поля
        let numberFieldValue = localStorage.getItem('onlynumber');
        if (numberFieldValue !== null) {
            $('#onlynumber').val(numberFieldValue);
        }
        // Загрузка значения текствого поля
        let textFieldValue = localStorage.getItem('textarea');
        if (textFieldValue !== null) {
            $('#textarea').val(textFieldValue);
        }
      
        // Загрузка значения radio полей
        let firstRadioValue = localStorage.getItem('radio1');
        if (firstRadioValue !== null) {
            $('#radio1').attr('checked',true);
            console.log("firstRadioValue");
        }
      
        let secondRadioValue = localStorage.getItem('radio2');
        if (secondRadioValue !== null) {
            $('#radio2').attr('checked',true);
            console.log("secondRadioValue");
        }
      
        let thirdRadioValue = localStorage.getItem('radio3');
        if (thirdRadioValue !== null) {
            $('#radio3').attr('checked',true);
            console.log("thirdRadioValue");
        }
    }
    $(document).ready(function() {
        loadFormData();
        console.log(localStorage);
    });
});