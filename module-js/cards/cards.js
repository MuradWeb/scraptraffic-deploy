$(()=> {
    const $cardsTab = $('.js-cards-tab');
    const $cardsList = $('.js-cards-list');

    $cardsTab.on('click', 'button.cards__tab-btn', e=> {
        const $that = $(e.target)
        const filter = $that.data('filter')
        $that.addClass('cards__tab-btn_active').siblings().removeClass('cards__tab-btn_active')
        const $cards = $cardsList.find(`.cards__card`)
        if (filter === 'all') return $cards.css('display', 'block')
        $cards.not(`[data-filter="${filter}"]`).css('display', 'none')
        $cards.filter(`[data-filter="${filter}"]`).css('display', 'block')
    })
})