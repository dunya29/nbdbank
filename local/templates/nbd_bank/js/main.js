//var cityId = parseInt($('#cityselector-header').val());

var officeMap = {
    cityId: 1, //идентификатор города
    officeId: 1, // индекс нужного офиса в масиве
}

$('document').ready(function () {
    $('body').on('change', '.field-text__input-wrap.radio input', function () {
        var type = $(this).val();
        $(this).parents('form').find('.type-container').removeClass('active');
        $(this).parents('form').find('.type-container.' + type).addClass('active');
    })
})

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // var burgers = document.querySelectorAll('.burger')

    // for (var i = 0; i < burgers.length; i++) {
    //   var burger = burgers[i];

    //   burger.addEventListener('click', showBurgerTarget);

    // }

    // function showBurgerTarget() {
    //   var targetId = this.getAttribute('data-target-id');
    //   var targetClassToggle = this.getAttribute('data-target-class-toggle');
    //   if (targetId && targetClassToggle) {
    //     this.classList.toggle('burger_close');
    //     document.getElementById(targetId).classList.toggle(targetClassToggle);
    //   }

    //   // Класс для бади, отключающий прокрутку
    //   document.body.classList.toggle('menu-open');
    // }

});
'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
    /*
      Форма: работа стилизованного input[type="file"]
      Автор: Osvaldas Valutis, www.osvaldas.info (адаптировано под используемую разметку)
      Available for use under the MIT License
    */

    function closest(el, selector) {
        var matchesFn;

        // find vendor prefix
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        });

        var parent;

        // traverse parents
        while (el) {
            parent = el.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }

        return null;
    }

    var inputs = document.querySelectorAll('.field-file__input:not([disabled])');
    Array.prototype.forEach.call(inputs, function (input) {
        var label = closest(input, '.field-file').querySelector('.field-file__name-text'),
            labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
            var fileName = '';
            if (this.files && this.files.length > 1) {
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            } else {
                fileName = e.target.value.split('\\').pop();
            }

            if (fileName) {
                label.innerHTML = fileName;
            } else {
                label.innerHTML = labelVal;
            }
        });
    });
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            'use strict';

            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }
    //formSelectOffices
    if (document.querySelector('.formSelectCity')) {
        window.cityChoise = new Choices('.formSelectCity', {
            searchEnabled: false,
            shouldSort: false,
            placeholderValue: 'Выберите'
        });
    }

    if (document.querySelector('#formSelectOffices')) {
        window.oficcesChoise = new Choices('#formSelectOffices', {
            searchEnabled: false,
            shouldSort: false,
            placeholderValue: 'Выберите'
        });
    }

    if (document.querySelector('.basic-form-select')) {
        var commonSelects = new Choices('.basic-form-select', {
            searchEnabled: false,
            shouldSort: false,
            placeholderValue: 'Выберите'
        });
    }

    window.initAjaxSelect = function () {

        if (document.querySelector('.ajax-form-select')) {
            var _commonSelects = new Choices('.ajax-form-select', {
                searchEnabled: false,
                shouldSort: false,
                placeholderValue: 'Выберите'
            });
        }
    };

    window.initAjaxSelect();
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // Добавление/удаление модификаторов при фокусировке на ссылочном элементе
    var linkClassName = 'main-nav__link';
    var linkClassNameShowChild = 'main-nav__item_show-child';
    var findLinkClassName = new RegExp(linkClassName);
    // Слежение за всплывшим событием focus (нужно добавить класс, показывающий потомков)
    document.addEventListener('focus', function (event) {
        // Если событие всплыло от одной из ссылок гл. меню
        if (findLinkClassName.test(event.target.className)) {
            // Добавим классы, показывающие списки вложенных уровней, на всех родителей
            var parents = getParents(event.target, '.main-nav__item');
            for (var i = 0; i < parents.length; i++) {
                parents[i].classList.add(linkClassNameShowChild);
            }
        }
    }, true);
    // Слежение за всплывшим событием blur (нужно убрать класс, показывающий потомков)
    document.addEventListener('blur', function (event) {
        // Если событие всплыло от одной из ссылок гл. меню
        if (findLinkClassName.test(event.target.className)) {
            // Уберем все классы, показывающие списки 2+ уровней
            var parents = document.querySelectorAll('.' + linkClassNameShowChild);
            for (var i = 0; i < parents.length; i++) {
                parents[i].classList.remove(linkClassNameShowChild);
            }
        }
    }, true);

    /*! getParents.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getParents */
    /**
     * Get all of an element's parent elements up the DOM tree
     * @param  {Node}   elem     The element
     * @param  {String} selector Selector to match against [optional]
     * @return {Array}           The parent elements
     */
    var getParents = function getParents(elem, selector) {

        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                }
                return i > -1;
            };
        }

        // Setup parents array
        var parents = [];

        // Get matching parent elements
        for (; elem && elem !== document; elem = elem.parentNode) {

            // Add matching parents to array
            if (selector) {
                if (elem.matches(selector)) {
                    parents.push(elem);
                }
            } else {
                parents.push(elem);
            }
        }

        return parents;
    };
});

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var maps = document.querySelectorAll('.map');

    if (maps.length === 0) return;

    $.when($.getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=70c08e9e-02ce-473c-81b9-6a34a2918e81')).then(function () {
        for (var key = 0, len = maps.length; key < len; key++) {
            init.call(maps[key]);
        }

        function init() {
            var id = this.id,
                myMap;

            // Объект где будем хранить коллекции меток
            var geoDataCollections = {};
            // текущая коллекция,
            // сохраняем колл-цию, что бы при изменении настроек (город, тип меток)
            // можно было бы сначала удалить старый набор
            var currentCollection = void 0;
            var currentPlacemark = void 0;

            // Коэффициент смещение на Базовых картах
            var longitudeCoeff = id === 'map-base' || id === 'map-offices' ? 0.05 : 0;

            // Переключатели (выбор города, типа точек)
            // У радио кнопок value долны быть обязательно 0 или 1
            var citySelector = document.querySelector('#cityselector');
            var pointTypeSelector = document.querySelectorAll('#point-type-map input[name="point-type"]');
            // Крестик для закрытия
            var mapBlockClose = document.querySelector('.map-block__bord-close');

            // Тип метки (по умолчанию 1 - офисы, 4 - банкоматы)
            var pointType = 1;
            // Город (берем из глобальной переменной)
            var cityId = cityId; //тут

            // Проверим, на всякий случай, выбранный тип точек (Офисы или Банкоматы)
            pointTypeSelector.forEach(function (item) {
                if (item.checked) {
                    pointType = +item.value;
                }
            });


            ymaps.ready(function () {

                $.getJSON("/actions/offices.php", function (response) {
					
					console.log(response);
					
                    var geoData = response;

                    var cityId = $('#cityselector').val();

                    myMap = new ymaps.Map(id, {
                        center: [geoData[cityId].center[0], geoData[cityId].center[1] + longitudeCoeff],
                        zoom: 11, //data.zoom,
                        behaviors: ['drag', 'multiTouch'],
                        controls: ['geolocationControl', 'zoomControl']
                    });

                    // Создаем колекию точек
                    // Проходим по всем городам из глобального объекта geoData

                    var _loop = function _loop(_cityId) {

                        geoDataCollections[_cityId] = {};

                        // Если существуует объект с офисами
                        // собираем из него коллекцию
                        if (geoData[_cityId].offices && Object.keys(geoData[_cityId].offices).length) {
                            // Создаем коллекцию
                            var collection = new ymaps.GeoObjectCollection();
                            var officesObj = geoData[_cityId].offices;

                            for (var officeId in officesObj) {
                                var placemark = createPlacemark(officesObj[officeId].coords, _cityId, 1, +officeId);
                                collection.add(placemark);
                            }

                            geoDataCollections[_cityId][1] = collection;
                        }

                        // Если существуует объект c банкоматами
                        // собираем из него коллекцию
                        if (geoData[_cityId].atms && Object.keys(geoData[_cityId].atms).length) {
                            // Создаем коллекцию
                            var _collection = new ymaps.GeoObjectCollection();
                            var atmsObj = geoData[_cityId].atms;


                            for (var atmId in atmsObj) {
                                var _placemark = createPlacemark(atmsObj[atmId].coords, _cityId, 4, +atmId);
                                _collection.add(_placemark);
                            }

                            geoDataCollections[_cityId][4] = _collection;
                        }
                    };

                    for (var _cityId in geoData) {
                        _loop(_cityId);
                    }

                    // Подставляем данные метки (офиса или банкомата)
                    // в блок с информацией на карте

                    function setMarkOptions(cityId, pointType, pointId) {
                        var pointName = getPointNameByPointType(pointType);

                        document.querySelector('[data-mark-title]').innerHTML = geoData[cityId][pointName][pointId].name;
                        document.querySelector('[data-mark-address]').innerHTML = geoData[cityId][pointName][pointId].address;
                        document.querySelector('[data-mark-phone]').innerHTML = geoData[cityId][pointName][pointId].phone;
						document.querySelector('[data-mark-schedule]').innerHTML = '';
						if(geoData[cityId][pointName][pointId].biometrics=="Y"){
							document.querySelector('[data-mark-biometry]').innerHTML = '\n\t\t\t\t\t\t\t\t\t<div class="font-bold map-block__bord-text">Регистрация биометрии</div>\n\t\t\t\t\t\t\t\t\t<span class="map-block__bord-text">' + geoData[cityId][pointName][pointId].biometrics_time + '</span>';
							document.querySelector('[data-mark-biometry]').parentElement.removeAttribute('style');
						}else{
							document.querySelector('[data-mark-biometry]').parentElement.setAttribute('style', 'display:none');
						}
                        if (pointType === 1) {
                            if (geoData[cityId][pointName][pointId].schedule[0] !== '') {
                                document.querySelector('[data-mark-schedule]').innerHTML = '\n\t\t\t\t\t\t\t\t<div class="block block_orange-b">\n\t\t\t\t\t\t\t\t\t<div class="font-bold map-block__bord-text">\u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043B\u0438\u0446\u0430</div>\n\t\t\t\t\t\t\t\t\t<span class="map-block__bord-text">' + geoData[cityId][pointName][pointId].schedule[0] + '</span>\n\t\t\t\t\t\t\t\t</div>';
                            }
                            if (geoData[cityId][pointName][pointId].schedule[1] !== '') {
                                document.querySelector('[data-mark-schedule]').innerHTML += '\n\t\t\t\t\t\t\t\t<div class="block block_orange-b">\n\t\t\t\t\t\t\t\t\t<div class="font-bold map-block__bord-text">\u042E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043B\u0438\u0446\u0430</div>\n\t\t\t\t\t\t\t\t\t<span class="map-block__bord-text">' + geoData[cityId][pointName][pointId].schedule[1] + '</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
                            }
                            document.querySelector('[data-more-link] a').href = geoData[cityId][pointName][pointId].link;
                            document.querySelector('[data-more-link]').setAttribute('style', 'display:flex');
                        } else {
                            document.querySelector('[data-mark-schedule]').innerHTML = '\n\t\t\t\t\t\t\t\t<div class="block block_orange-b">\n\t\t\t\t\t\t\t\t\t<span class="map-block__bord-text">' + geoData[cityId][pointName][pointId].schedule[0] + '</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
                            // document.querySelector('[data-more-link]').style.display='none';
                            document.querySelector('[data-more-link]').setAttribute('style', 'display:none');
                        }

                        document.querySelector('#map-block').classList.add('map-block_shown');
                    }

                    // Получение N-ой метки из текущей коллекции
                    function getCurrentplacemark(collection, index) {
                        return collection.get(index);
                    }

                    // Устанвливаем маркеру  активную картинку
                    function setActivePlacemark(placemark) {
                        placemark.options.set({
                            iconImageHref: '/local/templates/nbd_bank/images/marker-active.png'
                        });
                    }

                    // Сбрасываем у маркеруа активную картинку
                    function resetActivePlacemark(placemark) {
                        placemark.options.set({
                            iconImageHref: '/local/templates/nbd_bank/images/marker.png'
                        });
                    }

                    function getPointNameByPointType(pointType) {
                        return pointType === 1 ? 'offices' : 'atms';
                    }

                    // Получаем порядковый номер точки по ее Id
                    function getPointIndexByPointId(cityId, pointId, pointType) {

                        var pointName = getPointNameByPointType(pointType);

                        return geoData[cityId][pointName][pointId].index;
                    }

                    // Получаем Id точки по ее порядковому номеру
                    function getPointIdByPointIndex(cityId, pointIndex, pointType) {

                        var pointName = getPointNameByPointType(pointType);

                        return Object.keys(geoData[cityId][pointName])[pointIndex];
                    }

                    // Фун-ция создания метки
                    function createPlacemark(pointCoords, cityId, pointType, pointId) {
                        var marker = new ymaps.Placemark(pointCoords, {
                            city_id: cityId,
                            point_type: pointType,
                            point_id: pointId //идентификатор точки
                            // balloonContent: point.name,
                        }, {
                            hideIconOnBalloonOpen: false,
                            // balloonOffset: [0, -50],
                            // если нужна своя метка, то расскоментируйте строки ниже
                            iconLayout: 'default#image',
                            iconImageHref: '/local/templates/nbd_bank/images/marker.png',
                            iconImageSize: [48, 58],
                            iconImageOffset: [-24, -58]
                        });

                        if (id !== 'map-office') {
                            marker.events.add(['click'], function (e) {

                                // сброс и установка активности
                                resetActivePlacemark(currentPlacemark);
                                currentPlacemark = e.get('target');
                                setActivePlacemark(currentPlacemark);

                                var cityId = e.get('target').properties.get('city_id');
                                var pointType = e.get('target').properties.get('point_type');
                                var pointId = e.get('target').properties.get('point_id');
                                setMarkOptions(cityId, pointType, pointId);
                            });
                        }

                        return marker;
                    }

                    if (id !== 'map-office') {

                        // по умолчани, показываем карту текущего города (cityId)
                        // показываем метки офисов (officesCollection)

                        currentCollection = geoDataCollections[cityId][pointType];
                        currentPlacemark = getCurrentplacemark(currentCollection, 0);

                        // Устанвливаем нулевому маркеру из текущей коллекции активную картинку
                        setActivePlacemark(currentPlacemark);

                        // Добавляем коллекцию на карту
                        // массшатбируем карту с учетом всех меток
                        myMap.geoObjects.add(currentCollection);
                        // myMap.setBounds(currentCollection.getBounds(), {checkZoomRange: true});

                        // Устанавливаем опции маркера
                        // pointId - свойство обекта offices или atms (id точки)
                        var pointId = getPointIdByPointIndex(cityId, 0, pointType);
                        setMarkOptions(cityId, pointType, pointId);

                    } else if (id === 'map-office') {
                        cityId = officeMap.cityId;
                        var officeIndex = getPointIndexByPointId(cityId, officeMap.officeId, 1);
                        currentCollection = geoDataCollections[cityId][1];
                        currentPlacemark = getCurrentplacemark(currentCollection, officeIndex);

                        myMap.geoObjects.add(currentPlacemark);
                        myMap.setCenter(geoData[cityId].offices[officeMap.officeId].coords, 12, {
                            checkZoomRange: true,
                            duration: 500,
                            timingFunction: "ease-in-out"
                        });
                    }

                    // Базовая карта или карта на странице ОФисы и банкоматы
                    // if (id === 'base') {
                    // 	console.log('Базовая карта')
                    // } else if (id === 'offices') {
                    // 	console.log('Карта Офисов и банкоматов');
                    // }

                    mapBlockClose && mapBlockClose.addEventListener('click', function (e) {
                        document.querySelector('#map-block').classList.remove('map-block_shown');
                    });

                    // Добавляем обработчики переключения типов точек
                    pointTypeSelector && pointTypeSelector.forEach(function (item) {
                        item.addEventListener('change', function (e) {
                            pointType = +e.target.value;
                            myMap.geoObjects.remove(currentCollection);

                            if (geoDataCollections[cityId][pointType]) {
                                currentCollection = geoDataCollections[cityId][pointType];
                                myMap.geoObjects.add(currentCollection);

                                var _pointId = getPointIdByPointIndex(cityId, 0, pointType);
                                setMarkOptions(cityId, pointType, _pointId);

                                resetActivePlacemark(currentPlacemark);
                                currentPlacemark = getCurrentplacemark(currentCollection, 0);
                                setActivePlacemark(currentPlacemark);
                            } else {
                                document.querySelector('#map-block').classList.remove('map-block_shown');
                            }

                            // Вариант с автомасштабирование и автоцентрированием
                            //
                            // if (geoDataCollections[cityId][pointType]) {
                            // 	currentCollection = geoDataCollections[cityId][pointType];
                            // 	myMap.geoObjects.add(currentCollection);
                            // 	myMap.setBounds(currentCollection.getBounds(), {checkZoomRange: true});
                            // } else {
                            // 	myMap.setCenter(geoData[cityId].center,12,{
                            // 		checkZoomRange: true,
                            // 		duration: 500,
                            // 		timingFunction: "ease-in-out"
                            // 	});
                            // }
                        });
                    });

                    // Добавляем обработчики выбора города (на карте)
                    citySelector && citySelector.addEventListener('change', function () {
                        cityId = this.value;
                        myMap.geoObjects.remove(currentCollection);

                        if (geoDataCollections[cityId][pointType]) {


                            currentCollection = geoDataCollections[cityId][pointType];
                            myMap.geoObjects.add(currentCollection);


                            var _pointId2 = getPointIdByPointIndex(cityId, 0, pointType);


                            setMarkOptions(cityId, pointType, _pointId2);

                            resetActivePlacemark(currentPlacemark);
                            currentPlacemark = getCurrentplacemark(currentCollection, 0);
                            setActivePlacemark(currentPlacemark);
                        } else {
                            document.querySelector('#map-block').classList.remove('map-block_shown');
                        }

                        var center = [geoData[cityId].center[0], geoData[cityId].center[1] + longitudeCoeff];
                        myMap.setCenter(center, 12, {
                            checkZoomRange: true,
                            duration: 500,
                            timingFunction: "ease-in-out"
                        });
                    });
                });
            });
        }
    });
});

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var burger = document.querySelector('.burger');
    var mobileMenuOpened = false;

    function targetToggler() {

        mobileMenuOpened = mobileMenuOpened ? false : true;

        document.getElementById('mobile-menu').classList.toggle('mobile-menu_shown');
        // Класс для бади, отключающий прокрутку
        document.body.classList.toggle('menu-open');
    }

    burger.addEventListener('click', function (e) {
        // e.preventDefault();
        this.classList.toggle('burger_close');
        targetToggler();
    });

    // Нажатие клавиши 'Escape'
    document.addEventListener('keyup', function (e) {
        if (e.keyCode === 27 && mobileMenuOpened) {
            targetToggler();
            burger.classList.toggle('burger_close');
        }

        mobileMenuOpened = false;
    });
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

