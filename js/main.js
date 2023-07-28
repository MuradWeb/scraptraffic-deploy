/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modules/accordion/accordion.js":
/*!***************************************************!*\
  !*** ./src/blocks/modules/accordion/accordion.js ***!
  \***************************************************/
/***/ (() => {

$(function () {
  var $accordionHead = $('.js-accordion-head');
  if (!$accordionHead.length) return;
  $accordionHead.on("click", function () {
    var that = $(this);
    var nextEl = that.next();
    var nextHeight = nextEl[0].scrollHeight;
    that.toggleClass("accordion__head_active");
    if (that.hasClass("accordion__head_active")) {
      return nextEl.css({
        "max-height": nextHeight,
        overflow: "visible",
        opacity: 1,
        "margin-top": 20
      });
    }
    nextEl.css({
      "max-height": 0,
      overflow: "hidden",
      opacity: 0,
      "margin-top": 0
    }).removeClass("accordion__content_open");
  });
});

/***/ }),

/***/ "./src/blocks/modules/card-org/card-org.js":
/*!*************************************************!*\
  !*** ./src/blocks/modules/card-org/card-org.js ***!
  \*************************************************/
/***/ (() => {

$(function () {
  var $body = $('body');
  var $priceList = $('.js-price-list');
  var $priceLinks = $('.js-card-org-links');
  var matchMedia = window.matchMedia('(max-width: 768px)');
  $priceLinks.on('init:links', function (e) {
    var target = $(e.target);
    var listMore = target.find('.js-links-more');
    var listLinks = target.find('.card-org__link');
    var limitIndex = null;
    var x = Array.from(listLinks).reduce(function (acc, tab, idx) {
      var width = acc + +$(tab).outerWidth();
      if (target.width() - 14 < width && !limitIndex) limitIndex = idx;else if (target.width() - 14 >= width) limitIndex = null;
      return width;
    }, 0);
    if (limitIndex) {
      listLinks.show();
      listLinks.eq(matchMedia.matches ? limitIndex + 1 : limitIndex - 1).nextAll().not(listMore).hide();
      listMore.removeAttr('hidden');
      var handler = function handler() {
        listLinks.removeAttr('style');
        listMore.off('click', handler);
        return listMore.remove();
      };
      listMore.on('click', handler);
    } else {
      listLinks.removeClass('card-org__link_hide');
      listMore.remove();
    }
  });
  $priceLinks.trigger('init:links');
  $priceList.on('init:list', function (e) {
    var target = $(e.target);
    var list = target.find('.card-org__list');
    var listLink = target.find('.card-org__list-link');
    var listChildren = list.children();
    if (listChildren.length > 3) {
      listLink.removeAttr('hidden');
      var handler = function handler() {
        listChildren.css('display', 'flex');
        listLink.off('click', handler);
        return listLink.remove();
      };
      listLink.on('click', handler);
    }
  });
  $priceList.trigger('init:list');
  $body.on('click', '.js-map-show', function (e) {
    var target = $(e.currentTarget);
    var map = target.parents('.card-org').find('.js-card-org-map').fadeToggle().toggleClass('active');
    if (map.hasClass('active')) {
      map[0].scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
  $body.on('click', '.js-card-org-share', function (e) {
    var target = $(e.currentTarget);
    navigator.clipboard.writeText(target[0].dataset.link);
    target.attr('data-tooltip', 'Скопировано');
    setTimeout(function () {
      target.attr('data-tooltip', 'Скопировать ссылку');
    }, 3000);
  });
});

/***/ }),

/***/ "./src/blocks/modules/cards/cards.js":
/*!*******************************************!*\
  !*** ./src/blocks/modules/cards/cards.js ***!
  \*******************************************/
/***/ (() => {

$(function () {
  var $cardsTab = $('.js-cards-tab');
  var $cardsList = $('.js-cards-list');
  $cardsTab.on('click', 'button.cards__tab-btn', function (e) {
    var $that = $(e.target);
    var filter = $that.data('filter');
    $that.addClass('cards__tab-btn_active').siblings().removeClass('cards__tab-btn_active');
    var $cards = $cardsList.find(".cards__card");
    if (filter === 'all') return $cards.css('display', 'block');
    $cards.not("[data-filter=\"".concat(filter, "\"]")).css('display', 'none');
    $cards.filter("[data-filter=\"".concat(filter, "\"]")).css('display', 'block');
  });
});

/***/ }),

/***/ "./src/blocks/modules/content-table/content-table.js":
/*!***********************************************************!*\
  !*** ./src/blocks/modules/content-table/content-table.js ***!
  \***********************************************************/
/***/ (() => {

$(function () {
  var $tableTab = $('.js-content-table-tab');
  var $tableList = $('.js-content-table-list');
  var matchMedia = window.matchMedia('(max-width: 768px)');
  if ($tableTab.length) {
    var initTabs = function initTabs() {
      if (matchMedia.matches) return;
      $tableTab.each(function (_, el) {
        var $tab = $(el);
        var isLimitTruth = tabLimitView($tab);
        toggleTab($tab, isLimitTruth);
      });
    };
    var toggleTab = function toggleTab($tab, isLimitTruth) {
      var $buttonMore = $tab.find('.js-content-table-tab-more');
      var callBack = function callBack(e) {
        var target = $(e.currentTarget);
        var isShow = target[0].dataset.show;
        var hiddenChild = $tab.children('[data-hidden]');
        if (isShow) {
          target.html('...').attr({
            'data-text': '...',
            'data-show': null
          });
          hiddenChild.addClass('content-table__tab-link_hide');
          $tab.removeAttr('style');
          return;
        }
        target.html('&#10005;').attr({
          'data-text': '&#10005;',
          'data-show': true
        });
        $tab.css('height', 'auto');
        hiddenChild.removeClass('content-table__tab-link_hide');
      };
      if (isLimitTruth) {
        $buttonMore.on('click', callBack);
      } else {
        $buttonMore.off('click', callBack);
      }
    };
    var tabLimitView = function tabLimitView($tab) {
      var widthContainer = $tab.width();
      var limitIndex = null;
      var x = Array.from($tab.children()).reduce(function (acc, tab, idx) {
        var width = acc + +$(tab).outerWidth();
        if (widthContainer - 14 < width && !limitIndex) limitIndex = idx;else if (widthContainer - 14 >= width) limitIndex = null;
        return width;
      }, 0);
      if (limitIndex) {
        $tab.children().eq(limitIndex - 1).nextAll(':not(".js-content-table-tab-more")').addClass('content-table__tab-link_hide').attr('data-hidden', 'true');
        $tab.find('.js-content-table-tab-more').addClass('content-table__tab-link_show');
        return true;
      } else {
        $tab.children(':not(".js-content-table-tab-more")').removeClass('content-table__tab-link_hide').removeAttr('data-hidden');
        $tab.find('.js-content-table-tab-more').removeClass('content-table__tab-link_show');
        return false;
      }
    };
    var cn = 'content-table__tab-link_active';
    var listCn = 'content-table__list_active';
    $tableTab.on('click', 'button[data-type]', function () {
      var $that = $(this);
      var _$that$data = $that.data(),
        type = _$that$data.type;
      $that.addClass(cn).siblings('button[data-type]').removeClass(cn);
      var $block = $that.parent().next('.js-content-table-block');
      $block.children().removeClass(listCn);
      $block.find("[data-type=\"".concat(type, "\"]")).addClass(listCn);
    });
    initTabs();
  }
  if ($tableList.length) {
    var initTableList = function initTableList($list) {
      var limit = $list.data('limit');
      var children = $list.children(':not(".js-list-show-more")');
      var moreBtn = $list.find('.js-list-show-more');
      console.log(children, limit);
      var callBack = function callBack() {
        children.addClass('is-show-all').removeAttr('hidden');
        moreBtn.remove();
      };
      if (children.length > +limit) {
        children.eq(limit - 2).nextAll().attr('hidden', 'hidden');
        moreBtn.css('display', 'block').on('click', callBack);
      } else {
        children.removeAttr('hidden').addClass('is-show-all');
        moreBtn.css('display', 'none').off('click', callBack);
      }
    };
    $tableList.each(function (_, el) {
      var $list = $(el);
      initTableList($list);
    });
  }
});

/***/ }),

/***/ "./src/blocks/modules/form-filter/form-filter.js":
/*!*******************************************************!*\
  !*** ./src/blocks/modules/form-filter/form-filter.js ***!
  \*******************************************************/
/***/ (() => {

$(function () {
  var $filterReset = $('.js-form-filter-reset');
  var $filterHead = $('.js-form-filter-head');
  var $formReset = $('.js-form-filter');
  if (!$filterReset.length || !$formReset.length) return;
  var $selectElements = $formReset.find('.js-select2');
  $filterHead.on('click', function (e) {
    e.currentTarget.classList.toggle('is-show');
    $selectElements.filter('[multiple]').trigger('reInitMulti');
  });

  // Прослушиватель для сброса настроек фильтрации 
  $filterReset.on('click', function (e) {
    e.stopPropagation();
    $selectElements.val(null).trigger('change');
    {/*
        этот фрагмент желательно удалить на проде, и написать свою логику под ваши требования, 
        т.к. это все лишь робочий пример. 
     */}
    getContent('./data/ajaxData.default.example.txt');
  });
  {/*
      Прослышиватель формы селектов на изменения их значения, при выборке селектов, 
      у нас происходит аякс запрос на фильтрацию с определенным параметром и возвращается контент, 
      после этого мы вставляем наш получаенный контент в элемент "js-ajax-content" 
      и запускаем триггер для реинициализации карточек материалов.
       этот фрагмент желательно удалить на проде, и написать свою логику под ваши требования, 
      т.к. это все лишь робочий пример. 
   */}
  $formReset.find('.js-select2').on('change', function () {
    getContent('./data/ajaxData.example.txt');
  });
  function getContent(url) {
    $.ajax(url).done(function (data) {
      //  вставляем получаенный контент в элемент 
      //  и запускаем триггер для реинициализации карточек
      $('.js-ajax-content').html(data).trigger('reInitMaterialContent');
    });
  }
});

/***/ }),

/***/ "./src/blocks/modules/intro-block/intro-block.js":
/*!*******************************************************!*\
  !*** ./src/blocks/modules/intro-block/intro-block.js ***!
  \*******************************************************/
/***/ (() => {

$(function () {
  var $slider = $('.js-intro-block-slider');
  var $sliderLink = $('.js-intro-block-link');
  if (!$slider.length) return;
  $sliderLink.on('mouseenter', function (e) {
    var index = $(e.target).data('slide');
    $slider.slick('slickGoTo', index);
  });
  var currentActive = function currentActive(idx) {
    return $sliderLink.eq(idx).addClass('is-active').siblings().removeClass('is-active');
  };
  $sliderLink.on('click', function (e) {
    e.preventDefault();
    var href = $(e.currentTarget).attr('href');
    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, 2000);
  });
  $slider.on('init', function (_, slick) {
    currentActive(slick.currentSlide);
  });
  $slider.on('beforeChange', function (_, slick, currentSlide, nextSlide) {
    currentActive(nextSlide);
  });
  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [{
      breakpoint: 500,
      settings: {
        fade: true
      }
    }]
  });
});

/***/ }),

