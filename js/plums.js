if (typeof Cubix == "undefined") Cubix = {};

$(function() {

    // Probably user has Ad blocker, so we just need to remove all empty
    // blocks for advertisements
    /*if (typeof zonesJsonBuffer == "undefined") {
        $('.ixs-govazd-item').remove();
        return;
    }*/

    /* Cubix.bannerPosition = 0;
     Cubix.mainBanners = Object.assign({}, zonesJsonBuffer.x323139);*/
    Cubix.initBanners();
    // Cubix.initProfileBanners();
});

//Cubix.BANNERS_HOST= 'https://adzz.io/';
Cubix.BANNERS_HOST = 'https://www.escortdirectory.com/'; // Just because in local I dont had them :))

Cubix.Banners = {
    API_URL: '/fetch-govazds',
    items: [],

    construct: function() {

    },

    fetch: function(page, country, city, bannersCount = 15, region) {
        var _self = this;

        return new Promise(function(res, rej) {
            $.ajax({
                url: _self.API_URL,
                type: "GET",
                data: {
                    page: page,
                    country: country,
                    city: city,
                    bannersCount: bannersCount,
                    region: region
                },
                dataType: 'json',
                success: function(resp) {
                    _self.items = resp.items;
                    res();
                }
            });
        })
    },

    render: function() {

        for (var key in this.items) {

            var item = this.items[key];

            var is_follow = 'nofollow';
            if (item.is_follow === 1) {
                is_follow = 'dofollow'
            }

            var aElement = $('<a />', {
                'rel': is_follow,
                'class': '',
                'target': '_blank',
                'href': 'https://ixspublic.com/hits.php?adv=' + item.user_id + '&cmp=' + item.cmp_id + '&z=' + item.id + '&b=' + item.banner_id + '&go=' + encodeURIComponent(item.link),
                'goto': item.link
            });

            aElement.click(function() {
                xhttp.open("GET", this.getAttribute('goto'), true);
                xhttp.send();
            });

            // if(item.cmp_id == 1415) {
            //     aElement.removeAttr('rel');
            // }

            // if(item.banner_id == 4421){
            //     aElement.attr('rel','follow');
            // }
            // if(item.banner_id == 4967){
            //     aElement.attr('rel','dofollow');
            // }


            // if( item.banner_id == 5206 || item.banner_id == 5207 || item.banner_id == 5430 || item.banner_id == 1999 ){
            //     aElement.attr('rel','dofollow');
            // }

            // if(item.banner_id == 4066){
            //     aElement.attr('alt','PalaceVIP');
            // }

            var aImg = $('<img />', {
                'alt': item.title,
                'data-govazd-id': item.banner_id,
                'title': item.title,
                'data-src': Cubix.BANNERS_HOST + 'images/ixsGovazd/' + item.filename
            }).appendTo(aElement).lazy();

            var smallImg = $('<img />', {
                'width': 1,
                'height': 1,
                'class': "ixs-banners",
                'lsrc': 'https://www.ixspublic.com/views.php?adv=' + item.user_id + '&cmp=' + item.cmp_id + '&z=' + item.ixs_id + '&b=' + item.banner_id,
                'src': 'https://www.ixspublic.com/views.php?adv=' + item.user_id + '&cmp=' + item.cmp_id + '&z=' + item.ixs_id + '&b=' + item.banner_id
            }).appendTo(aElement).lazy();

            if (item.banner_id == 4066) {
                aImg.attr('alt', 'PalaceVIP');
            }

            $('.ixs-govazd-item.empty')
                .first().append(aElement)
                .removeClass('empty');
        };
    },

    load: function(page, country, city, bannersCount = 15, region) {
        if ($('.ixs-govazd-item.empty').length === 0) return;

        this.fetch(page, country, city, bannersCount, region).then(function() {
            this.render();
        }.bind(this));
    }
};