// Демо событий модальных окон
$(document).ready(function () {
    $('#modal-demo-01').on('show.nth.modal', function () {
        console.log('Модальное окно #modal-demo-01: сработало событие show.nth.modal');
    });
    $('#modal-demo-01').on('shown.nth.modal', function () {
        console.log('Модальное окно #modal-demo-01: сработало событие shown.nth.modal');
    });
    $('#modal-demo-01').on('hide.nth.modal', function () {
        console.log('Модальное окно #modal-demo-01: сработало событие hide.nth.modal');
    });
    $('#modal-demo-01').on('hidden.nth.modal', function () {
        console.log('Модальное окно #modal-demo-01: сработало событие hidden.nth.modal');
    });
});

/* ========================================================================
 * Основано на Bootstrap: modal.js v3.3.7
 * Изменения минимальны: имена классов, событий, методов...
 * ========================================================================
 * Copyright 2011-2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function Modal(element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        // this.$dialog             = this.$element.find('.modal-dialog')
        this.$dialog = this.$element.find('.modal__dialog');
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;

        // if (this.options.remote) {
        //   this.$element
        //     // .find('.modal-content')
        //     .find('.modal__content')
        //     .load(this.options.remote, $.proxy(function () {
        //       // this.$element.trigger('loaded.bs.modal')
        //       this.$element.trigger('loaded.nth.modal')
        //     }, this))
        // }
    };

    Modal.VERSION = '3.3.7';

    // Modal.TRANSITION_DURATION = 300
    // Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };

    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    };

    Modal.prototype.show = function (_relatedTarget) {
        var that = this;
        // var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
        var e = $.Event('show.nth.modal', {relatedTarget: _relatedTarget});

        this.$element.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) return;

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        // this.$body.addClass('modal-open')
        this.$body.addClass('js-modal-open');

        this.escape();
        this.resize();

        // this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
        this.$element.on('click.dismiss.nth.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

        // this.$dialog.on('mousedown.dismiss.bs.modal', function () {
        this.$dialog.on('mousedown.dismiss.nth.modal', function () {
            // that.$element.one('mouseup.dismiss.bs.modal', function (e) {
            that.$element.one('mouseup.dismiss.nth.modal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
            });
        });

        this.backdrop(function () {
            // var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body); // don't move modals dom position
            }

            that.$element
            // .show()
                .css('display', 'flex').scrollTop(0);

            that.adjustDialog();

            // if (transition) {
            that.$element[0].offsetWidth; // force reflow
            // }

            that.$element.addClass('modal_open');

            that.enforceFocus();

            // var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
            var e = $.Event('shown.nth.modal', {relatedTarget: _relatedTarget});

            // transition ?
            //   that.$dialog // wait for modal to slide in
            //     .one('bsTransitionEnd', function () {
            //       that.$element.trigger('focus').trigger(e)
            //     })
            //     .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            that.$element.trigger('focus').trigger(e);
        });
    };

    Modal.prototype.hide = function (e) {
        if (e) e.preventDefault();

        // e = $.Event('hide.bs.modal')
        e = $.Event('hide.nth.modal');

        this.$element.trigger(e);

        if (!this.isShown || e.isDefaultPrevented()) return;

        this.isShown = false;

        this.escape();
        this.resize();

        // $(document).off('focusin.bs.modal')
        $(document).off('focusin.nth.modal');

        this.$element.removeClass('modal_open')
        // .off('click.dismiss.bs.modal')
            .off('click.dismiss.nth.modal')
            // .off('mouseup.dismiss.bs.modal')
            .off('mouseup.dismiss.nth.modal');

        // this.$dialog.off('mousedown.dismiss.bs.modal')
        this.$dialog.off('mousedown.dismiss.nth.modal');

        // $.support.transition && this.$element.hasClass('fade') ?
        //   this.$element
        //     .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        //     .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        this.hideModal();
    };

    Modal.prototype.enforceFocus = function () {
        $(document)
        // .off('focusin.bs.modal') // guard against infinite focus loop
            .off('focusin.nth.modal') // guard against infinite focus loop
            // .on('focusin.bs.modal', $.proxy(function (e) {
            .on('focusin.nth.modal', $.proxy(function (e) {
                if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger('focus');
                }
            }, this));
    };

    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            // this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
            this.$element.on('keydown.dismiss.nth.modal', $.proxy(function (e) {
                e.which == 27 && this.hide();
            }, this));
        } else if (!this.isShown) {
            // this.$element.off('keydown.dismiss.bs.modal')
            this.$element.off('keydown.dismiss.nth.modal');
        }
    };

    Modal.prototype.resize = function () {
        if (this.isShown) {
            // $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
            $(window).on('resize.nth.modal', $.proxy(this.handleUpdate, this));
        } else {
            // $(window).off('resize.bs.modal')
            $(window).off('resize.nth.modal');
        }
    };

    Modal.prototype.hideModal = function () {
        var that = this;
        this.$element.hide();
        this.backdrop(function () {
            that.$body.removeClass('js-modal-open');
            that.resetAdjustments();
            that.resetScrollbar();
            // that.$element.trigger('hidden.bs.modal')
            that.$element.trigger('hidden.nth.modal');
        });
    };

    Modal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };

    Modal.prototype.backdrop = function (callback) {
        var that = this;
        // var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
            // var doAnimate = $.support.transition && animate

            this.$backdrop = $(document.createElement('div'))
            // .addClass('modal-backdrop ' + animate)
                .addClass('modal__backdrop ').appendTo(this.$body);

            // this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
            this.$element.on('click.dismiss.nth.modal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return;
                }
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
            }, this));

            // if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            // this.$backdrop.addClass('modal__backdrop_shown')

            if (!callback) return;

            // doAnimate ?
            //   this.$backdrop
            //     .one('bsTransitionEnd', callback)
            //     .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
            callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('modal_open');

            var callbackRemove = function callbackRemove() {
                that.removeBackdrop();
                callback && callback();
            };
            // $.support.transition && this.$element.hasClass('fade') ?
            //   this.$backdrop
            //     .one('bsTransitionEnd', callbackRemove)
            //     .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
            callbackRemove();
        } else if (callback) {
            callback();
        }
    };

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function () {
        this.adjustDialog();
    };

    Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
    };

    Modal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        });
    };

    Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };

    Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
    };

    Modal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad);
    };

    Modal.prototype.measureScrollbar = function () {
        // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        scrollDiv.style.overflow = "scroll"; // nicothin: Отчего-то результатом подсчета всегда был 0 :(
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };

    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            // var data    = $this.data('bs.modal')
            var data = $this.data('nth.modal');
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

            // if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
            if (!data) $this.data('nth.modal', data = new Modal(this, options));
            if (typeof option == 'string') data[option](_relatedTarget); else if (options.show) data.show(_relatedTarget);
        });
    }

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;

    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
        $.fn.modal = old;
        return this;
    };

    // MODAL DATA-API
    // ==============

    // $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    $(document).on('click.nth.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
        // var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
        var option = $target.data('nth.modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data());

        if ($this.is('a')) e.preventDefault();

        // $target.one('show.bs.modal', function (showEvent) {
        $target.one('show.nth.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
            // $target.one('hidden.bs.modal', function () {
            $target.one('hidden.nth.modal', function () {
                $this.is(':visible') && $this.trigger('focus');
            });
        });
        Plugin.call($target, option, this);
    });
}(jQuery);
'use strict';

document.addEventListener('DOMContentLoaded', function function_name() {

    // Калькулятор крдитов
    if (document.getElementById('business-calc')) {
        var createCreditTable = function createCreditTable(val) {

            // Параметры для расчетв таблицы результатов
            var payment1 = 0.7 * val;
            var payment2 = 0.7 * val;
            var payment3 = 0.7 * val;

            var limit1 = 7.512 * val;
            var limit2 = 13.493 * val;
            var limit3 = 17.965 * val;

            payment1 = intToStrGroup(parseFloat(payment1.toFixed(2)));
            payment2 = intToStrGroup(parseFloat(payment2.toFixed(2)));
            payment3 = intToStrGroup(parseFloat(payment3.toFixed(2)));

            limit1 = intToStrGroup(parseFloat(limit1.toFixed(2)));
            limit2 = intToStrGroup(parseFloat(limit2.toFixed(2)));
            limit3 = intToStrGroup(parseFloat(limit3.toFixed(2)));

            return '\n\t\t\t\t<table>\n\t\t\t\t\t<thead>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>\u0421\u0420\u041E\u041A</th>\n\t\t\t\t\t\t\t<th>\u041B\u0418\u041C\u0418\u0422</th>\n\t\t\t\t\t\t\t<th>\u0421\u0420\u0415\u0414\u041D\u0415\u041C\u0415\u0421\u042F\u0427\u041D\u042B\u0419 \u041F\u041B\u0410\u0422\u0415\u0416</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>1 \u0433\u043E\u0434</td>\n\t\t\t\t\t\t\t<td>' + limit1 + ' <span class="icon  icon_inline i-rub"></span></td>\n\t\t\t\t\t\t\t<td>' + payment1 + ' <span class="icon  icon_inline i-rub"></span></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>2 \u0433\u043E\u0434</td>\n\t\t\t\t\t\t\t<td>' + limit2 + ' <span class="icon  icon_inline i-rub"></span></td>\n\t\t\t\t\t\t\t<td>' + payment2 + ' <span class="icon  icon_inline i-rub"></span></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>3 \u0433\u043E\u0434</td>\n\t\t\t\t\t\t\t<td>' + limit3 + ' <span class="icon  icon_inline i-rub"></span></td>\n\t\t\t\t\t\t\t<td>' + payment3 + ' <span class="icon  icon_inline i-rub"></span></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t';
        };

        // Клик по кнопке "РАСЧИТАТЬ"


        var durationLoan = document.querySelector('#duration-loan');
        var profitLoan = document.querySelector('#profit-loan');
        var cashflowLoan = document.querySelector('#cashflow-loan');

        var durationLoanInput = document.querySelector('#duration-input');
        var profitLoanInput = document.querySelector('#profit-input');
        var cashflowLoanInput = document.querySelector('#cashflow-input');

        // Значения полей по умолчанию
        var duration = 8; // Продолжительность деятельности в месяцах (1 - 24)
        var profit = 100000; // Чистая прибыль за меся (50000 - 3000000)
        var cashflow = 500000; // Выручка за месяц (100000 - 5000000)

        // Заполняем поля (input) значениями поумолчанию
        durationLoanInput.value = duration;
        profitLoanInput.value = profit;
        cashflowLoanInput.value = cashflow;

        // Запуск бегунков
        // родолжительность деятельности в месяцах
        noUiSlider.create(durationLoan, {
            start: duration,
            step: 1,
            connect: [true, false],
            range: {
                'min': 1,
                'max': 24
            },
            format: {
                to: function to(value) {
                    return Math.round(value) + ' мес.';
                },
                from: function from(value) {
                    return value.replace(' мес.', '');
                }
            }
        });

        // Чистая прибыль за месяц
        noUiSlider.create(profitLoan, {
            start: profit,
            step: 50000,
            connect: [true, false],
            range: {
                'min': 50000,
                'max': 3000000
            },
            format: {
                to: function to(value) {
                    // value = String(Math.round(value));
                    value = intToStrGroup(Math.round(value));
                    return value + ' руб.';
                },
                from: function from(value) {
                    return value.replace(' руб.', '');
                }
            }
        });

        // Выручка за месяц
        noUiSlider.create(cashflowLoan, {
            start: cashflow,
            step: 50000,
            connect: [true, false],
            range: {
                'min': 100000,
                'max': 5000000
            },
            format: {
                to: function to(value) {
                    // value = String(Math.round(value));
                    value = intToStrGroup(Math.round(value));
                    return value + ' руб.';
                },
                from: function from(value) {
                    return value.replace(' руб.', '');
                }
            }
        });

        var resultLoanBtn = document.querySelector('#calculation-loan-btn');

        resultLoanBtn.addEventListener('click', function (e) {
            var calculatorWrap = e.target.closest('.calculator__wrap');
            var calculatorResultWrap = calculatorWrap.querySelector('.calculator__result');

            getLoanData('/actions/result-credit.php', function (data) {
                //calculatorResultWrap.innerHTML = data;
				$('.calculator__result').html(data);
                var calculatorTableWrap = calculatorResultWrap.querySelector('[data-table]');

                // преобразуем поле с чистой прибылью (строка) в число, убирая лишниие буквы
                var pli = strToInt(profitLoanInput.value);

                calculatorTableWrap.innerHTML = createCreditTable(pli);

                calculatorResultWrap.classList.add('shown');
                var delta = $("#loan-result").offset().top;
                $('html, body').animate({scrollTop: delta}, 700);

                window.formValidationInit(calculatorResultWrap.querySelector('form[data-check-form]'));
            });
        });
    }

    // --------------------------------------------------------------------
    // Калькулятор вкладов


    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

    // Получение данных с сервера (кредитный калькулятор)
    function getLoanData(url, cb) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                cb(xhr.responseText);
            }
        };
    }


});
'use strict';

document.addEventListener('DOMContentLoaded', function (e) {

    window.initAjaxSlide = function () {

        if (document.getElementById('credit-order')) {

            var creditOrderCredittime = document.querySelector('#credit-order-credittime');
            var creditOrderCreditsumm = document.querySelector('#credit-order-creditsumm');
            var creditOrderActivitytime = document.querySelector('#credit-order-activitytime');

            var creditOrderCredittimeInput = document.querySelector('#credit-order-credittime-input');
            var creditOrderCreditsummInput = document.querySelector('#credit-order-creditsumm-input');
            var creditOrderActivitytimeInput = document.querySelector('#credit-order-activitytime-input');

            // Значения полей по умолчанию
            var credit_time = 10; // Срок кредита в месяцах (1 - 60)
            var credit_summ = 1000000; // Сумма (50000 - 5000000)
            var activity_time = 3; // Продолжительность деятельности (12 - 60)

            // Заполняем поля (input) значениями поумолчанию
            creditOrderCredittimeInput.value = credit_time;
            creditOrderCreditsummInput.value = credit_summ;
            creditOrderActivitytimeInput.value = activity_time;

            // Запуск бегунков
            // родолжительность деятельности в месяцах
            noUiSlider.create(creditOrderCredittime, {
                start: credit_time,
                step: 1,
                connect: [true, false],
                range: {
                    'min': 1,
                    'max': 60
                },
                format: {
                    to: function to(value) {
                        return Math.round(value) + ' мес.';
                    },
                    from: function from(value) {
                        return value.replace(' мес.', '');
                    }
                }
            });

            // Сумма
            noUiSlider.create(creditOrderCreditsumm, {
                start: credit_summ,
                step: 1,
                connect: [true, false],
                range: {
                    'min': 50000,
                    'max': 5000000
                },
                format: {
                    to: function to(value) {
                        value = String(Math.round(value));
                        value = value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                        return value + ' руб.';
                    },
                    from: function from(value) {
                        return value.replace(' руб.', '');
                    }
                }
            });

            // родолжительность деятельности в месяцах
            noUiSlider.create(creditOrderActivitytime, {
                start: activity_time,
                step: 1,
                connect: [true, false],
                range: {
                    'min': 12,
                    'max': 60
                },
                format: {
                    to: function to(value) {
                        return Math.round(value) + ' мес.';
                    },
                    from: function from(value) {
                        return value.replace(' мес.', '');
                    }
                }
            });
        }

        if (document.getElementById('leasing-order')) {

            var leasingOrderLeasingsumm = document.querySelector('#leasing-order-leasingsumm');
            var leasingOrderLeasingtime = document.querySelector('#leasing-order-leasingtime');

            var leasingOrderLeasingtimeInput = document.querySelector('#leasing-order-leasingtime-input');
            var leasingOrderLeasingsummInput = document.querySelector('#leasing-order-leasingsumm-input');

            // Значения полей по умолчанию
            var leasing_time = 10; // Срок кредита в месяцах (1 - 60)
            var leasing_summ = 1000000; // Сумма (50000 - 5000000)

            // Заполняем поля (input) значениями поумолчанию
            leasingOrderLeasingtimeInput.value = leasing_time;
            leasingOrderLeasingsummInput.value = leasing_summ;

            // Запуск бегунков
            // родолжительность деятельности в месяцах
            noUiSlider.create(leasingOrderLeasingtime, {
                start: leasing_time,
                step: 1,
                connect: [true, false],
                range: {
                    'min': 1,
                    'max': 60
                },
                format: {
                    to: function to(value) {
                        return Math.round(value) + ' мес.';
                    },
                    from: function from(value) {
                        return value.replace(' мес.', '');
                    }
                }
            });

            // Сумма
            noUiSlider.create(leasingOrderLeasingsumm, {
                start: leasing_summ,
                step: 1,
                connect: [true, false],
                range: {
                    'min': 50000,
                    'max': 5000000
                },
                format: {
                    to: function to(value) {
                        value = String(Math.round(value));
                        value = value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                        return value + ' руб.';
                    },
                    from: function from(value) {
                        return value.replace(' руб.', '');
                    }
                }
            });
        }
    };

    window.initAjaxSlide();
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // if(document.getElementById('demo-nouislider')) {

    //   var demoNoUiSlider = document.getElementById('demo-nouislider');
    //   var demoNoUiSliderStartInput = document.getElementById('demo-nouislider-start');
    //   var demoNoUiSliderEndInput = document.getElementById('demo-nouislider-end');
    //   noUiSlider.create(demoNoUiSlider, {
    //     start: [demoNoUiSliderStartInput.value, demoNoUiSliderEndInput.value],
    //     connect: true,
    //     step: 1,
    //     range: {
    //       'min': 0,
    //       'max': 100
    //     }
    //   });
    //   demoNoUiSlider.noUiSlider.on('update', function( values, handle ) {
    //     var value = values[handle];
    //     if ( handle ) {
    //       demoNoUiSliderEndInput.value = Math.round(value);
    //     } else {
    //       demoNoUiSliderStartInput.value = Math.round(value);
    //     }
    //   });
    //   demoNoUiSliderEndInput.addEventListener('change', function(){
    //     demoNoUiSlider.noUiSlider.set([null, this.value]);
    //   });
    //   demoNoUiSliderStartInput.addEventListener('change', function(){
    //     demoNoUiSlider.noUiSlider.set([this.value, null]);
    //   });

    // }

    function cleraStr(str) {
        return str.replace(/ |руб.|лет|%/g, '');
    }

    var rangeSliders = document.querySelectorAll('.nouislider');

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
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var numbers = document.querySelectorAll('.number');

    Array.prototype.forEach.call(numbers, function (number) {

        var input = number.querySelector('input[type=text]'),
            minus = number.querySelector('.number__minus'),
            plus = number.querySelector('.number__plus');

        minus.addEventListener('click', function () {
            var count = parseInt(input.getAttribute('value')) - 1;
            count = count < 1 ? 1 : count;
            input.setAttribute('value', count);
            input.value = String(count);
        });

        plus.addEventListener('click', function () {
            var count = parseInt(input.getAttribute('value')) + 1;
            input.setAttribute('value', count);
            input.value = String(count);
        });

        input.addEventListener('input', function () {
            this.setAttribute('value', this.value);
        });
    });
});
'use strict';

$(document).ready(function () {

    var $promoSlider = $("#promo");
    $promoSlider.owlCarousel({
        items: 1,
        nav: false,
		autoplay: true,
		loop: true,
        dots: true,
        dotsContainer: '#main-slider-control .slider-control__dots',
        onInitialized: function (event) {
            setTimeout(function () {
                $(event.target).css({'opacity': 1, 'visibility': 'visible'});
            }, 500);
        }

        // responsive : {
        // 	0 : {
        // 		items: 2,
        // 		margin: 0,
        // 	},
        // 	576 : {
        // 		items: 3,
        // 		margin: 20,
        // 	},

        // 	768 : {
        // 		items: 4,
        // 		margin: 20,
        // 	},

        // 	1440 : {
        // 		items: 5,
        // 		margin: 30,
        // 	}
        // }

    });

    // About sliders
    var $aboutSliders = document.querySelectorAll('.about-slider');
    $aboutSliders.forEach(function (aboutSlider) {

        var sliderControl = aboutSlider.querySelector('.slider-control');

        $('.owl-carousel', aboutSlider).owlCarousel({
            items: 1,
            nav: false,
            dots: true,
            dotsContainer: '#' + sliderControl.getAttribute('id') + ' .slider-control__dots'

        }).parent().css('opacity', 1);
    });

    // var whyweSliderBusiness = $("#whywe-business");
    // whyweSliderBusiness.owlCarousel({
    // 	items: 1,
    // 	nav: false,
    // 	dots: true,
    // 	dotsContainer: '#whywe-business-slider-control .slider-control__dots',

    // }).parent().css('opacity', 1);

    // var whyweSliderconsumer = $("#whywe-consumer");
    // whyweSliderconsumer.owlCarousel({
    // 	items: 1,
    // 	nav: false,
    // 	dots: true,
    // 	dotsContainer: '#whywe-consumer-slider-control .slider-control__dots',

    // }).parent().css('opacity', 1);


    var $yearFilter = $('#year-filter');

    $yearFilter.owlCarousel({
        items: 11,
        nav: false,
        dots: false,
        responsive: {
            /* 0: {
                items: 3
            }, */
            480: {
                items: 4
            },
            576: {
                items: 5
            },

            768: {
                items: 7
            },

            992: {
                items: 9
            },

            1270: {
                items: 12
            }
        }

    }).parent().css('opacity', 1);
});
"use strict";

