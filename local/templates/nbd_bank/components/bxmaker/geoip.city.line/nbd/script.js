BX.ready(function () {
    if (!window.BXmakerGeoIPCityLineCheck) {
        window.BXmakerGeoIPCityLineCheck = true;
        $('.js-bxmaker__geoip__city__line:not(.js-bxmaker__geoip__city__line--init)').each(function () {
            new BXmakerGeoIPCityLineConstructor($(this));
        });
    }
});


if (!!window.BXmakerGeoIPCityLineConstructor === false) {

    var BXmakerGeoIPCityLineConstructor = function (box) {
        var that = this;
        that.params = {};
        that.box = box;
        that.box.addClass('js-bxmaker__geoip__city__line--init');
        that.rand = that.box.attr('data-rand');

        // проверим, есть ли данные для работы комопнента
        if (!window.BxmakerGeoipCityLineData || !window.BxmakerGeoipCityLineData[that.rand]) {
            return false;
        }
        that.params = window.BxmakerGeoipCityLineData[that.rand];


        if (!!window.BXmakerGeoIPCity && window.BXmakerGeoIPCity.isInit()) {
            that.execute();
        }
        else {
            $(document).on('bxmaker.geoip.city.inited', $.proxy(that.execute, that));
        }
    };

    /**
     * Подписка на события и проставление значений
     */
    BXmakerGeoIPCityLineConstructor.prototype.execute = function () {
        var that = this;

        // проверка включена ли отладка вручную
        if (that.cookie('debug') == 'Y') {
            that.params.debug = true;
        }

        if (that.params.debug) {
            that.log('debug is on');
        }

        that.initEvent();
    };


    BXmakerGeoIPCityLineConstructor.prototype.cookie = function () {
        return window.BXmakerGeoIPCity.cookie.apply(window.BXmakerGeoIPCity, Array.prototype.slice.call(arguments));
    };

    /**
     * Включение/отклчюение режима отладки
     * @param flag
     */
    BXmakerGeoIPCityLineConstructor.prototype.setDebug = function (flag) {
        this.params.debug = flag;
        if (flag) {
            this.cookie('debug', 'Y');
        }
        else {
            this.cookie('debug', 'N');
        }
    };

    BXmakerGeoIPCityLineConstructor.prototype.log = function () {
        var that = this;
        if (that.params.debug) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('bxmaker:geoip.city.line: ');
            console.log.apply(console, args);
        }
    };

    BXmakerGeoIPCityLineConstructor.prototype.initEvent = function () {
        var that = this;

        var bQuestionShow = false;
        var timeout = false;

        that.log('init event');

        // нужно ли показывать вопрос
        if (that.params.questionShow) {
            that.log('question tooltip is on');
            if (that.cookie('location_confirm') == 'Y') {
                that.log('question tooltip is hide');
                bQuestionShow = false;
            }
            else {
                that.log('question tooltip not hide');
                that.tooltipQuestionShow();
                bQuestionShow = true;
            }
        }
        else
        {
            //иначе сразу фискируем подтверждение города пользователем
            that.cookie('location_confirm', 'Y');
        }

        that.box
            .on("mouseenter", '.js-bxmaker__geoip__city__line-context', function () {

                if (!!timeout) clearTimeout(timeout);

                that.log('mouseenter');

                if (bQuestionShow) {
                    that.tooltipQuestionShow();
                }
                else {
                    that.tooltipInfoShow();
                }
            })
            .on("mouseleave", '.js-bxmaker__geoip__city__line-context', function () {

                if (!!timeout) clearTimeout(timeout);
                that.log('mouseleave');
                if (bQuestionShow) {
                    timeout = setTimeout($.proxy(that.tooltipQuestionHide, that), that.params.tooltipTimeout);
                }
                else {
                    timeout = setTimeout($.proxy(that.tooltipInfoHide, that), that.params.tooltipTimeout);
                }
            })
            .on("click", '.js-bxmaker__geoip__city__line-question-btn-no', function () {
                that.log('question answer no');
                that.tooltipQuestionHide();
                that.log('trigger: bxmaker.geoip.city.search.start');
                $(document).trigger('bxmaker.geoip.city.search.start');

                bQuestionShow = false;
            })
            .on("click", '.js-bxmaker__geoip__city__line-question-btn-yes', function () {
                that.log('question answer yes');
                that.tooltipQuestionHide();
                that.cookie('location_confirm', 'Y');
                window.BXmakerGeoIPCity.checkRedirect();
                bQuestionShow = false;
            })
            .on("click", '.js-bxmaker__geoip__city__line-info-btn', function () {
                that.log('info need city change');
                that.tooltipInfoHide();
                that.log('trigger: bxmaker.geoip.city.search.start');
                $(document).trigger('bxmaker.geoip.city.search.start');
            })
            .on("click", '.js-bxmaker__geoip__city__line-name', function () {
                that.log('click by city name');
                that.cookie('location_confirm', 'Y');
                that.tooltipQuestionHide();
                that.tooltipInfoHide();
                that.log('trigger: bxmaker.geoip.city.search.start');
                $(document).trigger('bxmaker.geoip.city.search.start');
            });

        $(document).on('bxmaker.geoip.city.show', function (event, data) {
            that.log('event: bxmaker.geoip.city.show');
            that.showCity(data.city);
        });

        that.showCity(window.BXmakerGeoIPCity.getCity());

    };

    BXmakerGeoIPCityLineConstructor.prototype.tooltipQuestionShow = function () {
        var that = this;
        that.log('tooltip question show');
        that.box.find('.js-bxmaker__geoip__city__line-question').stop().fadeIn(that.params.animateTimeout);
    };

    BXmakerGeoIPCityLineConstructor.prototype.tooltipQuestionHide = function () {
        var that = this;
        that.log('tooltip question hide');
        that.box.find('.js-bxmaker__geoip__city__line-question').stop().fadeOut(that.params.animateTimeout);
    };

    BXmakerGeoIPCityLineConstructor.prototype.tooltipInfoShow = function () {
        var that = this;
        if (that.params.infoShow) {
            that.log('tooltip info show');
            that.box.find('.js-bxmaker__geoip__city__line-info').stop().fadeIn(that.params.animateTimeout);
        }
    };

    BXmakerGeoIPCityLineConstructor.prototype.tooltipInfoHide = function () {
        var that = this;
        that.log('tooltip info hide');
        that.box.find('.js-bxmaker__geoip__city__line-info').stop().fadeOut(that.params.animateTimeout);
    };

    BXmakerGeoIPCityLineConstructor.prototype.showCity = function (city) {
        var that = this;
        that.log('show city');
        that.box.find('.js-bxmaker__geoip__city__line-city').text(city);


    };


}