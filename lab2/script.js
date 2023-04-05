$(document).ready(function() {
    jQuery.validator.addMethod("numbersonly", function(value, element) {
        return this.optional(element) || /^\d+$/.test(value);
        }, "Пожалуйста, введите только цифры.");
    // Инициализация плагина jQuery Validation Plugin
    jQuery("form").validate({
        errorPlacement: function(error, element) {
            // показываем ошибку всплывающим окном
            if (error[0].innerHTML != null && error[0].innerHTML !== "") {
                $(element).tooltipster( { // инициализация Tooltipster
                    content: $(error).text(),
                    onlyOne: false, // разрешить несколько окон
                    position: 'left',
                    animation: 'grow', 
                    theme: 'tooltipster-punk' // выбор темы
                });
                $(element).tooltipster('open'); // открыть окно
            }
        },
        success: function(element) {
            // скрываем всплывающее окно при успешной валидации
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
                required: "Please, choose first position"
            }
        }
    });
    $("form input[type='text']").on('focusout', function() {
        $(this).tooltipster('close');
    });
    // jQuery(document).on("Change keyup input click", "input[type='text']", function() {
    //     if(this.value.match(/[^0-9]/g)) {
    //         this.value = this.value.replace(/[^0-9]/g, "");
    //     };
    // });

    // Сохранение введенных данных в полях с помощью хранилища LocalStorage
    jQuery('input, radio, text').each(function() {
        var number = $(this).attr('id');
        var value = localStorage.getItem(number);
        if (value !== null) {
            if ($(this).is(':radio')) {
                $('input[name="radio"]').prop('checked', false);
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
            localStorage.setItem(number, value);
            localStorage.setItem('textarea', textarea.value);
        });
    });

    // Загрузка введенных данных в полях с помощью хранилища LocalStorage
    function loadFormData() {

        // Загрузка number поля
        var numberFieldValue = localStorage.getItem('onlynumber');
        if (numberFieldValue !== null) {
            $('#onlynumber').val(numberFieldValue);
        }
        // Загрузка значения текствого поля
        var textFieldValue = localStorage.getItem('textarea');
        if (textFieldValue !== null) {
            $('#textarea').val(textFieldValue);
        }
      
        // Загрузка значения radio поля
        var radioFieldValue = localStorage.getItem('radio-field');
        if (radioFieldValue !== null) {
            $('#radio-field').val(radioFieldValue);
        }
      
        // Загрузка значения radio полей
        var firstRadioValue = localStorage.getItem('radio1');
        if (firstRadioValue !== null) {
            $('#radio-field input[type="radio"]').eq(0).prop('checked', (firstRadioValue === 'true'));
        }
      
        var secondRadioValue = localStorage.getItem('radio2');
        if (secondRadioValue !== null) {
            $('#radio-field input[type="radio"]').eq(1).prop('checked', (secondRadioValue === 'true'));
        } else {
            $('#radio-field input[type="radio"]').eq(1).prop('checked', false);
        }
      
        var thirdRadioValue = localStorage.getItem('radio3');
        if (thirdRadioValue !== null) {
            $('#radio-field input[type="radio"]').eq(2).prop('checked', (thirdRadioValue === 'true'));
        } else {
            $('#radio-field input[type="radio"]').eq(2).prop('checked', false);
        }
    }
    $(document).ready(function() {
        loadFormData();
        console.log(localStorage);
    });
});