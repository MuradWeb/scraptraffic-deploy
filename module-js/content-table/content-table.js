$(()=> {
    const $tableTab  = $('.js-content-table-tab')

    if (!$tableTab.length) return;
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
})