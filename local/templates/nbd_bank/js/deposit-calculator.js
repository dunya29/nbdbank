'use strict';

document.addEventListener('DOMContentLoaded', function function_name() {


    // Получение данных с сервера (калькулятор вкладов)
    function request(method, url, body, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                cb(xhr.response);
            }
        };
    }

    if (document.getElementById('consumer-calc')) {

        // Клик по кнопке "РАСЧИТАТЬ"
        var periodConsumer = document.querySelector('#period-consumer');
        var summConsumer = document.querySelector('#summ-consumer');

        var periodConsumerInput = document.querySelector('#period-input');
        var summConsumerInput = document.querySelector('#summ-input');

        // Значения полей по умолчанию
        var period = 180; // Продолжительность вклада в днях
        var summ = 100000; // Сумма вклада (50000 - 3000000)

        // Заполняем поля (input) значениями поумолчанию
        periodConsumerInput.value = period;
        summConsumerInput.value = summ;

        // Запуск бегунков
        // Срок размещения в месяцах
        noUiSlider.create(periodConsumer, {
            start: period,
            step: 30,
            connect: [true, false],
            range: {
                min: [30, 30],
                "10%": [120, 60],
                "22%": [180, 90],
                "34%": [270, 90],
                "48%": [360, 180],
                "62%": [540, 180],
                "76%": [720, 360],
                'max': [1080]
            },
            format: {
                to: function to(value) {
                    let thisVal = Math.round(value);
                    let returnDate = thisVal+ ' дней';
                    if(thisVal==360){
                        returnDate = "1 год";
                    }else if(thisVal==720){
                        returnDate = "2 года";
                    }else if(thisVal==1080){
                        returnDate = "3 года";
                    }
                    return returnDate;
                },
                from: function from(value) {
                    let returnDate = value;
                    returnDate = value.replace(' дней', '');
                    returnDate = value.replace(' год', '');
                    returnDate = value.replace(' года', '');
                    return returnDate;
                }
            }
        });

        var currencyInput = document.querySelector('#currency-consumer');
        var body = 'currency_name=' + currencyInput.value;

        request('POST', '/actions/deposit-calculator/data.php', body, function (response) {

            var result = JSON.parse(response);
            var symbol = result.currency_symbol;
            var minDepositSum = parseInt(result.min_sum);

            // Сумма вклада
            noUiSlider.create(summConsumer, {
                start: minDepositSum,
                step: 1000,
                connect: [true, false],
                range: {
                    'min': minDepositSum,
                    'max': 3000000
                },
                format: {
                    to: function to(value) {
                        // value = String(Math.round(value));
                        value = intToStrGroup(Math.round(value));
                        return value + ' ' + symbol;
                    },
                    from: function from(value) {
                        return value.replace(' ' + symbol, '');
                    }
                }
            });

            var rangeSliders = document.querySelectorAll('.deposit-calculator .nouislider');

            // Проходим по всем ползункам, и назначаем события изменения
            rangeSliders.forEach(function (rangeSlider) {

                var sliderParent = rangeSlider.closest('.nouislider-wrap');
                var inputValue = sliderParent.querySelector('input');

                // Событие- изменение поля слайдера
                rangeSlider.noUiSlider.on('update', function (values, handle) {
                    inputValue.value = values[handle];
                    // calculate();
                });

                // Событие- изменение поля input
                inputValue.addEventListener('change', function () {
                    var newStr = this.value.replace(',', '.');
                    newStr = cleraStr(newStr);
                    rangeSlider.noUiSlider.set(newStr);
                });
            });

            currencyInput.addEventListener('change', function (e) {
                var body = 'currency_name=' + this.value;
                request('POST', '/actions/deposit-calculator/data.php', body, function (response) {
                    response = JSON.parse(response);
                    /* console.log(response); */
                    symbol = response.currency_symbol;
                    minDepositSum = parseInt(response.min_sum);

                    summConsumer.noUiSlider.updateOptions({
                        start: minDepositSum,
                        step: minDepositSum,
                        range: {
                            'min': minDepositSum,
                            'max': 3000000
                        },
                        format: {
                            to: function to(value) {
                                // value = String(Math.round(value));
                                value = intToStrGroup(Math.round(value));
                                return value + ' ' + symbol;
                            },
                            from: function from(value) {
                                return value.replace(' ' + symbol, '');
                            }
                        }
                    });
                });
            });

            var resultDepositBtn = document.querySelector('.deposit-calculator #calculation-consumer-btn');
            resultDepositBtn.addEventListener('click', function (e) {

                var calculatorWrap = e.target.closest('.calculator__wrap');
                var calculatorResultWrap = calculatorWrap.querySelector('.calculator__result');
                var SummRange = strToInt(summConsumerInput.value);
                var SummPeriod = strToInt(periodConsumerInput.value);
                var formData = 'currency=' + currencyInput.value + '&sum_range=' + SummRange + '&sum_period=' + SummPeriod;

                request('POST', '/actions/deposit-calculator/result.php', formData, function (response) {

              //      calculatorResultWrap.innerHTML = response;
                    $('.calculator__result').html(response);

                    calculatorResultWrap.classList.add('shown');

                   /* var buttonSend = document.getElementById('qwqwdqwdqwd');
                    buttonSend.onclick = function (e) {
                        e.preventDefault();

                    };*/

                    var delta = $("#deposit-result").offset().top;

                    $('html, body').animate({scrollTop: delta}, 700);

                    window.formValidationInit(calculatorResultWrap.querySelector('form[data-check-form]'));
                });
            });
        });
    }
});