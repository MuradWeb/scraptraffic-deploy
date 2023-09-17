$(function () {
    const $accordionHead = $('.js-accordion-head');

    if(!$accordionHead.length) return;

    $accordionHead.on("click", function () {
        const that = $(this);
        const nextEl = that.next();
        const nextHeight = nextEl[0].scrollHeight
        that.toggleClass("accordion__head_active")

        if (that.hasClass("accordion__head_active")) {
            return nextEl.css({
                "max-height": nextHeight,
                overflow: "visible",
                opacity: 1,
                "margin-top": 20
            })
        }

        nextEl.css({
            "max-height": 0,
            overflow: "hidden",
            opacity: 0,
            "margin-top": 0
        }).removeClass("accordion__content_open")
    })
})