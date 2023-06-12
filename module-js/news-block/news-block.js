$(function() {
    const $slidersAll = $('.js-news-block-slider');

    if(!$slidersAll.length) return;

    $slidersAll.each((_, slider) => {
        const $slider = $(slider)
        $slider.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,

            responsive: [
                {
                    breakpoint: 1240,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        variableWidth: true,
                    }
                }


            ]
        })
   })  
})