/***/ "./src/blocks/modules/map/map.js":
/*!***************************************!*\
  !*** ./src/blocks/modules/map/map.js ***!
  \***************************************/
/***/ (() => {

$(function () {
  var $ymapsObj = $(".map");
  if (!$ymapsObj.length) return;
  var myMap = null;
  ymaps.ready(init);
  function init() {
    $('.map__container').each(function (_, el) {
      myMap = new ymaps.Map(el, {
        center: [55.845698, 37.532700],
        zoom: 12,
        controls: ["zoomControl"]
      });
      var placeMark = new ymaps.Placemark([55.845698, 37.532700], {
        balloonContent: 'Технолом'
      }, {
        preset: 'islands#redIcon'
      });
      myMap.geoObjects.add(placeMark);
    });
  }
});

/***/ }),

/***/ "./src/blocks/modules/materials/materials.js":
/*!***************************************************!*\
  !*** ./src/blocks/modules/materials/materials.js ***!
  \***************************************************/
/***/ (() => {

$(function () {
  var $material = $('.js-materials .js-ajax-content');
  if (!$material.length) return;
  var initMaterialCards = function initMaterialCards() {
    var template = function template() {
      return $("\n            <li class=\"materials__show-more\">\n                <button>\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435</button>\n            </li>\n        ");
    };
    var $btnMore = $('.materials__show-more');
    var openList = function openList(e) {
      var $that = $(e.currentTarget);
      $that.siblings().removeAttr('style');
      $that.remove();
    };
    if ($btnMore.length > 0) $btnMore.remove().off('click', openList);
    var $materialList = $material.find('.js-materials-list');
    $materialList.each(function (_, el) {
      var $list = $(el);
      var _ref = [$list.children()],
        $children = _ref[0];
      if ($children.length > 6) {
        var moreBtn = template();
        $list.append(moreBtn);
        $children.not(':nth-child(-n+5), :nth-last-child(1)').css('display', 'none');
        moreBtn.on('click', openList);
      }
    });
  };

  // Инициализация скрипта для карточек  
  initMaterialCards();
  {/*
      Кастомный прослушиватель события, переинициализация карточек 
      в случае добавления новых элементов или замена старого, 
      на родительский DOM елемент "js-ajax-content",
      Для запуска события нужно вызвать элемент "js-ajax-content" с триггером, 
      в том месте где необходимо произвосте рейникализацию, добавим дочерние элементы к родителю.  
      пример: $('.js-ajax-content').html(<data>).trigger('reInitMaterialContent')
      
      Наглядный робочий пример я оставил метод в файле "form-filter.js", 
      этот фрагмент желательно удалить на проде, и написать свою логику под ваши требования, 
      т.к. в файле "form-filter.js", все лишь робочий пример. 
   */}
  $material.on('reInitMaterialContent', initMaterialCards);
});

/***/ }),

