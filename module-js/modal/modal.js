$(()=> {
    const $jsFancy = $('.js-fancy');
    
    $jsFancy.on('click', e=> {
        Fancybox.show([
            {
              src: e.currentTarget.dataset.src,
              type: "inline",
            },
        ]);
    })
})