Cubix.initProfileBanners = function() {

    if (!$('countrik')) {
        return true;
    }

    var cntryId = $('countrik').getAttribute('value'),
        cityId = $('city_ban').getAttribute('value');


    var listingBanners = new Object();
    var limit = 6;
    var forceFirstIter = 0;
    var phonesexslut = null;


    var isItalyFirstPage = (cntryId === '33') ? true : false;
    var isCanadaFirstPage = (cntryId === '10') ? true : false;
    var isNetherlandFirstPage = (cntryId === '27') ? true : false;
    var isUsaFirstPage = (cntryId === '68') ? true : false;
    var isThailandFirstPage = (cntryId === '63') ? true : false;
    var isSwissFirstPage = (cntryId === '62') ? true : false;
    var isFranceFirstPage = (cntryId === '23') ? true : false;
    var isUnitedkingdomFirstPage = (cntryId === '67') ? true : false;
    var isMemphisFirstPage = (cityId === '411') ? true : false;
    var isFrankfurtFirstPage = (cityId === '197') ? true : false;

    Object.each(zonesJsonBuffer.x323230, function(value, key) {

        if (
            (isCanadaFirstPage && (value.cmp_id == 1076 || value.cmp_id == 1097 || value.cmp_id == 1156 || value.cmp_id == 1175 || value.cmp_id == 1181)) ||
            (isUsaFirstPage && (value.cmp_id == 1090 || value.cmp_id == 1091 || value.cmp_id == 1096 || value.cmp_id == 1107 || value.cmp_id == 1103 || value.cmp_id == 1166)) ||
            (isItalyFirstPage && (value.cmp_id == 1093 || value.cmp_id == 1092 || value.cmp_id == 1099 || value.cmp_id == 1131)) ||
            (isNetherlandFirstPage && (value.cmp_id == 1079 || value.cmp_id == 1110 || value.cmp_id == 1160 || value.cmp_id == 1196)) ||
            (isThailandFirstPage && value.cmp_id == 1098) ||
            (isSwissFirstPage && (value.cmp_id == 1106 || value.cmp_id == 1219)) ||
            (isUnitedkingdomFirstPage && (value.cmp_id == 1147)) ||
            (isFranceFirstPage && value.cmp_id == 1104) ||
            (value.cmp_id == 1222) || (isMemphisFirstPage && value.cmp_id == 1225) || (isFrankfurtFirstPage && value.cmp_id == 1235) || (value.cmp_id == 1231)
        ) {

            listingBanners[forceFirstIter] = value;

            forceFirstIter++;

            delete zonesJsonBuffer.x323230[key];
        }
    });

    if (isUsaFirstPage && phonesexslut) {
        listingBanners[forceFirstIter] = phonesexslut;
        forceFirstIter++;
    }
    Object.each(zonesJsonBuffer.x323230, function(value, key) {
        listingBanners[forceFirstIter] = value;
        forceFirstIter++;
    });

    // Object.each(zonesJsonBuffer.x36, function(value, key){
    //     listingBanners[forceFirstIter] = value;
    //     forceFirstIter++;
    // });
    // console.log( listingBanners);
    var target = ["_blank", "_self", "_new", "_parent"];
    var size = [];

    if ($('adv-space')) {

        $$('#adv-space').each(function(e) {

            for (i = 0; i < limit; i++) {


                var aElement = new Element('a', {
                    'rel': 'nofollow',
                    'class': 'ixsHitBtn',
                    'target': target[listingBanners[i].target],
                    'goto': Cubix.BANNERS_HOST + 'hits.php?adv=' + listingBanners[i].user_id + '&cmp=' + listingBanners[i].cmp_id + '&z=' + listingBanners[i].id + '&b=' + listingBanners[i].banner_id + '&go=' + encodeURIComponent(listingBanners[i].link),
                    'href': listingBanners[i].link
                });


                //size = listingBanners[pos].size.split("x");
                new Element('img', {
                    'alt': listingBanners[i].title,
                    'title': listingBanners[i].title,
                    'width': 360, //size[0]
                    'height': 200, // size[1]
                    'src': Cubix.BANNERS_HOST + '/images/ixsGovazd/' + listingBanners[i].filename
                }).inject(aElement);

                new Element('img', {
                    'class': 'style',
                    'width': 1,
                    'height': 1,
                    'src': Cubix.BANNERS_HOST + 'views.php?adv=' + listingBanners[i].user_id + '&cmp=' + listingBanners[i].cmp_id + '&z=' + listingBanners[i].id + '&b=' + listingBanners[i].banner_id
                }).inject(aElement);

                aElement.inject(e);


            }
        });


    }
}