/***/ "./src/blocks/modules/modal/modal.js":
/*!*******************************************!*\
  !*** ./src/blocks/modules/modal/modal.js ***!
  \*******************************************/
/***/ (() => {

$(function () {
  var modalTabs = $('.js-tab-btn');
  modalTabs.on('click', function (e) {
    var target = $(e.currentTarget);
    var tab = target.data('tab');
    target.removeClass('btn_empty').siblings().addClass('btn_empty');
    var content = $('.js-modal-content').find("[data-tab=\"".concat(tab, "\"]"));
    content.css('display', 'block').siblings().css('display', 'none');
  });
  var $jsFancy = $('.js-fancy');
  $jsFancy.on('click', function (e) {
    e.preventDefault();
    Fancybox.show([{
      src: e.currentTarget.dataset.src || e.currentTarget.getAttribute('href'),
      type: "inline"
    }], {
      on: {
        done: function done(fancybox, slide) {
          $(fancybox.container).find('.js-card-org-links').trigger('init:links');
        }
      }
    });
  });
});

/***/ }),

/***/ "./src/blocks/modules/news-block/news-block.js":
/*!*****************************************************!*\
  !*** ./src/blocks/modules/news-block/news-block.js ***!
  \*****************************************************/
/***/ (() => {

$(function () {
  var $slidersAll = $('.js-news-block-slider');
  if (!$slidersAll.length) return;
  $slidersAll.each(function (_, slider) {
    var $slider = $(slider);
    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [{
        breakpoint: 1240,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 500,
        settings: {
          variableWidth: true
        }
      }]
    });
  });
});