jQuery(document).ready(function ($) {
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    objectFitImages();
});
"use strict";

svg4everybody();
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    if (location.hash) {
        showTab(location.hash);
    }

    // Следим за поднимающимися кликами
    document.addEventListener('click', function (event) {
        if (event.target.dataset.toggle === 'tab') {
            event.preventDefault();
            var target = event.target.hash === undefined ? event.target.dataset.target : event.target.hash;
            if (target !== undefined) {
                showTab(target);
                if (history && history.pushState && history.replaceState) {
                    var stateObject = {'url': target};
                    if (window.location.hash && stateObject.url !== window.location.hash) {
                        window.history.pushState(stateObject, document.title, window.location.pathname + target);
                    } else {
                        window.history.replaceState(stateObject, document.title, window.location.pathname + target);
                    }
                }
            }
        }
    });

    /**
     * Показывает таб
     * @param  {string} tabId ID таба, который нужно показать
     */
    function showTab(tabId) {
        var element = document.querySelector(tabId);
        if (element && element.classList.contains('tabs__content-item')) {
            var tabsParent = document.querySelector(tabId).closest('.tabs');
            var activeTabClassName = 'tabs__link-wrap_active';
            var activeTabContentClassName = 'tabs__content-item_active';
            // таб
            tabsParent.querySelectorAll('.' + activeTabClassName).forEach(function (item) {
                item.classList.remove(activeTabClassName);
            });
            var activeTab = tabsParent.querySelector('[href="' + tabId + '"]') ? tabsParent.querySelector('[href="' + tabId + '"]') : tabsParent.querySelector('[data-target="' + tabId + '"]');
            activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName);
            // контент таба
            tabsParent.querySelectorAll('.' + activeTabContentClassName).forEach(function (item) {
                item.classList.remove(activeTabContentClassName);
            });
            tabsParent.querySelector(tabId).classList.add(activeTabContentClassName);
        }
    }

    // Добавление метода .closest() (полифил, собственно)
    (function (e) {
        e.closest = e.closest || function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node; else node = node.parentElement;
            }
            return null;
        };
    })(Element.prototype);
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    function $$(selector, context) {
        context = context || document;
        var elements = context.querySelectorAll(selector);
        return Array.prototype.slice.call(elements);
    }

    var togglers = $$('.toggler');

    for (var i = 0; i < togglers.length; i++) {
        var showTogglerTarget = function showTogglerTarget(event) {
            event.preventDefault();
            var _this = this;
            var targetId = this.getAttribute('data-target-id');
            var targetClassToggle = this.getAttribute('data-target-class-toggle');
            // Если в эелементе есть атрибут "data-text" то при клике
            // будем менять местами с текстом ссылки
            var targetText = this.getAttribute('data-text');

            if (targetId && targetClassToggle) {
                this.classList.toggle('toggler_close');
                document.getElementById(targetId).classList.toggle(targetClassToggle);
                if (targetText) {
                    var oldText = this.children[0].innerHTML;

                    setTimeout(function () {
                        _this.children[0].innerHTML = targetText;
                        _this.setAttribute('data-text', oldText);
                    }, 200);
                }
            }
        };

        var toggler = togglers[i];
        toggler.addEventListener('click', showTogglerTarget);
    }
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var allTooltips = document.querySelectorAll('.tooltip');

    Array.prototype.forEach.call(allTooltips, function (tooltip) {

        var tooltipBtn = tooltip.querySelector('.tooltip__btn');
        var messageWrap = document.createElement('span');
        var message = tooltipBtn.getAttribute('data-tooltip-content');

        messageWrap.setAttribute('role', 'status');
        tooltip.appendChild(messageWrap);

        tooltipBtn.addEventListener('click', function () {
            messageWrap.innerHTML = '';
            // window.setTimeout(function() {
            messageWrap.innerHTML = '<span class="tooltip__bubble">' + message + '</span>';
            // }, 100);
        });

        document.addEventListener('click', function (e) {
            if (tooltipBtn != e.target) {
                messageWrap.innerHTML = '';
            }
        });

        tooltipBtn.addEventListener('keydown', function (e) {
            if ((e.keyCode || e.which) === 27) messageWrap.innerHTML = '';
        });
    });
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    if (document.getElementById('to-top')) {
        var visibilityToggle = function visibilityToggle() {
            if (window.pageYOffset >= 500) {
                document.getElementById('to-top').classList.add('to-top_visible');
            } else {
                document.getElementById('to-top').classList.remove('to-top_visible');
            }
        };

        var animate = function animate(_ref) {
            var timing = _ref.timing,
                draw = _ref.draw,
                duration = _ref.duration;
            var start = performance.now();
            requestAnimationFrame(function animate(time) {
                var timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;
                var progress = timing(timeFraction);
                draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        };

        document.getElementById('to-top').addEventListener('click', function (e) {
            e.preventDefault();
            var scroll = window.pageYOffset;
            var targetTop = 0;
            var scrollDiff = (scroll - targetTop) * -1;
            animate({
                duration: 600,
                timing: function timing(timeFraction) {
                    return Math.pow(timeFraction, 2); // https://learn.javascript.ru/js-animation
                },
                draw: function draw(progress) {
                    var scrollNow = scroll + progress * scrollDiff;
                    window.scrollTo(0, scrollNow);
                }
            });
        }, false);

        window.addEventListener('scroll', visibilityToggle);
        visibilityToggle();
    }
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var searchModalOpener = document.querySelector('#search-modal-opener');
    var searchModalClose = document.querySelector('.search-modal__close');
    var searchModalOverlay = document.querySelector('.search-modal__overlay');
    var searchModalOpened = false;

    function targetToggler() {

        searchModalOpened = searchModalOpened ? false : true;

        document.getElementById('search-modal').classList.toggle('search-modal_shown');
        // Класс для бади, отключающий прокрутку
        document.body.classList.toggle('menu-open');
    }

    searchModalOpener.addEventListener('click', function (e) {
        e.preventDefault();
        targetToggler();
    });

    searchModalClose.addEventListener('click', function (e) {
        e.preventDefault();
        targetToggler();
    });

    searchModalOverlay.addEventListener('click', function (e) {
        targetToggler();
    });

    // Нажатие клавиши 'Escape'
    document.addEventListener('keyup', function (e) {
        if (e.keyCode === 27 && searchModalOpened) {
            targetToggler();
        }

        searchModalOpened = false;
    });
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var objDescrLinksOn = document.querySelectorAll('.object__description-link');
    var objDescrLinksOff = document.querySelectorAll('.object__description-close');

    objDescrLinksOn.forEach(function (item) {

        item.addEventListener('click', function (e) {
            e.preventDefault();
            var parent = item.closest('.object').querySelector('.object__description').classList.add('shown');
        });
    });

    objDescrLinksOff.forEach(function (item) {

        item.addEventListener('click', function (e) {
            e.preventDefault();
            var parent = item.closest('.object__description').classList.remove('shown');
        });
    });
});
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Страница Офисы / Банкоматы Списком.
    // Обработка выбора города, тип точки
    var cityselectorAlt = document.querySelector('#cityselector-alt');
    var pointTypeSelectorAlt = document.querySelectorAll('#point-type-list input[name="point-type"]');

    var cityFilter = cityId; //тут
    var placemarkFilter = 1; // id инфоблока с офисами

    // Проверим, на всякий случай, выбранный тип точек (Офисы или Банкоматы)
    pointTypeSelectorAlt.forEach(function (item) {
        if (item.checked) {
            placemarkFilter = +item.value;
        }
    });

    var placemarkList = document.querySelectorAll('[data-placemark]');

    //console.log(placemarkList);

    function setPointList(cityId, pointType) {

        placemarkList.forEach(function (point) {
            if (point.dataset.cityid == cityId && point.dataset.placemarkType == pointType) {
                // point.style='';
                point.setAttribute('style', 'display:block');
            } else {
                // point.style.display='none';
                point.setAttribute('style', 'display:none');
            }
        });
    }

    setPointList(cityFilter, placemarkFilter);

    // Добавляем обработчики выбора города
    cityselectorAlt && cityselectorAlt.addEventListener('change', function () {
        cityFilter = +this.value;
        setPointList(cityFilter, placemarkFilter);
    });

    // Добавляем обработчики переключения типов точек
    pointTypeSelectorAlt && pointTypeSelectorAlt.forEach(function (item) {
        item.addEventListener('change', function (e) {
            placemarkFilter = +e.target.value;
            setPointList(cityFilter, placemarkFilter);
        });
    });
});
'use strict';

