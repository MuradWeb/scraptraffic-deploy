$(()=> {
    const $tabBtn = $('.js-product-btn');
    const $contentBlock = $('.js-product-content-description');

    if ($tabBtn.length) {
        $tabBtn.on('click', function() {
            const $that = $(this);
            const tab = $that.data('tab');

            $that.removeClass('btn_empty').siblings().addClass('btn_empty')
            
            const $block = $that.parent().next('.js-product-content-block')
            console.log($block.find(`[data-tab="${tab}"]`))
            $block.children().removeClass('is-active')
            $block.find(`[data-tab="${tab}"]`).addClass('is-active')
        })
    }

    if ($contentBlock.length) {
        const limit = $contentBlock.data('max-height')
        const blockHeight = $contentBlock[0].scrollHeight
        if (blockHeight > limit) {
            $contentBlock.addClass('is-hidden')
            const $buttonMore = $contentBlock.next('.js-product-content-more').addClass('is-show')
            $buttonMore.on('click', ()=> {
                $contentBlock.removeClass('is-hidden').addClass('is-show')
                $buttonMore.remove()
            })
        }
    }

    Fancybox.bind('[data-fancybox="gallery"]', {
        // Your custom options
    });
      
})