$(document).ready(function() {
    // Инициализация плагина jQuery Validation Plugin
    $("form").validate({
        errorPlacement: function(error, element) {
            // показываем ошибку всплывающим окном
            if (error[0].innerHTML != null && error[0].innerHTML !== "") {
                $(element).tooltipster( { // инициализация Tooltipster
                    content: $(error).text(),
                    onlyOne: false, // разрешить несколько окон
                    position: 'left',
                    animation: 'grow', 
                    theme: ['tooltipster-noir'] // выбор темы
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
            number: {
                required: "Please, enter your number:",
                pattern: "Yuor number can consider only numbers"
            },
            textarea: {
                required: "Please, enter some your thoushts:"
            },
            radio: {
                required: "Please, choose first position"
            }
        }
    });

    $(document).on("Change keyup input click", "input[type='num']", function() {
        if(this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, "");
        };
    });
    $("form input[type='text']").on('focusout', function() {
        $(this).tooltipster('close');
    });
  
    // Сохранение введенных данных в полях с помощью хранилища LocalStorage
    $('input, radio').each(function() {
        var number = $(this).attr('id');
        console.log(localStorage);
        var value = localStorage.getItem(number);
        if (value !== null) {
            if ($(this).is(':radio')) {
                $(this).prop('checked', value === 'true');
            } else {
                $(this).val(value);
            }
        }
        $(this).on('input change', function() {
            var value;
            if ($(this).is(':radio')) {
                value = $(this).prop('checked');
                console.log(localStorage);
            } else {
                value = $(this).val();
            }
            localStorage.setItem(number, value);
        });
    });

    // Загрузка введенных данных в полях с помощью хранилища LocalStorage
    function loadFormData() {

        // Загрузка значения текствого поля
        var textFieldValue = localStorage.getItem('text-field');
        if (textFieldValue !== null) {
            $('#text-field').val(textFieldValue);
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