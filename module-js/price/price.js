$(function () {
    const $anchor = $('.js-anchor')    
    const $accordionHead = $('.js-price-info-head');
        

    $anchor.on('click', e=> {
        e.preventDefault();
        const an = e.currentTarget.getAttribute('href')
        document.querySelector(`${an}`).scrollIntoView({
            behavior: 'smooth'
        });
    })

    $accordionHead.on("click", function () {
        const that = $(this);
        const nextEl = that.next();
        const nextHeight = nextEl[0].scrollHeight
        that.toggleClass("price__info-head_active")

        if (that.hasClass("price__info-head_active")) {
            return nextEl.css({
                "max-height": nextHeight,
                overflow: "visible",
                opacity: 1,
            })
        }

        nextEl.css({
            "max-height": 0,
            overflow: "hidden",
            opacity: 0,
        }).removeClass("price__info-head_open")
    })
})