document.addEventListener('DOMContentLoaded', function (e) {

    var vacanciesWrap = document.querySelector('.p-vacancies__wrap');
    // let vacanciesItem = vacanciesWrap ? vacanciesWrap.querySelectorAll('.p-vacancies__item') : null;

    $('.p-vacancies__title', vacanciesWrap).click(function (e) {
        if (!$(this).parent().hasClass('is-open')) {
            $('.is-open', vacanciesWrap).removeClass('is-open').find('.p-vacancies__text').slideToggle();
            $(this).parent().addClass('is-open').find('.p-vacancies__text').slideToggle(150);
        } else {
            $(this).parent().removeClass('is-open').find('.p-vacancies__text').slideToggle(150);
        }
    });

    var cityFilter = cityId; //тут
    var vacancyList = document.querySelectorAll('[data-vacancy]');
    var cityselectorVacancies = document.querySelector('#cityselector-vacancies');

    function setVacancyList(cityId) {

        vacancyList.forEach(function (item) {
            if (+item.dataset.cityid === cityId) {
                // item.style='';
                item.setAttribute('style', 'display:block');
            } else {
                // item.style.display='none';
                item.setAttribute('style', 'display:none');
            }
        });
    }

    setVacancyList(cityFilter);

    // Добавляем обработчики выбора города
    cityselectorVacancies && cityselectorVacancies.addEventListener('change', function () {
        cityFilter = +this.value;
        setVacancyList(cityFilter);
    });
});
'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
    var formPanelOpenBtns = document.querySelectorAll('.form-panel-js');
    var formPanelCloseBtns = document.querySelectorAll('.form-panel__close');
    var formPanelOverlays = document.querySelectorAll('.form-panel__overlay');

    function toggleTarget(e) {
        e.preventDefault();

        var targetId = this.getAttribute('data-target-id');
        var targetClassToggle = this.getAttribute('data-target-class-toggle');

        if (targetId && targetClassToggle) {
            // this.classList.toggle('toggler_close');
            document.getElementById(targetId).classList.toggle(targetClassToggle);

            document.body.classList.toggle('menu-open');
        }
    }

    formPanelOpenBtns.forEach(function (btn) {
        btn.addEventListener('click', toggleTarget);
    });

    formPanelCloseBtns.forEach(function (btn) {
        btn.addEventListener('click', toggleTarget);
    });
    formPanelOverlays.forEach(function (btn) {
        btn.addEventListener('click', toggleTarget);
    });
});
'use strict';

