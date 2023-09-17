$(()=> {
    const $select = $('.js-select2');
    const $single = $select.filter(':not("[multiple]")');
    const $multiple = $select.filter('[multiple]')
    const arrowTemp = (cn='')=> $(`<div class="select2-arrow${' '+cn}"><svg><use xlink:href="./img/sprites/sprite.svg#select-arrow"></use></svg></div>`)
    if (!$select.length) return;
    

    // $('[data-reset]').on('click', ()=> {
    //     $select.val(null).trigger('change')
    // })

    const params = {
        allowClear: true,
        selectionCssClass: 'customize-select',
        dropdownCssClass: 'customize-dropdown',
        width: '100%',
    }


    $single.select2(params)
        .each((_, el)=> {
        const $that = $(el);
        $that.next().find('.select2-selection__arrow').replaceWith(arrowTemp('is-single'))
    })

    const initMultiple = $that => {
        const $selector = $that || $multiple
        $selector.select2({
            ...params,
            dropdownCssClass: 'customize-dropdown is-multiple',
            multiple: true,
            closeOnSelect: false,
        }).each((_, el)=> {
            const $that = $(el);
            $that.next().find('.select2-search').html($that.data('placeholder')).after(arrowTemp())
            multipleCallback($that)
        }).on('change.select2', e=> multipleCallback($(e.currentTarget)))
    }


    initMultiple()

    $multiple.on('reInitMulti', e=> {
        const $that = $(e.target)
        $that.select2('destroy')
        initMultiple($that)
    })

  
    function multipleCallback(that) {
        const select2 = that.next().find(".select2-selection.select2-selection--multiple") 
        const selectRender = select2.find(".select2-selection__rendered") 
        let limitIndex = null;

        console.log(select2.width())
        
        Array.from(selectRender.find('.select2-selection__choice')).reduce((acc, el, i) => {
            const width = acc + $(el).outerWidth()
            if (select2.width() - 70 < width && !limitIndex) limitIndex = i
            else if (select2.width() - 70 >= width) limitIndex = null
            return width
        }, 0)

        const buttonTemp = $(`<button type="button" class="open-select-more">...</button>`)
        if (limitIndex) {
            selectRender.find('.select2-selection__choice').eq(limitIndex-1).nextAll().remove()
            selectRender.append(buttonTemp)
        } else {
            buttonTemp.remove()
        }        
    }
})