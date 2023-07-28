$(()=> {
    const $body = $('body');
    const $priceList = $('.js-price-list')
    const $priceLinks = $('.js-card-org-links')
    const matchMedia = window.matchMedia('(max-width: 768px)')
    

    $priceLinks.on('init:links', e=> {
        const target = $(e.target)
        const listMore = target.find('.js-links-more')
        const listLinks = target.find('.card-org__link')
        let limitIndex = null
        const x = Array.from(listLinks).reduce((acc, tab, idx)=> {
            const width = acc + +$(tab).outerWidth()
            if (target.width() - 14 < width && !limitIndex) limitIndex = idx
            else if (target.width() - 14 >= width) limitIndex = null
            return width
        }, 0)

        if (limitIndex) {
            listLinks.show()
            listLinks.eq(matchMedia.matches ? limitIndex + 1 : limitIndex-1).nextAll().not(listMore).hide()
            listMore.removeAttr('hidden')
            const handler = ()=> {
                listLinks.removeAttr('style')
                listMore.off('click', handler)
                return listMore.remove()
            }

            listMore.on('click', handler)
        } else {
            listLinks.removeClass('card-org__link_hide')
            listMore.remove()
        } 
    })
    
    $priceLinks.trigger('init:links')
    
    $priceList.on('init:list',  e=> {
        const target = $(e.target)
        const list = target.find('.card-org__list')
        const listLink = target.find('.card-org__list-link')
        const listChildren = list.children()
    
        if (listChildren.length > 3) {
            listLink.removeAttr('hidden')
            const handler = ()=> {
                listChildren.css('display', 'flex')
                listLink.off('click', handler)
                return listLink.remove()
            }
            listLink.on('click', handler)
        }
    })

    $priceList.trigger('init:list')

    $body.on('click', '.js-map-show', e=> {
        const target = $(e.currentTarget)
        const map = target.parents('.card-org').find('.js-card-org-map').fadeToggle().toggleClass('active')
        if (map.hasClass('active')) {
            map[0].scrollIntoView({
                behavior: 'smooth'
            });
        }
    })

    $body.on('click', '.js-card-org-share', e=> {
        const target = $(e.currentTarget)
        navigator.clipboard.writeText(target[0].dataset.link);
        target.attr('data-tooltip', 'Скопировано')

        setTimeout(()=> {
            target.attr('data-tooltip', 'Скопировать ссылку')
        }, 3000)
    })
})