document.addEventListener('DOMContentLoaded', function (e) {

    window.formValidationInit = function (elem) {

        if (!elem) {

            // Для всех форм страницы
            var forms = Array.from(document.querySelectorAll('form[data-check-form]'));
            forms.forEach(function (form) {
                // Подпишемся на событие отправки
                form.addEventListener('submit', function (e) {
                    var valid = true;
                    // Проверим все текстовые инпуты
                    var fieldsText = Array.from(form.querySelectorAll('input[data-check-pattern]')).concat(Array.from(form.querySelectorAll('textarea[data-check-pattern]')));

                    fieldsText.forEach(function (input) {
                        if (!checkFieldText(input)) valid = false;
                    });
                    // Проверим все чекбоксы
                    var fieldsCheckbox = Array.from(form.querySelectorAll('input[data-check-state]'));
                    fieldsCheckbox.forEach(function (input) {
                        if (!checkFieldCheckbox(input)) valid = false;
                    });
                    // Если были ошибки, не отправляем форму
                    if (!valid) e.preventDefault();
                });
            });

            // Для всех проверяемых текстовых полей
            var fieldsText = Array.from(document.querySelectorAll('input[data-check-pattern]')).concat(Array.from(document.querySelectorAll('textarea[data-check-pattern]')));

            fieldsText.forEach(function (input) {
                input.addEventListener('blur', function () {
                    checkFieldText(input);
                });
                input.addEventListener('keyup', function () {
                    checkFieldText(input);
                });
            });

            // Для всех проверяемых чекбоксов
            var fieldsCheckbox = Array.from(document.querySelectorAll('input[data-check-state]'));
            fieldsCheckbox.forEach(function (input) {
                input.addEventListener('change', function () {
                    checkFieldCheckbox(input);
                });
            });

            // Для всех проверяемых ИНН полей
            var fieldsINN = Array.from(document.querySelectorAll('input[data-check-inn]'));
            fieldsINN.forEach(function (input) {
                input.addEventListener('blur', function () {
                    checkFieldINN(input);
                });
                // input.addEventListener('keyup', function(){ checkFieldText(input); });
            });
        } else {

            // Подпишемся на событие отправки
            elem.addEventListener('submit', function (e) {
                var valid = true;
                // Проверим все текстовые инпуты
                var fieldsText = Array.from(elem.querySelectorAll('input[data-check-pattern]')).concat(Array.from(elem.querySelectorAll('textarea[data-check-pattern]')));

                fieldsText.forEach(function (input) {
                    if (!checkFieldText(input)) valid = false;
                });
                // Проверим все чекбоксы
                var fieldsCheckbox = Array.from(elem.querySelectorAll('input[data-check-state]'));
                fieldsCheckbox.forEach(function (input) {
                    if (!checkFieldCheckbox(input)) valid = false;
                });
                // Если были ошибки, не отправляем форму
                if (!valid) e.preventDefault();
            });

            var fieldsTextOfElem = Array.from(elem.querySelectorAll('input[data-check-pattern]')).concat(Array.from(elem.querySelectorAll('textarea[data-check-pattern]')));

            fieldsTextOfElem.forEach(function (input) {
                input.addEventListener('blur', function () {
                    checkFieldText(input);
                });
                input.addEventListener('keyup', function () {
                    checkFieldText(input);
                });
            });
        }

        function checkFieldText(input) {
            var regExp = new RegExp(input.dataset.checkPattern, 'gi');
            var result = regExp.test(input.value);
            var errorClass = 'field-text_error';
            // const parent = closest(input, '.field-text');
            var parent = input.closest('.field-text');
            result ? parent.classList.remove(errorClass) : parent.classList.add(errorClass);
            return result;
        }

        function checkFieldCheckbox(input) {
            var trueVal = input.dataset.checkState == 'on' ? true : false;
            var result = trueVal === input.checked;
            var errorClass = 'field-checkbox__input-wrap_error';
            // const parent = closest(input, '.field-checkbox__input-wrap');
            var parent = input.closest('.field-checkbox__input-wrap');
            result ? parent.classList.remove(errorClass) : parent.classList.add(errorClass);
            return result;
        }

        function checkFieldINN(input) {
            var result = checkINN(input.value);
            var errorClass = 'field-text_error';
            // const parent = closest(input, '.field-text');
            var parent = input.closest('.field-text');
            result ? parent.classList.remove(errorClass) : parent.classList.add(errorClass);
            return result;
        }

        function checkINN(inputNumber) {
            //преобразуем в строку
            inputNumber = String(inputNumber);
            //преобразуем в массив
            inputNumber = inputNumber.split('');
            //для ИНН в 10 знаков
            if (inputNumber.length == 10 && inputNumber[9] == (2 * inputNumber[0] + 4 * inputNumber[1] + 10 * inputNumber[2] + 3 * inputNumber[3] + 5 * inputNumber[4] + 9 * inputNumber[5] + 4 * inputNumber[6] + 6 * inputNumber[7] + 8 * inputNumber[8]) % 11 % 10) {
                return true;
                //для ИНН в 12 знаков
            } else if (inputNumber.length == 12 && inputNumber[10] == (7 * inputNumber[0] + 2 * inputNumber[1] + 4 * inputNumber[2] + 10 * inputNumber[3] + 3 * inputNumber[4] + 5 * inputNumber[5] + 9 * inputNumber[6] + 4 * inputNumber[7] + 6 * inputNumber[8] + 8 * inputNumber[9]) % 11 % 10 && inputNumber[11] == (3 * inputNumber[0] + 7 * inputNumber[1] + 2 * inputNumber[2] + 4 * inputNumber[3] + 10 * inputNumber[4] + 3 * inputNumber[5] + 5 * inputNumber[6] + 9 * inputNumber[7] + 4 * inputNumber[8] + 6 * inputNumber[9] + 8 * inputNumber[10]) % 11 % 10) {
                return true;
            } else {
                return false;
            }
        }
    };

    window.formValidationInit();
});
'use strict';

