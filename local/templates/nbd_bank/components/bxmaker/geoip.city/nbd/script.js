if (window.frameCacheVars !== undefined) {
    if (!!window.frameCacheVars.AUTO_UPDATE) {
        BX.addCustomEvent("onFrameDataReceived", function (json) {
            window.BXmakerGeoIPCity.init($('.js-bxmaker__geoip__city'));
        });
    }
    else {
        BX.ready(function () {
            window.BXmakerGeoIPCity.init($('.js-bxmaker__geoip__city'), true);
        });
    }
} else {
    BX.ready(function () {
        window.BXmakerGeoIPCity.init($('.js-bxmaker__geoip__city'));
    });
}

if (!!window.BXmakerGeoIPCity === false) {

    (function () {
        /**
         * Класс для работы с комопнентом bxmaker:geoip.city, отвечает за показ, смену города
         * такой комопнент на странице должен быть 1, если больше, то остальные будут проигнорирвоаны
         * @constructor
         */
        var BXmakerGeoIPCityConstructor = function () {
            var that = this;
            that.baseParams = {};
            that.params = {};
            that.box = null;
            that.popup = null;
            that.bInit = false;
            that.yandexGeoLibLoaded = false; //  загружена ли библиотека для поиска или уточнения
        };

        /**
         * Вклчюено ли использвоание поиска адреса через яндекс
         * @returns {*}
         */
        BXmakerGeoIPCityConstructor.prototype.isUseYandexSearch = function(){
            return this.params.useYandexSearch;
        };

        /**
         * Загружана ли библиотека и проинициализирована ли
         * @returns {*}
         */
        BXmakerGeoIPCityConstructor.prototype.isYandexLibLoaded= function(){
            return this.yandexGeoLibLoaded;
        };


        /**
         * После получения данных от фонового запроса при композите, происходит подготовка блока, замена названия города на актуальный вызов событий и тп
         * @param box
         * @returns {boolean}
         */
        BXmakerGeoIPCityConstructor.prototype.init = function (box, bNeedRequest) {
            var that = this;
            var bNeedRequest = bNeedRequest || false;

            if (!box.length) return false;
            if (box.filter('.js-bxmaker__geoip__city--init').length) return false;

            that.box = box.eq(0); // здесь как раз и происходит отбор первого блока, остальные игнорируются

            that.box.addClass('js-bxmaker__geoip__city--init');
            that.popup = that.box.find('.js-bxmaker__geoip__popup').detach();
            that.rand = that.box.attr('data-rand');


            //базовые парамтеры ------
            if (!window.BxmakerGeoipCityDataBase || !window.BxmakerGeoipCityDataBase[that.rand]) {
                return false;
            }
            that.baseParams = window.BxmakerGeoipCityDataBase[that.rand];

            if (bNeedRequest) {
                // кэшируем данные
                var cache = that.storageTest() ? that.storageGet('jsParams') : {};

                if (!!cache.cookiePrefix) {
                    that.params = cache;
                    that.execute();
                }
                else {
                    $.ajax({
                        type: 'POST',
                        url: that.baseParams.ajaxUrl,
                        dataType: 'json',
                        data: {
                            method: 'getJsParams',
                            parameters: that.baseParams.parameters,
                            template: that.baseParams.template,
                            siteId: that.baseParams.siteId,
                        },
                        error: function (r) {
                            that.logError('Error connection', r);
                        },
                        success: function (r) {
                            if (!!r.response) {

                                that.params = r.response.params;

                                //в кэш
                                (that.storageTest() && that.storageSet('jsParams', that.params));

                                that.execute();

                            }
                            else if (!!r.error) {
                                that.logError('Error', r);
                            }
                        }
                    });
                }

            }
            else {
                that.params = window.BxmakerGeoipCityData[that.rand];
                that.execute();
            }

        };

        /**
         * Выполнение когда есть уже все параметры работы
         * @returns {boolean}
         */
        BXmakerGeoIPCityConstructor.prototype.execute = function () {
            var that = this;

            if (!!(that.getCityId()) == false) {
                setTimeout(function () {
                    that.execute();
                }, 400);
                return false;
            }

            // проверка включена ли отладка вручную
            if (this.cookie('debug') == 'Y') {
                that.baseParams.debug = true;
            }

            that.initEvent();
            that.bInit = true;


            $(document).trigger('bxmaker.geoip.city.inited', {});

            that.showCity();


            // уточнение включено, поиск включено
            if (that.params.useYandex && that.isUseYandexSearch()) {
                window.BXmakerGeoIPYandexGeo.init(that.params);
            }
            // уточнение вклчюено, поиск выключено
            else if (that.params.useYandex && !that.isUseYandexSearch()) {
                // местоположение уже определяелось , повторно не нужно ---
                if (that.cookie('yandex_location_defined') == 'Y' && that.cookie('yandex_location_defined_check') == '1') {
                    that.checkRedirect();
                }
                else {
                    window.BXmakerGeoIPYandexGeo.init(that.params);
                }
            }
            //уточненеи выключено, поиск включен
            else if (!that.params.useYandex && that.isUseYandexSearch()) {
                window.BXmakerGeoIPYandexGeo.init(that.params);
            }
            // и поиск и уточнение отключены
            else {
                that.checkRedirect();
            }

        };

        /**
         * Проверка, инициализирован ли компонент
         * @returns {boolean}
         */
        BXmakerGeoIPCityConstructor.prototype.isInit = function () {
            return this.bInit;
        };

        /**
         * Включение/отклчюение режима отладки
         * @param flag
         */
        BXmakerGeoIPCityConstructor.prototype.setDebug = function (flag) {
            this.params.debug = flag;
            if (flag) {
                this.cookie('debug', 'Y');
            }
            else {
                this.cookie('debug', 'N');
            }
        };


        /**
         * Лог действий при отладке
         */
        BXmakerGeoIPCityConstructor.prototype.log = function () {
            if (this.params.debug) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift('bxmaker:geoip.city: ');
                console.log.apply(console, args);
            }
        };

        /**
         * Лог ошибок при отладке
         */
        BXmakerGeoIPCityConstructor.prototype.logError = function () {
            if (this.params.debug) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift('bxmaker:geoip.city: ');
                console.error.apply(console, args);
            }
        };

        /**
         * Вернет домен, для которого устаналвиваются куки
         * @returns {*}
         */
        BXmakerGeoIPCityConstructor.prototype.getCookieDomain = function () {
            var that = this;
            return that.params.cookieDomain;
        };


        /**
         * Преобразование к числу
         * @param num
         * @returns {number}
         */
        BXmakerGeoIPCityConstructor.prototype.intval = function (num) {
            if (typeof num == 'number' || typeof num == 'string') {
                num = num.toString();
                var dotLocation = num.indexOf('.');
                if (dotLocation > 0) {
                    num = num.substr(0, dotLocation);
                }
                if (isNaN(Number(num))) {
                    num = parseInt(num);
                }
                if (isNaN(num)) {
                    return 0;
                }
                return Number(num);
            }
            else if (typeof num == 'object' && num.length != null && num.length > 0) {//Непустой массив/объект -> 1
                return 1;
            }
            else if (typeof num == 'boolean' && num === true) {//true -> 1
                return 1;
            }
            return 0;//Чуть что не так - сразу в ноль
        };

        /**
         * Получение, запись кук
         * @param name
         * @param value
         * @param params
         * @returns {any}
         */
        BXmakerGeoIPCityConstructor.prototype.cookie = function (name, value, params) {
            var that = this;
            var d = new Date();
            var name = that.params.cookiePrefix + name;
            var params = params || {};
            var parts = [];
            var currentValue, matches;


            if (value === undefined) {
                matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                currentValue = matches ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : undefined;
                that.log('cookie get: ' + name + ' = ' + currentValue);
                return currentValue;
            }
            else {
                value = encodeURIComponent(value);
                d.setTime(d.getTime() + ((!!params.expires ? params.expires : 365) * 24 * 60 * 60 * 1000));

                parts.push(name + "=" + value);// todo  parts.push(name + "=" + encodeURIComponent(value));
                parts.push("expires=" + d.toUTCString());
                parts.push("path=" + (!!params.path ? params.path : '/'));
                parts.push("domain=" + that.getCookieDomain());

                document.cookie = parts.join('; ');
                that.log('cookie: ' + parts.join('; '), parts);
            }
        };

        /**
         * Получение параметров url  страницы в формате json для удобства
         * @param hashBased
         * @returns {Array}
         */
        BXmakerGeoIPCityConstructor.prototype.getJsonFromUrl = function (hashBased) {
            var query;
            if (hashBased) {
                var pos = location.href.indexOf("?");
                if (pos == -1) return [];
                query = location.href.substr(pos + 1);
            } else {
                query = location.search.substr(1);
            }
            var result = {};
            query.split("&").forEach(function (part) {
                if (!part) return;
                part = part.split("+").join(" "); // replace every + with space, regexp-free version
                var eq = part.indexOf("=");
                var key = eq > -1 ? part.substr(0, eq) : part;
                var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
                var from = key.indexOf("[");
                if (from == -1) result[decodeURIComponent(key)] = val;
                else {
                    var to = key.indexOf("]", from);
                    var index = decodeURIComponent(key.substring(from + 1, to));
                    key = decodeURIComponent(key.substring(0, from));
                    if (!result[key]) result[key] = [];
                    if (!index) result[key].push(val);
                    else result[key][index] = val;
                }
            });
            return result;
        };

        /**
         * Инициализаци событий, для отслеживания кликов, набора текста и тп
         */
        BXmakerGeoIPCityConstructor.prototype.initEvent = function () {
            var that = this;
            var searchTimeout = false;

            // после того как местоположение было уточнено через яндекс ------------
            $(document).on('bxmaker.geoip.city.yandex.defined', function (event, params) {
                that.log('save user location defined by yandex');
                that.selectLocation(false, params);
                that.cookie('yandex_location_defined', 'Y');
                that.cookie('yandex_location_defined_check', '1');
                that.checkRedirect();
            });

            //библиотека яндекс карт для работы с геолокацией польвзователя загружена ------
            $(document).on('bxmaker.geoip.yandex.geo.loaded', function () {

                that.yandexGeoLibLoaded = true;

                //уточнение через яндекс выклчюено --
                if (!that.params.useYandex) {
                    that.cookie('yandex_location_defined_check', '0');
                    return true;
                }

                // местоположение уже определяелось , повторно не нужно ---
                if (that.cookie('yandex_location_defined') == 'Y' && that.cookie('yandex_location_defined_check') == '1') {
                    that.checkRedirect();
                    return true;
                }

                that.log('Yandex geocoder find user location');

                window.BXmakerGeoIPYandexGeo.getConnection().geolocation.get({
                    provider: 'yandex',
                    timeout: 5000,
                    autoReverseGeocode: true
                })
                    .then(function (res) {

                    that.log('Yandex geocoder success', res);

                    var boundedBy = res.geoObjects.get(0).properties.get('boundedBy');
                    var responseItem = res.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData;
                    var responseItemAddress = responseItem.Address.Components;
                    var item = {};
                    var bSkip = false;


                    item = {
                        'location': responseItem.id,
                        'city': '',
                        'city_id': responseItem.id,
                        'country': '',
                        'country_id': 0,
                        'region': '',
                        'region_id': 0,
                        'area': '',
                        'zip': '000000',
                        'range': 0,
                        'lng': 0,
                        'lat': 0,
                        'yandex': 1
                    };

                    for (var ai in responseItemAddress) {
                        switch (responseItemAddress[ai].kind) {
                            case 'locality': {
                                item['city'] = responseItemAddress[ai].name;
                                break;
                            }
                            case 'area': {
                                item['area'] = responseItemAddress[ai].name;
                                break;
                            }
                            case 'province': {
                                item['region'] = responseItemAddress[ai].name;
                                break;
                            }
                            case 'country': {
                                item['country'] = responseItemAddress[ai].name;
                                break;
                            }
                        }
                    }

                    bSkip = false;
                    for (var ci = 0; ci < that.params.yandexSearchSkipWords.length; ci++) {
                        if (that.params.yandexSearchSkipWords[ci].replace(/^\s+/, '').replace(/\s+$/).length > 0 && item['city'].indexOf(that.params.yandexSearchSkipWords[ci].replace(/^\s+/, '').replace(/\s+$/)) != -1) {
                            that.log('Skip location ' + item['city'] + ': skip word = ' + that.params.yandexSearchSkipWords[ci]);
                            bSkip = true;
                        }
                    }

                    item['lng'] = (boundedBy[1][0] - boundedBy[0][0]);
                    item['lat'] = (boundedBy[1][1] - boundedBy[0][1]);

                    if (responseItem.kind == 'locality' || (responseItem.kind == 'province' && item['city'] == item['region'])) {
                        if (!bSkip) {
                            that.log('location is defined');
                            that.log('trigger:bxmaker.geoip.city.yandex.defined', item);
                            $(document).trigger('bxmaker.geoip.city.yandex.defined', item);
                        }
                    }
                    else {
                        that.logError('location is not defined');
                    }


                }, function (e) {
                    that.logError('location is not defined');
                });
            });

            $(document).on('bxmaker.geoip.city.search.start', function () {
                that.popupShow();
            });

            $(document).on('click', '.js-bxmaker__geoip__city-name-global', function () {
                that.popupShow();
            });


            // click po knopke zakryt ocno dlya smeny goroda
            that.popup.on("click", '.js-bxmaker__geoip__popup-close', function () {
                that.log('click by close popup btn');
                that.popupHide();
            });

            //click po fonu
            that.popup.on("click", '.js-bxmaker__geoip__popup-background', function () {
                that.log('click by popup background');
                that.popupHide();
            });

            //clear input
            that.popup.on("click", '.js-bxmaker__geoip__popup-search-clean', function () {
                if ($(this).hasClass('preloader')) return false;
                that.log('Search input clean');
                that.popup.find('input[name="city"]').val('').focus();
                that.popup.find('.js-bxmaker__geoip__popup-search-options').hide();
            });

            that.popup.on("click", '.js-bxmaker__geoip__popup-option', function () {
                var item = $(this);

                that.popup.find('.js-bxmaker__geoip__popup-search-options').hide();

                if (that.isUseYandexSearch()) {
                    that.popup.find('input[name="city"]').val(item.text()).keyup();
                }
                else {
                    that.selectLocation(item.attr('data-id'));
                    that.popupHide();
                }
            });

            that.popup.on("keyup", 'input[name="city"]', function () {

                var adres = $(this).val().trim();

                if (adres.length < 2) return;
                if (!!searchTimeout) clearTimeout(searchTimeout);

                searchTimeout = setTimeout(function () {

                    that.log('Search adress:' + adres);
                    that.popup.find('.js-bxmaker__geoip__popup-search-clean').addClass('preloader');
                    that.popup.find('.js-bxmaker__geoip__popup-search-search').hide();

                    that.search(adres, function (r) {

                        that.log('count search results:' + r.response.count);

                        that.popup.find('.js-bxmaker__geoip__popup-search-clean').removeClass('preloader');

                        var searchOptions = that.popup.find('.js-bxmaker__geoip__popup-search-options');
                        searchOptions.empty();


                        if (!!r.response) {
                            if (r.response.count <= 0) {
                                searchOptions.append($('<div class="bxmaker__geoip__popup-search-option bxmaker__geoip__popup-search-option--empty" >' + that.params.messages.emptyResult + '</div>'));
                            }
                            else {
                                for (var i = 0; i < r.response.count; i++) {
                                    var item = r.response.items[i];

                                    var itemName = ('<span>' + item.city + '</span>' + (!!item.district ? ', ' + item.district : '') + (!!item.region && item.region != item.city ? ', ' + item.region : '') + (!!item.country ? ', ' + item.country : ''));
                                    var itemHtml = '<div class="bxmaker__geoip__popup-search-option js-bxmaker__geoip__popup-search-option" ';

                                    itemHtml += (' data-location="' + item.location + '" ');
                                    itemHtml += (' data-city="' + item.city + '" ');
                                    itemHtml += (' data-city_id="' + item.city_id + '" ');
                                    itemHtml += (' data-country="' + item.country + '" ');
                                    itemHtml += (' data-country_id="' + item.country_id + '" ');
                                    itemHtml += (' data-region="' + item.region + '" ');
                                    itemHtml += (' data-region_id="' + item.region_id + '" ');
                                    itemHtml += (' data-area="' + item.area + '" ');
                                    itemHtml += (' data-zip="' + item.zip + '" ');
                                    itemHtml += (' data-range="' + item.range + '" ');
                                    itemHtml += (' data-lng="' + item.lng + '" ');
                                    itemHtml += (' data-lat="' + item.lat + '" ');
                                    itemHtml += (' data-yandex="' + item.yandex + '" ');
                                    itemHtml += ' >';

                                    itemHtml += itemName;
                                    itemHtml += '</div>';

                                    searchOptions.append($(itemHtml));
                                }
                            }
                        }
                        else if (!!r.error) {
                            searchOptions.append('<div class="bxmaker__geoip__popup-search-option bxmaker__geoip__popup-search-option--empty" >' + r.error.msg + '</div>');
                        }

                        searchOptions.show();


                    }, function (r) {
                        that.logError('Error search adress:', r);

                        that.popup.find('.js-bxmaker__geoip__popup-search-clean').removeClass('preloader');
                        that.popup.find('.js-bxmaker__geoip__popup-search-search').empty().append($('<div class="bxmaker__geoip__popup-search-option bxmaker__geoip__popup-search-option--empty" >' + that.params.messages.emptyResult + '</div>'));
                    });
                }, that.params.searchTimeout);
            });

            that.popup.on("click", '.js-bxmaker__geoip__popup-search-option', function () {
                var item = $(this);

                that.popup.find('input[name="city"]').val(item.find('span').text());
                that.popup.find('.js-bxmaker__geoip__popup-search-options').hide();

                if (that.isUseYandexSearch()) {
                    // сохраняем на сервере
                    that.selectLocation(false, {
                        location: item.attr('data-location'),
                        city: item.attr('data-city'),
                        city_id: item.attr('data-city_id'),
                        region: item.attr('data-region'),
                        region_id: item.attr('data-region_id'),
                        country: item.attr('data-country'),
                        country_id: item.attr('data-country_id'),
                        area: item.attr('data-area'),
                        zip: item.attr('data-zip'),
                        range: item.attr('data-range'),
                        lng: item.attr('data-lng'),
                        lat: item.attr('data-lat'),
                        yandex: item.attr('data-yandex')
                    });
                }
                else {
                    that.selectLocation(item.attr('data-location'));
                }
                that.popupHide();
            });
        };

        /**
         * Скрытие окна с поиском города или выбором из списка избранных
         */
        BXmakerGeoIPCityConstructor.prototype.popupHide = function () {
            var that = this;
            that.log('trigger:bxmaker.geoip.popup.hide.before');
            $(document).trigger('bxmaker.geoip.popup.hide.before');

            that.log('popup hide');
            that.popup.find('.js-bxmaker__geoip__popup-background').animate({'opacity': '0'}, that.params.animateTimeout);
            that.popup.find('.js-bxmaker__geoip__popup-content').animate({'opacity': '0'}, {
                duration: that.params.animateTimeout,
                complete: function () {
                    that.popup.hide();
                    that.popup.detach();
                    that.log('trigger:bxmaker.geoip.popup.hide.after', {
                        'popup': that.popup
                    });
                    $(document).trigger('bxmaker.geoip.popup.hide.after', {
                        'popup': that.popup
                    });
                    $('.select_city_geo-context').removeClass('select_city_geo-close').addClass('js-bxmaker__geoip__city__line-name');
                }
            });
        };

        /**
         * Показ окна с выбором, поиском города
         */
        BXmakerGeoIPCityConstructor.prototype.popupShow = function () {
            var that = this;
            that.log('trigger:bxmaker.geoip.popup.show.before');
            $(document).trigger('bxmaker.geoip.popup.show.before');

            that.log('popup show');




            $('body').append(that.popup);
            that.popup.show();
            that.popup.find('.js-bxmaker__geoip__popup-background').animate({'opacity': '1'}, that.params.animateTimeout);
            that.popup.find('.js-bxmaker__geoip__popup-content').animate({'opacity': '1'}, {
                duration: that.params.animateTimeout,
                complete: function () {
                    that.log('trigger:bxmaker.geoip.popup.show.after', {
                        'popup': that.popup
                    });
                    $(document).trigger('bxmaker.geoip.popup.show.after', {
                        'popup': that.popup
                    });
                    $('.select_city_geo-context').removeClass('js-bxmaker__geoip__city__line-name').addClass('select_city_geo-close');
                }
            });
        };


        BXmakerGeoIPCityConstructor.prototype.search = function (query, success, error) {
            var that = this;

            var urlparams = that.getJsonFromUrl();

            that.log('trigger:bxmaker.geoip.search.before', {
                'query': query,
                'success': success,
                'error': error
            });
            $(document).trigger('bxmaker.geoip.search.before', {
                'query': query,
                'success': success,
                'error': error
            });

            if (that.isUseYandexSearch()) {
                that.log('search in yandex - ' + query);


                window.BXmakerGeoIPYandexGeo.getConnection().geocode(query, {
                    'kind': 'locality',
                    'results': 100,
                    'json': true
                })
                    .then(function (result) {

                        that.log('Yandex geocoder success', result);

                        var collection = result.GeoObjectCollection;
                        var items = [];

                        var responseItems = result.GeoObjectCollection.featureMember;
                        var responseItem = false;
                        var responseItemAddress = [];
                        var item = {};
                        var bSkip = false;
                        var arLngLat = [0, 0];

                        for (var i in responseItems) {
                            responseItem = responseItems[i];
                            responseItemAddress = responseItem.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;

                            if (responseItem.GeoObject.metaDataProperty.GeocoderMetaData.kind != 'locality' && responseItem.GeoObject.metaDataProperty.GeocoderMetaData.kind != 'province') continue;

                            item = {
                                'location': responseItem.GeoObject.metaDataProperty.GeocoderMetaData.id,
                                'city': responseItem.GeoObject.name,
                                'city_id': responseItem.GeoObject.metaDataProperty.GeocoderMetaData.id,
                                'country': '',
                                'country_id': 0,
                                'region': '',
                                'region_id': 0,
                                'area': '',
                                'zip': '000000',
                                'range': 0,
                                'lng': 0,
                                'lat': 0,
                                'yandex': 1
                            };

                            bSkip = false;
                            for (var ci = 0; ci < that.params.yandexSearchSkipWords.length; ci++) {
                                if (item['city'].indexOf(that.params.yandexSearchSkipWords[ci].replace(/^\s+/, '').replace(/\s+$/)) != -1) {
                                    that.log('Skip location ' + item['city'] + ': skip word = ' + that.params.yandexSearchSkipWords[ci]);
                                    bSkip = true;
                                }
                            }

                            if (bSkip) continue;

                            arLngLat = responseItem.GeoObject.Point.pos.split(' ');
                            item['lng'] = arLngLat[0];
                            item['lat'] = arLngLat[1];

                            for (var ai in responseItemAddress) {
                                switch (responseItemAddress[ai].kind) {
                                    case 'locality': {
                                        item['city'] = responseItemAddress[ai].name;
                                        break;
                                    }
                                    case 'area': {
                                        item['area'] = responseItemAddress[ai].name;
                                        break;
                                    }
                                    case 'province': {
                                        item['region'] = responseItemAddress[ai].name;
                                        break;
                                    }
                                    case 'country': {
                                        item['country'] = responseItemAddress[ai].name;
                                        break;
                                    }
                                }
                            }

                            items.push(item);
                        }

                        items.splice(10);

                        success({
                            response: {
                                items: items,
                                count: items.length
                            }
                        });

                        that.log('trigger:bxmaker.geoip.search.after', {
                            response: {
                                items: items,
                                count: items.length
                            }
                        });
                        $(document).trigger('bxmaker.geoip.search.after', {
                            response: {
                                items: items,
                                count: items.length
                            }
                        });

                    }, function (r) {
                        that.logError('Yandex geocoder error', r);

                        error(r);
                        that.log('trigger:bxmaker.geoip.search.after', {
                            'error': {
                                'code': 'error_ajax',
                                'msg': 'error response',
                                'more': r
                            }
                        });
                        $(document).trigger('bxmaker.geoip.search.after', {
                            'error': {
                                'code': 'error_ajax',
                                'msg': 'error response',
                                'more': r
                            }
                        });
                    });
            }
            else {
                that.log('search in bitrix - ' + query);

                $.ajax({
                    type: 'POST',
                    url: that.baseParams.ajaxUrl + (!!urlparams && !!urlparams.clear_cache ? '?clear_cache=' + urlparams.clear_cache : ''),
                    dataType: 'json',
                    data: {
                        method: 'search',
                        parameters: that.baseParams.parameters,
                        template: that.baseParams.template,
                        siteId: that.baseParams.siteId,
                        query: query
                    },
                    error: function (r) {
                        if (typeof error == 'function') {
                            that.logError('Error connection', r);

                            error(r);
                        }
                        that.log('trigger:bxmaker.geoip.search.after', {
                            'error': {
                                'code': 'error_ajax',
                                'msg': 'error response',
                                'more': r
                            }
                        });
                        $(document).trigger('bxmaker.geoip.search.after', {
                            'error': {
                                'code': 'error_ajax',
                                'msg': 'error response',
                                'more': r
                            }
                        });
                    },
                    success: function (r) {
                        if (!!r.response) {
                            if (typeof success == 'function') {
                                that.log('Search success', r);

                                success(r);
                            }
                        }
                        else if (!!r.error) {
                            if (typeof error == 'function') {
                                that.logError('Error', r);

                                error(r);
                            }
                        }
                        that.log('trigger:bxmaker.geoip.search.after', r);
                        $(document).trigger('bxmaker.geoip.search.after', r);
                    }
                });
            }
            return true;
        };

        /**
         * Установка в качестве текущего нового местоположения
         * @param id - идентификатор нового местоположения
         * @param params
         *
         * @event "bxmaker.geoip.select.location.before"
         * @event "bxmaker.geoip.select.location.after"
         * @returns {boolean}
         */
        BXmakerGeoIPCityConstructor.prototype.selectLocation = function (id, params) {
            var that = this;
            var params = params || {};
            var currentLocation = that.getLocation();
            var currentCity = that.getCity();
            var urlparams = that.getJsonFromUrl();

            that.log('trigger:bxmaker.geoip.select.location.before', {
                id: id,
                params: params
            });
            $(document).trigger('bxmaker.geoip.select.location.before', {
                id: id,
                params: params
            });

            that.log('select location ', id, params);

            params['parameters'] = that.baseParams.parameters;
            params['template'] = that.baseParams.template;
            params['siteId'] = that.baseParams.siteId;

            if (id) {
                params['method'] = 'selectLocation';
                params['id'] = id;
            }
            else {
                params['method'] = 'selectYandexLocation';
            }

            $.ajax({
                type: 'POST',
                url: that.baseParams.ajaxUrl + (!!urlparams && !!urlparams.clear_cache ? '?clear_cache=' + urlparams.clear_cache : ''),
                dataType: 'json',
                data: params,
                error: function (r) {
                    that.logError('error ajax select location', r);

                    that.log('trigger: bxmaker.geoip.select.location.after', {
                        'error': {
                            'code': 'error_ajax',
                            'msg': 'error response',
                            'more': r
                        }
                    });
                    $(document).trigger('bxmaker.geoip.select.location.after', {
                        'error': {
                            'code': 'error_ajax',
                            'msg': 'error response',
                            'more': r
                        }
                    });
                },
                success: function (r) {
                    if (!!r.response) {

                        that.log('success select location', r);

                        if(!that.isNeedWaitRedirect())
                        {

                            if (!!r.response.redirect) {
                                location.replace(r.response.redirect);
                                return true;
                            }

                            if (that.params.reload) {
                                that.log('need page reload');

                                //если есть форма оформления заказа
                                if (!!BX.Sale && !!BX.Sale.OrderAjaxComponent && !!BX.Sale.OrderAjaxComponent.sendRequest) {
                                    that.log('order page - send request');
                                    // BX.Sale.OrderAjaxComponent.sendRequest()
                                }
                                else if (!!BX.saleOrderAjax) {
                                    that.log('order page old - unknown action')
                                    //window.location.reload();
                                }
                                else {
                                    that.log('reload');
                                    window.location.reload();
                                    return;
                                }
                            }

                        }


                        if (!!r.response && !!r.response.city && !!r.response.location && (r.response.city != currentCity || r.response.location != currentLocation)) {
                            var params = that.getFullData();
                            params['response'] = r.response;

                            that.log('trigger: bxmaker.geoip.city.change', params);
                            $(document).trigger('bxmaker.geoip.city.change', params);
                        }

                        that.showCity();

                        that.log('trigger: bxmaker.geoip.select.location.after', {
                            'response': r.response
                        });
                        $(document).trigger('bxmaker.geoip.select.location.after', {
                            'response': r.response
                        });


                    }
                    else if (!!r.error) {

                        that.logError('error select location ', r);

                        that.log('trigger: bxmaker.geoip.select.location.after', {
                            'error': r.error
                        });

                        $(document).trigger('bxmaker.geoip.select.location.after', {
                            'error': r.error
                        });
                    }
                }
            });

            return true;
        };

        /**
         * Расставляет название города в размеченные места, вызывает осбытие
         * @event "bxmaker.geoip.city.show"
         */
        BXmakerGeoIPCityConstructor.prototype.showCity = function () {
            var that = this;

            var params = that.getFullData();

            that.log('show city', params);

            $('.js-bxmaker__geoip__city-name-global').text(params['city']);

            //событие показа текущего города, после простановки в размеченных местах
            that.log('trigger: bxmaker.geoip.city.show', params);
            $(document).trigger('bxmaker.geoip.city.show', params);
        };

        /**
         * Возврашщает массив с описание местоположения пользователя
         * @returns {mixed}
         */
        BXmakerGeoIPCityConstructor.prototype.getFullData = function () {
            var that = this;

            return {
                'location': that.getLocation(),
                'location_code': that.getLocationCode(),
                'city': that.getCity(),
                'city_id': that.getLocation(),
                'country': that.getCountry(),
                'country_id': that.getCountryId(),
                'region': that.getRegion(),
                'region_id': that.getRegionId(),
                'area': that.getArea(),
                'zip': that.getZip(),
                'range': that.getRange(),
                'lng': that.getLng(),
                'lat': that.getLat(),
                'yandex': that.getYandex()
            };
        };


        /**
         * Возвращает идентификатор местоположения
         * @returns {number}
         */
        BXmakerGeoIPCityConstructor.prototype.getLocation = function () {
            var that = this;
            return that.cookie('location') || 0;
        };

        /**
         * Возвращает код местоположения, например 000001256
         * @returns {string}
         */
        BXmakerGeoIPCityConstructor.prototype.getLocationCode = function () {
            var that = this;
            return that.cookie('location_code') || '';
        };

        BXmakerGeoIPCityConstructor.prototype.getCity = function () {
            var that = this;
            return that.cookie('city') || '';
        };

        BXmakerGeoIPCityConstructor.prototype.getCityId = function () {
            var that = this;
            return that.cookie('city_id') || 0;
        };

        BXmakerGeoIPCityConstructor.prototype.getCountry = function () {
            var that = this;
            return that.cookie('country') || false;
        };

        BXmakerGeoIPCityConstructor.prototype.getCountryId = function () {
            var that = this;
            return that.cookie('country_id') || 0;
        };

        BXmakerGeoIPCityConstructor.prototype.getRegion = function () {
            var that = this;
            return that.cookie('region') || false;
        };

        BXmakerGeoIPCityConstructor.prototype.getRegionId = function () {
            var that = this;
            return that.cookie('region_id') || 0;
        };

        BXmakerGeoIPCityConstructor.prototype.getArea = function () {
            var that = this;
            return that.cookie('area') || false;
        };

        /**
         * Возвращает индекс местоположения если он есть
         * @returns {string}
         */
        BXmakerGeoIPCityConstructor.prototype.getZip = function () {
            var that = this;
            return that.cookie('zip') || '';
        };

        BXmakerGeoIPCityConstructor.prototype.getLng = function () {
            var that = this;
            return that.cookie('lng') || 0;
        };

        BXmakerGeoIPCityConstructor.prototype.getLat = function () {
            var that = this;
            return that.cookie('lat') || 0;
        };

        BXmakerGeoIPCityConstructor.prototype.getRange = function () {
            var that = this;
            return that.cookie('range') || false;
        };

        /**
         * Возвращает флаг включен ли поиск города через яндекс
         * @returns {boolean}
         */
        BXmakerGeoIPCityConstructor.prototype.getYandex = function () {
            var that = this;
            return !!(that.cookie('yandex') || that.isUseYandexSearch());
        };

        /**
         * Нужно ли подождать подтверждения города
         * @returns {boolean}
         */
        BXmakerGeoIPCityConstructor.prototype.isNeedWaitRedirect = function () {
            var that = this;
            //если редирект должен дождаться подтверждения от пользователя,
            //то проверяем подтверждение
            if(that.params.redirectWaitConfirm && that.cookie('location_confirm') != 'Y')
            {
                return true;
            }
            return false;
        };


        /**
         * Проверка необходимости в редиректе и переадресация в случае необходимости
         */
        BXmakerGeoIPCityConstructor.prototype.checkRedirect = function () {
            var that = this;
            var urlparams = that.getJsonFromUrl();


            // если включены редиректы между доменами
            if (that.params.useDomainRedirect) {

                if(that.isNeedWaitRedirect())
                {
                    return false;
                }

                // если не проводилась прповерка необходимости редиректа
                if (that.cookie('checked_redirect') != 'Y' || that.params.locationDomain != location.hostname) {

                    $.ajax({
                        type: 'POST',
                        url: that.baseParams.ajaxUrl + (!!urlparams && !!urlparams.clear_cache ? '?clear_cache=' + urlparams.clear_cache : ''),
                        dataType: 'json',
                        data: {
                            method: 'checkNeedRedirect',
                            parameters: that.baseParams.parameters,
                            template: that.baseParams.template,
                            siteId: that.baseParams.siteId
                        },
                        error: function (r) {
                            that.logError('error ajax checked_redirect', r);
                        },
                        success: function (r) {
                            if (!!r.response) {

                                that.log('success checked_redirect', r);

                                if (!!r.response.need) {
                                    that.cookie('checked_redirect', 'Y');

                                    // распространение кук на другие домены + редирект
                                    if (!!r.response.redirect) {
                                         location.replace(r.response.redirect);
                                    }

                                }
                            }
                        }
                    });
                    return true;
                }
            }
        };


        /**
         * Проверка возможности исопльзовать локальные хранилища
         * @returns {boolean}
         */
        BXmakerGeoIPCityConstructor.prototype.storageTest = function () {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        };

        /**
         * Сохраняет данные в локальном хранилище
         * @param key
         * @param value
         * @returns {*}
         */
        BXmakerGeoIPCityConstructor.prototype.storageSet = function (key, value) {
            var that = this;
            key = that.baseParams.version + '|' + key;
            try {
                if (value === null) {
                    return window.localStorage.removeItem(key);
                }
                else {
                    return window.localStorage.setItem(key, JSON.stringify({
                        "data": value,
                        "time": (new Date()).getTime()
                    }));
                }
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    that.logError('LocalStorage limit exceeded');
                }
                else {
                    that.logError('localStorage:', e);
                }
                return false;
            }
        };

        /**
         * Возвращает данные из локального хранилища
         * @param key
         * @returns {*}
         */
        BXmakerGeoIPCityConstructor.prototype.storageGet = function (key) {
            var that = this;
            var time = (new Date()).getTime();
            key = that.baseParams.version + '|' + key;
            try {
                var obj = JSON.parse(window.localStorage.getItem(key));
                if (!!obj) {
                    if (!!obj['time'] && obj['time'] > (time - 60 * 60 * 24 * 3)) {
                        return obj['data'];
                    }
                }
                return false;
            } catch (e) {
                that.logError('localStorage:', e);
                return false;
            }
        };

        window.BXmakerGeoIPCity = new BXmakerGeoIPCityConstructor();

    })();
}


