$(()=> {
    const $slider = $('.js-intro-block-slider');
    const $sliderLink = $('.js-intro-block-link');
    
    if(!$slider.length) return;

    $sliderLink.on('mouseenter', e=> {
        const index = $(e.target).data('slide');
        $slider.slick('slickGoTo', index)
    })

    const currentActive = (idx)=> $sliderLink.eq(idx).addClass('is-active').siblings().removeClass('is-active')

    $sliderLink.on('click', e=> {
        e.preventDefault();
        const href = $(e.currentTarget).attr('href')
        
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 2000);
    })

    $slider.on('init', (_, slick)=> {
        currentActive(slick.currentSlide)
    })

    $slider.on('beforeChange', (_, slick, currentSlide, nextSlide)=> {
        currentActive(nextSlide)
    })

    $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        responsive: [

            {
                breakpoint: 500,
                settings: {
                    fade: true,
                }
            }


        ]
    })

   
})