// Если на проекте jQuery
// $( document ).ready(function() {
//   // code
// });

// Изоляция без jQuery
(function () {
    'use strict';

    var mediaCheckMobile = window.matchMedia('(max-width: 767px)');
    var mediaCheckTablet = window.matchMedia('(min-width: 768px) and (max-width: 1269px)');
    var mediaCheckDesktop = window.matchMedia('(min-width: 1270px)');

    // Добавляенм поддержку NodeList.prototype.forEach()
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    /////////////////////////////////////
    // Добавляенм поддержку Object.keys() //
    /////////////////////////////////////
    if (!Object.keys) {
        Object.keys = function () {
            'use strict';

            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !{toString: null}.propertyIsEnumerable('toString'),
                dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [],
                    prop,
                    i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }();
    }


    // Добавляенм поддержку .closest()
    if (!Element.prototype.closest) {

        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;

            if (!Element.prototype.matches) {
                Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
            }

            while (node) {
                if (node.matches(css)) return node; else node = node.parentElement;
            }
            return null;
        };
    }

    // Добавляем класс ms в body для Ie11
    function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
        } else if (navigator.appName == 'Netscape') {
            var ua = navigator.userAgent;
            var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

    if (getInternetExplorerVersion() !== -1) {
        document.body.classList.add('ms');
    }

    // Tables
    var tables = document.querySelectorAll('table');
    // if (tables.length) {
    // 	console.log('all of '+ tables.length + ' the tables wrapped within the content');
    // }

    tables.forEach(function (table) {

        if (table.closest('.table')) {
            return;
        }
        var wrap = document.createElement('div');
        // wrap.classList.add('table');
        wrap.className = 'table table_common';

        wrap.innerHTML = table.outerHTML;
        table.parentNode.replaceChild(wrap, table);
    });

    // Открытие панели курса валют
    //
    var currencyLink = document.querySelector('#currency-link');
    var currencyPanel = document.querySelector('#currency-panel');

    currencyLink.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        currencyLink.classList.toggle('is-active');
        currencyPanel.classList.toggle('is-open');

        document.onclick = function (e) {
            var target = e.target.closest('.header__currencypanel');
            if (!target) {
                currencyLink.classList.remove('is-active');
                currencyPanel.classList.remove('is-open');
            }
            e.stopPropagation();
        };
    });

    // Для мобильных устройств отключаем переход по ссылкам меню верхнего уровня
    document.addEventListener('DOMContentLoaded', function () {

        var mainNavHeaderLinks = document.querySelectorAll('.main-nav_header > .main-nav__list > .main-nav__item > .main-nav__link ');

        if (document.documentElement.classList.contains('is-mobile')) {

            mainNavHeaderLinks.forEach(function (elem, index) {
                elem.addEventListener('click', function (e) {
                    e.preventDefault();
                });
            });
        }
    });

    // Активность кнопки "Расчитать/отправить заявку / отправить (в формах)"
    var agreementCheckboxes = document.querySelectorAll('.agreement-js');

    agreementCheckboxes.forEach(function (checkElement) {
        // let calcBtn = checkElement.closest('.calculator').querySelector('.calculator__get-chart a');
        var btnSubmit = document.querySelector(checkElement.dataset.target);

        // console.log(document.querySelector(checkElement.dataset.target));


        checkElement.addEventListener('change', function (e) {

            if (e.target.checked) {
                btnSubmit.classList.remove('btn_disabled');
            } else {
                btnSubmit.classList.add('btn_disabled');
            }
        });
    });
})();


