$(()=> {
    const $material = $('.js-materials .js-ajax-content')
    if (!$material.length) return
   
    
    const initMaterialCards = () => {
        const template = ()=> $(`
            <li class="materials__show-more">
                <button>Подробнее</button>
            </li>
        `)
        const $btnMore = $('.materials__show-more');

        const openList = e => {
            const $that = $(e.currentTarget)
            $that.siblings().removeAttr('style')
            $that.remove()
        }

        if ($btnMore.length>0) $btnMore.remove().off('click', openList)

        const $materialList = $material.find('.js-materials-list')
        $materialList.each((_, el) => {
            const $list = $(el);
            const [$children] = [$list.children()] 
            
            if ($children.length > 6) {
                const moreBtn = template() 
                $list.append(moreBtn)
                $children.not(':nth-child(-n+5), :nth-last-child(1)').css('display', 'none')

                moreBtn.on('click', openList)
            }
        })
    }

    // Инициализация скрипта для карточек  
    initMaterialCards()
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
 
    $material.on('reInitMaterialContent', initMaterialCards)
})