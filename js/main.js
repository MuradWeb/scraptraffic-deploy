/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modules/content-table/content-table.js":
/*!***********************************************************!*\
  !*** ./src/blocks/modules/content-table/content-table.js ***!
  \***********************************************************/
/***/ (() => {

$(function () {
  var $tableTab = $('.js-content-table-tab');
  if (!$tableTab.length) return;
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
  $filterReset.on('click', function () {
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
  $sliderLink.on('click', function (e) {
    e.preventDefault();
    var href = $(e.currentTarget).attr('href');
    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, 2000);
  });
  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  });
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
  var $jsFancy = $('.js-fancy');
  $jsFancy.on('click', function (e) {
    Fancybox.show([{
      src: e.currentTarget.dataset.src,
      type: "inline"
    }]);
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
/* harmony import */ var _modules_modal_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! %modules%/modal/modal */ "./src/blocks/modules/modal/modal.js");
/* harmony import */ var _modules_modal_modal__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_modules_modal_modal__WEBPACK_IMPORTED_MODULE_8__);
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