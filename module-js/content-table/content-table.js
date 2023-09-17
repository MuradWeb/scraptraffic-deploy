$(()=> {
    const $tableTab  = $('.js-content-table-tab')
    const $tableList  = $('.js-content-table-list')
    const matchMedia = window.matchMedia('(max-width: 768px)') 
    if ($tableTab.length) {
        const cn = 'content-table__tab-link_active'
        const listCn = 'content-table__list_active'

        $tableTab.on('click', 'button[data-type]', function() {
            const $that = $(this)
        
            const { type } = $that.data()
            $that.addClass(cn).siblings('button[data-type]').removeClass(cn)
            const $block = $that.parent().next('.js-content-table-block')
            $block.children().removeClass(listCn)
            $block.find(`[data-type="${type}"]`).addClass(listCn)

        })
      

        initTabs()
    
        function initTabs() {
            if (matchMedia.matches) return
            
            $tableTab.each((_, el)=> {
                const $tab = $(el)
                const isLimitTruth = tabLimitView($tab)
                toggleTab($tab, isLimitTruth)
            })
        }
        
        function toggleTab($tab, isLimitTruth) {
            const $buttonMore = $tab.find('.js-content-table-tab-more')
            const callBack = e=> {
                const target= $(e.currentTarget)
                const isShow = target[0].dataset.show
                const hiddenChild = $tab.children('[data-hidden]')
                if (isShow) {
                    target.html('...').attr({
                        'data-text': '...',
                        'data-show': null,
                    })
                    hiddenChild.addClass('content-table__tab-link_hide')
                    $tab.removeAttr('style')
                    return 
                }

                target.html('&#10005;').attr({
                    'data-text': '&#10005;',
                    'data-show': true,
                })
                $tab.css('height', 'auto')
                hiddenChild.removeClass('content-table__tab-link_hide')
            }
            
            if (isLimitTruth) {
                $buttonMore.on('click', callBack)
            } else {
                $buttonMore.off('click', callBack)
            }
            
        }

        function tabLimitView($tab) {
            const widthContainer = $tab.width()
            let limitIndex = null
            const x = Array.from($tab.children()).reduce((acc, tab, idx)=> {
                const width = acc + +$(tab).outerWidth()
                if (widthContainer - 14 < width && !limitIndex) limitIndex = idx
                else if (widthContainer - 14 >= width) limitIndex = null
                return width
            }, 0)
            
            if (limitIndex) {
                $tab.children().eq(limitIndex-1).nextAll(':not(".js-content-table-tab-more")').addClass('content-table__tab-link_hide').attr('data-hidden', 'true')
                $tab.find('.js-content-table-tab-more').addClass('content-table__tab-link_show')
                return true
            } else {
                $tab.children(':not(".js-content-table-tab-more")').removeClass('content-table__tab-link_hide').removeAttr('data-hidden')
                $tab.find('.js-content-table-tab-more').removeClass('content-table__tab-link_show')
                return false
            }    
        }
    }

    if ($tableList.length) {
        $tableList.each((_, el)=> {
            const $list = $(el) 
            initTableList($list)
        })

        function initTableList($list) {
            const limit = $list.data('limit')
            const children = $list.children(':not(".js-list-show-more")')
            const moreBtn = $list.find('.js-list-show-more')
            console.log(children, limit)
            const callBack = ()=> {
                children.addClass('is-show-all').removeAttr('hidden')
                moreBtn.remove()
            }

            if (children.length > +limit) {
                children.eq(limit-2).nextAll().attr('hidden', 'hidden')
                moreBtn.css('display', 'block').on('click', callBack)
            } else {
                children.removeAttr('hidden').addClass('is-show-all')
                moreBtn.css('display', 'none').off('click', callBack)
            }

        }
    }
})