/***/ }),

/***/ "./src/blocks/modules/price/price.js":
/*!*******************************************!*\
  !*** ./src/blocks/modules/price/price.js ***!
  \*******************************************/
/***/ (() => {

$(function () {
  var $anchor = $('.js-anchor');
  var $accordionHead = $('.js-price-info-head');
  $anchor.on('click', function (e) {
    e.preventDefault();
    var an = e.currentTarget.getAttribute('href');
    document.querySelector("".concat(an)).scrollIntoView({
      behavior: 'smooth'
    });
  });
  $accordionHead.on("click", function () {
    var that = $(this);
    var nextEl = that.next();
    var nextHeight = nextEl[0].scrollHeight;
    that.toggleClass("price__info-head_active");
    if (that.hasClass("price__info-head_active")) {
      return nextEl.css({
        "max-height": nextHeight,
        overflow: "visible",
        opacity: 1
      });
    }
    nextEl.css({
      "max-height": 0,
      overflow: "hidden",
      opacity: 0
    }).removeClass("price__info-head_open");
  });
});

/***/ }),

/***/ "./src/blocks/modules/product-content/product-content.js":
/*!***************************************************************!*\
  !*** ./src/blocks/modules/product-content/product-content.js ***!
  \***************************************************************/
/***/ (() => {

$(function () {
  var $tabBtn = $('.js-product-btn');
  var $contentBlock = $('.js-product-content-description');
  if ($tabBtn.length) {
    $tabBtn.on('click', function () {
      var $that = $(this);
      var tab = $that.data('tab');
      $that.removeClass('btn_empty').siblings().addClass('btn_empty');
      var $block = $that.parent().next('.js-product-content-block');
      console.log($block.find("[data-tab=\"".concat(tab, "\"]")));
      $block.children().removeClass('is-active');
      $block.find("[data-tab=\"".concat(tab, "\"]")).addClass('is-active');
    });
  }
  if ($contentBlock.length) {
    var limit = $contentBlock.data('max-height');
    var blockHeight = $contentBlock[0].scrollHeight;
    if (blockHeight > limit) {
      $contentBlock.addClass('is-hidden');
      var $buttonMore = $contentBlock.next('.js-product-content-more').addClass('is-show');
      $buttonMore.on('click', function () {
        $contentBlock.removeClass('is-hidden').addClass('is-show');
        $buttonMore.remove();
      });
    }
  }
  Fancybox.bind('[data-fancybox="gallery"]', {
    // Your custom options
  });
});

/***/ }),