(function ($) {

    // Открытие формы обратной связи
    // $('.feedback-form-js').on('click', function(event) {
    // 	event.preventDefault();
    // 	let id = this.getAttribute('data-id');
    // 	let selectCollection;

    // 	$.fancybox.open({
    // 		src  : '#'+id,
    // 		// type : 'ajax',
    // 		opts : {
    // 			modal: true,
    // 			afterLoad: function  (e, instance, slide) {

    // 				// console.log(obj);
    // 				selectCollection = new Choices('.field-select_ph .field-select__select', {
    // 					searchEnabled: false,
    // 					placeholder: true,
    // 					shouldSort: false,
    // 					placeholderValue: 'Выберите',
    // 				});

    // 				console.log(selectCollection);

    // 				// $('input[type="tel"]').mask("+7 (999) 999-99-99");
    // 			},

    // 			afterClose: function () {
    // 				console.log(selectCollection);

    // 				// selectCollection.destroy();
    // 				// selectCollection.forEach(function (item) {
    // 				// 	item.destroy();
    // 				// })
    // 			}
    // 		}
    // 	});

    // });

    // Открытие формы обратного звонка
    // $('.callback-form-js').on('click', function(event) {
    // 	event.preventDefault();
    // 	let url = this.getAttribute('data-src');

    // 	$.fancybox.open({
    // 		src  : url,
    // 		type : 'ajax',
    // 		opts : {
    // 			modal: true,
    // 			afterLoad: function  (e, instance, slide) {
    // 				$('input[type="tel"]').mask("+7 (999) 999-99-99");
    // 			}
    // 		}
    // 	});

    // });


    // jquery.maskedinput.js
    $('input[type="tel"]').mask("+7 (999) 999-99-99");
})(jQuery);