if (!!window.BXmakerGeoIPYandexGeo === false) {

    (function () {

        var GeoIPYandexGeo = function () {
            var that = this;

            that.bInit = false;
            that.ymap = false;
            that.params = {};
            that.debug = false;
            that.cb = [];
        };

        GeoIPYandexGeo.prototype.log = function () {
            if (this.debug) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift('bxmaker:geoip.city.yandex.geo: ');
                console.log.apply(console, args);
            }
        };
        GeoIPYandexGeo.prototype.logError = function () {
            if (this.debug) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift('bxmaker:geoip.city.yandex.geo: ');
                console.error.apply(console, args);
            }
        };


        GeoIPYandexGeo.prototype.init = function (params) {
            var that = this;
            var link = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=geolocation,geocode&onload=BXmakerGeoIPYandexGeo.onload&ns=';

            if (that.bInit) return true;

            //парамтеры
            that.params = params;

            // проверка включена ли отладка вручную
            if (!!window.BXmakerGeoIPCity && window.BXmakerGeoIPCity.cookie('debug') == 'Y') {
                that.debug = true;
            }

            that.bInit = true; //&ns=BXmakerGeoIPYandexMap

            if (that.params.yandexApiKey) {
                link += '&apikey=' + that.params.yandexApiKey;
            }
            else {
                that.logError('Api key for yandex map is not set');
            }

            $('head').append($('<script id="BXmakerGeoIPYandexGeo" type="text/javascript" src="' + link + '" />'));
        };

        GeoIPYandexGeo.prototype.onload = function (ym) {
            var that = this;
            that.ymap = ym;

            that.log('API is loaded');

            that.log('trigger: bxmaker.geoip.yandex.geo.loaded');
            $(document).trigger('bxmaker.geoip.yandex.geo.loaded');
        };

        GeoIPYandexGeo.prototype.getConnection = function () {
            var that = this;
            return that.ymap;
        };


        window.BXmakerGeoIPYandexGeo = new GeoIPYandexGeo();
    })();

}