$(()=> {
    const $filterReset = $('.js-form-filter-reset');
    const $filterHead = $('.js-form-filter-head');
    const $formReset = $('.js-form-filter');

    if (!$filterReset.length || !$formReset.length) return;

    const $selectElements = $formReset.find('.js-select2')

    $filterHead.on('click', e=> {
        e.currentTarget.classList.toggle('is-show')
        $selectElements.filter('[multiple]').trigger('reInitMulti')
    })

    // Прослушиватель для сброса настроек фильтрации 
    $filterReset.on('click', ()=> {
        $selectElements.val(null).trigger('change')
        {/*
            этот фрагмент желательно удалить на проде, и написать свою логику под ваши требования, 
            т.к. это все лишь робочий пример. 
        */}
        getContent('./data/ajaxData.default.example.txt')
    })


    {/*
        Прослышиватель формы селектов на изменения их значения, при выборке селектов, 
        у нас происходит аякс запрос на фильтрацию с определенным параметром и возвращается контент, 
        после этого мы вставляем наш получаенный контент в элемент "js-ajax-content" 
        и запускаем триггер для реинициализации карточек материалов.

        этот фрагмент желательно удалить на проде, и написать свою логику под ваши требования, 
        т.к. это все лишь робочий пример. 
    */}

    $formReset.find('.js-select2').on('change', ()=> {
        getContent('./data/ajaxData.example.txt')
    })

    function getContent(url) {
        $.ajax(url).done(data=> {
        
            //  вставляем получаенный контент в элемент 
            //  и запускаем триггер для реинициализации карточек
            $('.js-ajax-content').html(data).trigger('reInitMaterialContent')
        })
    }
})