document.addEventListener('DOMContentLoaded', function () {

    var addCardWrappers = document.querySelectorAll('.add-card__wrapper');
    addCardWrappers.forEach(function (addCardWrapper) {

        var slider = addCardWrapper.querySelector('.add-card__slider-slider');
        var sliderControl = addCardWrapper.querySelector('.add-card__slider-nav');
        var maxIndex = addCardWrapper.querySelectorAll('.add-card__slider-slide').length - 1;
        var stepItems = addCardWrapper.querySelectorAll('.add-card__step-item');
        var prevBtn = void 0,
            nextBtn = void 0;

        function changeActiveItem(index) {

            var currentActiveItem = addCardWrapper.querySelector('.add-card__step-item_active');
            var nextActiveItem = stepItems[index];
            currentActiveItem.classList.remove('add-card__step-item_active');
            nextActiveItem.classList.add('add-card__step-item_active');
        };

        stepItems.forEach(function (item, index) {

            item.addEventListener('click', function () {

                changeActiveItem(index);
                $(slider).trigger('to.owl.carousel', [index]);
            });
        });

        $(slider).owlCarousel({
            items: 1,
            dots: false,
            navContainer: sliderControl,
            navClass: ['add-card__slider-btn add-card__slider-btn_prev', 'add-card__slider-btn add-card__slider-btn_next'],
            navText: ['', ''],
            animateIn: 'fadeIn',
            mouseDrag: false,
            touchDrag: false,
            loop: false,
            navRewind: false
        }).parent().css('opacity', 1);

        $(slider).on('changed.owl.carousel', function (event) {

            if (!prevBtn && !nextBtn) {
                prevBtn = addCardWrapper.querySelector('.add-card__slider-btn_prev');
                nextBtn = addCardWrapper.querySelector('.add-card__slider-btn_next');
            }

            var currentIndex = event.item.index;
            changeActiveItem(currentIndex);

            if (currentIndex == 0) {
                prevBtn.classList.add('add-card__slider-btn_disabled');
                nextBtn.classList.remove('add-card__slider-btn_disabled');
            }
            if (currentIndex > 0 && currentIndex < maxIndex) {
                prevBtn.classList.remove('add-card__slider-btn_disabled');
                nextBtn.classList.remove('add-card__slider-btn_disabled');
            }
            if (currentIndex == maxIndex) {
                nextBtn.classList.add('add-card__slider-btn_disabled');
                prevBtn.classList.remove('add-card__slider-btn_disabled');
            }
        });
    });

    var instructions = document.querySelector('.instructions');
    if (instructions) {

        var items = instructions.querySelectorAll('.instructions__item');
        var activeItem = instructions.querySelector('.instructions__item_active');
        var video = instructions.querySelector('.instructions__video iframe');

        items.forEach(function (item) {

            item.addEventListener('click', function () {

                activeItem.classList.remove('instructions__item_active');
                item.classList.add('instructions__item_active');
                activeItem = item;

                video.setAttribute('src', 'https://www.youtube.com/embed/' + item.getAttribute('data-video'));
            });
        });
    };
});