/***/ "./src/blocks/modules/select2/select2.js":
/*!***********************************************!*\
  !*** ./src/blocks/modules/select2/select2.js ***!
  \***********************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
$(function () {
  var $select = $('.js-select2');
  var $single = $select.filter(':not("[multiple]")');
  var $multiple = $select.filter('[multiple]');
  var arrowTemp = function arrowTemp() {
    var cn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return $("<div class=\"select2-arrow".concat(' ' + cn, "\"><svg><use xlink:href=\"./img/sprites/sprite.svg#select-arrow\"></use></svg></div>"));
  };
  if (!$select.length) return;

  // $('[data-reset]').on('click', ()=> {
  //     $select.val(null).trigger('change')
  // })

  var params = {
    allowClear: true,
    selectionCssClass: 'customize-select',
    dropdownCssClass: 'customize-dropdown',
    width: '100%'
  };
  $single.select2(params).each(function (_, el) {
    var $that = $(el);
    $that.next().find('.select2-selection__arrow').replaceWith(arrowTemp('is-single'));
  });
  var initMultiple = function initMultiple($that) {
    var $selector = $that || $multiple;
    $selector.select2(_objectSpread(_objectSpread({}, params), {}, {
      dropdownCssClass: 'customize-dropdown is-multiple',
      multiple: true,
      closeOnSelect: false
    })).each(function (_, el) {
      var $that = $(el);
      $that.next().find('.select2-search').html($that.data('placeholder')).after(arrowTemp());
      multipleCallback($that);
    }).on('change.select2', function (e) {
      return multipleCallback($(e.currentTarget));
    });
  };
  initMultiple();
  $multiple.on('reInitMulti', function (e) {
    var $that = $(e.target);
    $that.select2('destroy');
    initMultiple($that);
  });
  function multipleCallback(that) {
    var select2 = that.next().find(".select2-selection.select2-selection--multiple");
    var selectRender = select2.find(".select2-selection__rendered");
    var limitIndex = null;
    console.log(select2.width());
    Array.from(selectRender.find('.select2-selection__choice')).reduce(function (acc, el, i) {
      var width = acc + $(el).outerWidth();
      if (select2.width() - 70 < width && !limitIndex) limitIndex = i;else if (select2.width() - 70 >= width) limitIndex = null;
      return width;
    }, 0);
    var buttonTemp = $("<button type=\"button\" class=\"open-select-more\">...</button>");
    if (limitIndex) {
      selectRender.find('.select2-selection__choice').eq(limitIndex - 1).nextAll().remove();
      selectRender.append(buttonTemp);
    } else {
      buttonTemp.remove();
    }
  }
});

/***/ }),