Cubix.initBanners = function(countryId, cityId, regionId) {

    var page = $('#pager-input').val() || 1;
    var countryData = $('#current-page-country');
    var cityData = $('#current-page-city');
    var bannersCount = $('.ixs-govazd-item.empty').length;
    var regionData = $('#current-page-region');
    if (!countryId && !cityId) {
        if (countryData.data('id')) {
            countryId = countryData.data('id');
        } else {
            countryId = $('#user_country_id').data('id');
        }
        if (cityData) {
            cityId = cityData.data('id');
        }
        if (regionData) {
            regionId = regionData.data('id');
        }
    }
    return Cubix.Banners.load(page, countryId, cityId, bannersCount, regionId);

    if (typeof zonesJsonBuffer == 'undefined') return;

    if (!$('body').hasClass('index')) {
        return console.warn('Banners deactivated');
    }

    var path = window.location.search;
    var countryId = $('#country_id').val();
    if (countryId) {
        countryId = countryId.match(/\d/g);
        countryId = countryId.join("");
    }
    var cityId = $('#city_id').val();
    if (cityId) {
        cityId = cityId.match(/\d/g);
        cityId = cityId.join("");
    }

    if ($('#region_id').val()) {
        var stateId = $('#region_id').val();
    }

    var listingBanners = {};
    var limit = 3;
    var $_GET = Sceon.parseQueryString();
    var forceFirstIter = 0;
    var phonesexslut = null;
    var isFirstPage = $_GET['page'] == undefined || $_GET['page'] == 1;

    // Sorry fast solution xD
    // -------------------
    var spainCities = ['226', '227', '228', '229', '230', '231', '232', '427', '569', '1002', '1019', '1062', '1205', '1252', '1429', '1585', '1763', '1778', '1903', '2086', '2087', '2096', '2115', '2147', '2148', '2150', '2151'];
    var unitedKingdomCities = ['54', '56', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '287', '288', '336', '337', '338', '344', '353', '356', '357', '358', '359', '360', '361', '374', '375', '376', '377', '378', '379', '380', '381', '382', '383', '384', '416', '417', '418', '446', '452', '459', '463', '465', '466', '477', '478', '482', '484', '485', '486', '489', '495', '497', '498', '499', '500', '501', '505', '507', '508', '509', '510', '511', '512', '513', '520', '523', '544', '547', '556', '561', '563', '577', '580', '585', '608', '638', '639', '647', '655', '677', '702', '703', '717', '718', '725', '729', '737', '738', '744', '751', '766', '780', '800', '822', '827', '830', '833', '834', '837', '840', '852', '866', '876', '902', '904', '909', '946', '983', '1050', '1074', '1238', '1438', '1621', '1622', '1672', '1700', '1787', '1793', '1987', '2116', '2140', '2159', '2160', '2161', '2162', '2165', '2166', '2167', '2168', '2169', '2170', '2171', '2172']
    var swissCities = ['236', '237', '238', '239', '241', '918', '996', '1053', '1054', '1055', '1184', '1231', '1245', '1427', '1503', '1513', '1619', '1733', '1735', '1764', '1797', '1805', '1811', '1824', '1826', '1827', '1828', '1829', '1914', '1915', '1916', '1917', '1918', '1919', '1920', '2076', '2128', '2142', '2143', '2144', '2145'];
    var isPraguePage = (cityId === '177' && isFirstPage) ? true : false;
    // -------------------

    var isItalyFirstPage = (countryId === '33' && isFirstPage) ? true : false;
    var isUnitedkingdomFirstPage = ((countryId === '67' || unitedKingdomCities.includes(cityId)) && isFirstPage) ? true : false;
    var isCanadaFirstPage = (countryId === '10' && isFirstPage) ? true : false;
    var isNetherlandFirstPage = (countryId === '27' && isFirstPage) ? true : false;
    var isUsaFirstPage = (countryId === '68' && isFirstPage) ? true : false;
    var isThailandFirstPage = (countryId === '63' && isFirstPage) ? true : false;
    var isSwissFirstPage = ((countryId === '62' || swissCities.includes(cityId)) && isFirstPage) ? true : false;
    var isFranceFirstPage = (countryId === '23' && isFirstPage) ? true : false;
    var isMemphisFirstPage = (cityId === '411' && isFirstPage) ? true : false;
    var isFrankfurtFirstPage = (cityId === '197' && isFirstPage) ? true : false;
    var isUaeFirstPage = (countryId === '66' && isFirstPage) ? true : false;
    var isLondonFirstPage = (cityId === '54' && isFirstPage) ? true : false;
    var islasVegasFirstPage = (cityId === '86' && isFirstPage) ? true : false;
    var isNewYorkFirstPage = (cityId === '325' && isFirstPage) ? true : false;
    var isHomePage = (window.location.pathname == '/' && isFirstPage) ? true : false;
    var isNewYorkStateFirstPage = (stateId === '18' && isFirstPage) ? true : false;
    var isFloridaStateFirstPage = (stateId === '13' && isFirstPage) ? true : false;
    var isCaliforniaStateFirstPage = (stateId === '9' && isFirstPage) ? true : false;
    var isViennaFirstPage = (cityId === '586' && isFirstPage) ? true : false;
    var isMalasiaFirstPage = (countryId === '40' && isFirstPage) ? true : false;
    var isDubaiFirstPage = (cityId === '145' && isFirstPage) ? true : false;
    var isAmsterdamFirstPage = (cityId === '131' && isFirstPage) ? true : false;
    var isSpanFirstPage = ((countryId === '60' || spainCities.includes(cityId)) && isFirstPage) ? true : false;

    for (var key in zonesJsonBuffer.x323139) {
        var value = zonesJsonBuffer.x323139[key];

        if ((isPraguePage && value.banner_id == 4139) ||
            (isSpanFirstPage && (value.banner_id == 4137 || value.banner_id == 4136)) ||
            (isCanadaFirstPage && (value.cmp_id == 1076 || value.cmp_id == 1097 || value.cmp_id == 1156 || value.cmp_id == 1175 || value.cmp_id == 1181 || value.cmp_id == 1242)) ||
            (islasVegasFirstPage && (value.cmp_id == 1300 || value.cmp_id == 1301)) ||
            (isUsaFirstPage && (value.cmp_id == 1090 || value.cmp_id == 1091 || value.cmp_id == 1096 || value.cmp_id == 1107 || value.cmp_id == 1103 || value.cmp_id == 1166 || value.cmp_id == 1258 || value.cmp_id == 1262 || value.cmp_id == 1307)) ||
            (isItalyFirstPage && (value.cmp_id == 1093 || value.cmp_id == 1092 || valuef.cmp_id == 1099 || value.cmp_id == 1131)) ||
            (isNetherlandFirstPage && (value.cmp_id == 1079 || value.cmp_id == 1110 || value.cmp_id == 1160 || value.cmp_id == 1196 || value.cmp_id == 1197 || value.cmp_id == 1198 || value.cmp_id == 1334 || value.cmp_id == 1199 || value.cmp_id == 1200)) ||
            (isThailandFirstPage && value.cmp_id == 1098) ||
            (isSwissFirstPage && (value.cmp_id == 1106 || value.cmp_id == 1219 || value.banner_id == 4138)) ||
            (isUnitedkingdomFirstPage && (value.cmp_id == 1147 || value.cmp_id == 1241 || value.banner_id == 4135)) ||
            (isFranceFirstPage && value.cmp_id == 1104) ||
            (isMemphisFirstPage && (value.cmp_id == 1225 || value.cmp_id == 1296)) ||
            (isFrankfurtFirstPage && value.cmp_id == 1235) ||
            (isUaeFirstPage && value.cmp_id == 1262) ||
            (isMalasiaFirstPage && (value.cmp_id == 1357 || value.cmp_id == 1358 || value.cmp_id == 1359)) ||
            (isUnitedkingdomFirstPage && value.cmp_id == 1284) ||
            (isLondonFirstPage && value.cmp_id == 1284) || ((isFloridaStateFirstPage || isCaliforniaStateFirstPage || isNewYorkStateFirstPage) && value.cmp_id == 1307) || (isViennaFirstPage && value.cmp_id == 1332) || (isDubaiFirstPage && value.cmp_id == 1349) ||
            (isViennaFirstPage && value.cmp_id == 1365) ||
            (isAmsterdamFirstPage && value.cmp_id == 1372)
        ) {
            if (isUsaFirstPage && value.cmp_id == 1103) {
                phonesexslut = value;
            } else {
                listingBanners[forceFirstIter] = value;
                Cubix.bannerPosition = 0;
                forceFirstIter++;
            }
            delete Cubix.mainBanners[key];
        }
    };

    if (isUsaFirstPage && phonesexslut) {
        listingBanners[forceFirstIter] = phonesexslut;
        forceFirstIter++;
    }

    for (var key in Cubix.mainBanners) {
        var value = Cubix.mainBanners[key];

        listingBanners[forceFirstIter] = value;
        if (!isHomePage && value.cmp_id == 1027) {
            delete listingBanners[forceFirstIter];
        } else {
            forceFirstIter++;
        }
    }

    for (var key in zonesJsonBuffer.x36) {
        var value = zonesJsonBuffer.x36[key];

        listingBanners[forceFirstIter] = value;
        forceFirstIter++;
    };

    var target = ["_blank", "_self", "_new", "_parent"];
    var size = [];

    if ($('.escort-item.ixs-govazd-item.empty').length) {

        var pos = Cubix.bannerPosition;
        var count = Object.values(listingBanners).length;

        $('.escort-item.ixs-govazd-item.empty').each(function(e, iter) {

            // for (i = 0; i < limit; i++) {

            if (listingBanners[pos].cmp_id == 1027) {

                var aElement = $('<a />', {
                    'class': 'ixsHitBtn',
                    'target': target[listingBanners[pos].target],
                    'goto': Cubix.BANNERS_HOST + 'hits.php?adv=' + listingBanners[pos].user_id + '&cmp=' + listingBanners[pos].cmp_id + '&z=' + listingBanners[pos].id + '&b=' + listingBanners[pos].banner_id + '&go=' + encodeURIComponent(listingBanners[pos].link),
                    'href': listingBanners[pos].link
                });


            } else {
                var aElement = $('<a />', {
                    'rel': 'nofollow',
                    'class': 'ixsHitBtn',
                    'target': target[listingBanners[pos].target],
                    'goto': Cubix.BANNERS_HOST + 'hits.php?adv=' + listingBanners[pos].user_id + '&cmp=' + listingBanners[pos].cmp_id + '&z=' + listingBanners[pos].id + '&b=' + listingBanners[pos].banner_id + '&go=' + encodeURIComponent(listingBanners[pos].link),
                    'href': listingBanners[pos].link
                });
            }
            // }
            //size = listingBanners[pos].size.split("x");
            $('<img />', {
                'alt': listingBanners[pos].title,
                'title': listingBanners[pos].title,
                //'width': 265, //size[0]
                //'height' : 150, // size[1]
                'src': Cubix.BANNERS_HOST + '/images/ixsGovazd/' + listingBanners[pos].filename
            }).appendTo(aElement);

            // $('<img />', {
            //     'class' : 'style',
            //     'width': 1,
            //     'height': 1,
            //     'src' : Cubix.BANNERS_HOST + 'views.php?adv='+ listingBanners[pos].user_id + '&cmp='+ listingBanners[pos].cmp_id + '&z=' + listingBanners[pos].id +'&b='+ listingBanners[pos].banner_id
            // }).appendTo(aElement);

            aElement.appendTo($(this));
            $(this).removeClass('empty');


            if (pos == (count - 1)) {
                pos = 0;
            } else {
                pos++;
            }

            // }
        });

        Cubix.bannerPosition = pos;
    }
}
// $('div .total-results > h1').first().text()
$('document').ready(() => {
    /*const textForHead = $('div .total-results > h1').first().text();
    const total = $('input[name=near_by_count]').val();*/
    /*$('.sort-listing-dropdown').on('click',(e)=>{
        e.preventDefault();
        var cvalue = $( e.target ).find('input').attr('value');
        if ( cvalue != 'close-to-me' )
        {
            if ( $('#city_id').length === 0 ) {
                $( 'div .total-results > h1' ).text( 'Escorts Worldwide' );
            }else{
                $( 'div .total-results > h1' ).text( textForHead );
            }
        }else{
            $('div .total-results > h1').text(total);
        }
    });*/

    var container = $('.content-section');

    $('.dropdown-toggle').on('click', function() {
        var ariaExpand = $(this).attr('aria-expanded');
        setTimeout(function() {
            if (ariaExpand === 'false' || ariaExpand === 'undefined') {
                container.addClass('freez');
            } else {
                container.removeClass('freez');
            }
        }, 10);
    });

    $('.text-form').on('click', function() {
        setTimeout(function() {
            Sceon.disableScroll();
        }, 10);
    });

    /*$('body').bind("keypress", function(e){
        console.log(e.which);
    });*/

    //detecting Keyboard is Open
    function onKeyboardOnOff(isOpen) {
        // Write down your handling code
        if (isOpen) {
            // keyboard is open

        } else {
            // keyboard is closed
            setTimeout(function() {
                Sceon.enableScroll();
            }, 10);
        }
    }

    var originalPotion = false;
    $(document).ready(function() {
        if (originalPotion === false) originalPotion = $(window).width() + $(window).height();
    });

    /**
     * Determine the mobile operating system.
     * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
     *
     * @returns {String}
     */
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "winphone";
        }

        if (/android/i.test(userAgent)) {
            return "android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "ios";
        }

        return "";
    }

    function applyAfterResize() {

        if (getMobileOperatingSystem() != 'ios') {
            if (originalPotion !== false) {
                var wasWithKeyboard = $('body').hasClass('view-withKeyboard');
                var nowWithKeyboard = false;

                var diff = Math.abs(originalPotion - ($(window).width() + $(window).height()));
                if (diff > 100) nowWithKeyboard = true;

                $('body').toggleClass('view-withKeyboard', nowWithKeyboard);
                if (wasWithKeyboard != nowWithKeyboard) {
                    onKeyboardOnOff(nowWithKeyboard);
                }
            }
        }
    }

    $(document).on('focus blur', 'select, textarea, input[type=text], input[type=date], input[type=password], input[type=email], input[type=number]', function(e) {
        var $obj = $(this);
        var nowWithKeyboard = (e.type == 'focusin');
        $('body').toggleClass('view-withKeyboard', nowWithKeyboard);
        onKeyboardOnOff(nowWithKeyboard);
    });

    $(window).on('resize orientationchange', function() {
        applyAfterResize();
    });

    //detecting Keyboard is Open

    $(document).mouseup(function(e) {
        var targetContainer = $('.dropdown-toggle');
        var targetContainerLi = $('label.checkbox');

        // if the target of the click isn't the container nor a descendant of the container
        if (!targetContainer.is(e.target)) {
            if (!targetContainerLi.is(e.target)) {
                container.removeClass('freez');
            } else {
                return;
            }
            container.removeClass('freez');
        }
    });

    $.each($('button.dropdown-toggle'), function() {
        if (!$(this).attr('aria-expanded')) {
            $(this).attr('aria-expanded', 'false');
        }
    });

    $.each($('.drop-cropable'), function() {
        $(this).next().children('ul').addClass('cropped-ios');
    });

    var collapsed = $(".collapsed-custom");
    collapsed.click(function(e) {
        var txt = collapsed.hasClass('collapsed') ? 'Read Less' : 'Read More';
        collapsed.text(txt);
    })

});