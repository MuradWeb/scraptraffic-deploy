$(function() {
    const $slidersAnalysis = $('.js-slider-analysis');

   if(!$slidersAnalysis.length) return;

   $slidersAnalysis.each((_, slider) => {
        const $slider = $(slider)
        $slider.slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: false,

            responsive: [
                {
                    breakpoint: 1240,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slideToScroll: 1,
                        dots: true,
                    }
                },
                {
                    breakpoint: 540,
                    settings: {
                        variableWidth: true,
                        dots: true,
                    }
                },

            ]
        })
   })
    
})