/***/ "./src/blocks/modules/similar-products/similar-products.js":
/*!*****************************************************************!*\
  !*** ./src/blocks/modules/similar-products/similar-products.js ***!
  \*****************************************************************/
/***/ (() => {

$(function () {
  var $slidersAnalysis = $('.js-slider-analysis');
  if (!$slidersAnalysis.length) return;
  $slidersAnalysis.each(function (_, slider) {
    var $slider = $(slider);
    $slider.slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: false,
      responsive: [{
        breakpoint: 1240,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slideToScroll: 1,
          dots: true
        }
      }, {
        breakpoint: 540,
        settings: {
          variableWidth: true,
          dots: true
        }
      }]
    });
  });
});

/***/ }),

/***/ "./src/js/import/components.js":
/*!*************************************!*\
  !*** ./src/js/import/components.js ***!
  \*************************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_materials_materials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/materials/materials */ "./src/blocks/modules/materials/materials.js");
/* harmony import */ var _modules_materials_materials__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_materials_materials__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_select2_select2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/select2/select2 */ "./src/blocks/modules/select2/select2.js");
/* harmony import */ var _modules_select2_select2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_select2_select2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_intro_block_intro_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! %modules%/intro-block/intro-block */ "./src/blocks/modules/intro-block/intro-block.js");
/* harmony import */ var _modules_intro_block_intro_block__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_intro_block_intro_block__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_content_table_content_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! %modules%/content-table/content-table */ "./src/blocks/modules/content-table/content-table.js");
/* harmony import */ var _modules_content_table_content_table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_content_table_content_table__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_news_block_news_block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! %modules%/news-block/news-block */ "./src/blocks/modules/news-block/news-block.js");
/* harmony import */ var _modules_news_block_news_block__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_news_block_news_block__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_form_filter_form_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! %modules%/form-filter/form-filter */ "./src/blocks/modules/form-filter/form-filter.js");
/* harmony import */ var _modules_form_filter_form_filter__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_form_filter_form_filter__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_product_content_product_content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! %modules%/product-content/product-content */ "./src/blocks/modules/product-content/product-content.js");
/* harmony import */ var _modules_product_content_product_content__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_product_content_product_content__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_similar_products_similar_products__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! %modules%/similar-products/similar-products */ "./src/blocks/modules/similar-products/similar-products.js");
/* harmony import */ var _modules_similar_products_similar_products__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_modules_similar_products_similar_products__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_map_map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! %modules%/map/map */ "./src/blocks/modules/map/map.js");
/* harmony import */ var _modules_map_map__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_modules_map_map__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _modules_accordion_accordion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! %modules%/accordion/accordion */ "./src/blocks/modules/accordion/accordion.js");
/* harmony import */ var _modules_accordion_accordion__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_modules_accordion_accordion__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _modules_price_price__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! %modules%/price/price */ "./src/blocks/modules/price/price.js");
/* harmony import */ var _modules_price_price__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_modules_price_price__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _modules_cards_cards__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! %modules%/cards/cards */ "./src/blocks/modules/cards/cards.js");
/* harmony import */ var _modules_cards_cards__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_modules_cards_cards__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _modules_card_org_card_org__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! %modules%/card-org/card-org */ "./src/blocks/modules/card-org/card-org.js");
/* harmony import */ var _modules_card_org_card_org__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_modules_card_org_card_org__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _modules_modal_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! %modules%/modal/modal */ "./src/blocks/modules/modal/modal.js");
/* harmony import */ var _modules_modal_modal__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_modules_modal_modal__WEBPACK_IMPORTED_MODULE_13__);
// import "%modules%/header/header";
// import "%modules%/footer/footer";
















/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import/components */ "./src/js/import/components.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_import_components__WEBPACK_IMPORTED_MODULE_1__);


})();

/******/ })()
;
//# sourceMappingURL=main.js.map