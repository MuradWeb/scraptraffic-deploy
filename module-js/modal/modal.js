$(()=> {
    const modalTabs = $('.js-tab-btn')

    modalTabs.on('click', e=> {
        const target = $(e.currentTarget)
        const tab = target.data('tab')
        target.removeClass('btn_empty').siblings().addClass('btn_empty')
        const content = $('.js-modal-content').find(`[data-tab="${tab}"]`)
        content.css('display', 'block').siblings().css('display', 'none')
    })

    const $jsFancy = $('.js-fancy');
    
    $jsFancy.on('click', e=> {
        e.preventDefault();
        Fancybox.show([
            {
              src: e.currentTarget.dataset.src || e.currentTarget.getAttribute('href'),
              type: "inline",
            },
        ],
        {
            on: {
                done: (fancybox, slide) => {
                
                    $(fancybox.container).find('.js-card-org-links').trigger('init:links')
                },
            }
        }
        );
    })
})