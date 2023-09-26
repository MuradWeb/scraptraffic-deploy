$(()=> {
    const $password = $('.js-password')

    $password.on('click', '.input-btn', function() {
        const that = $(this)
        that.toggleClass('is-active')

        if(that.hasClass('is-active')) {
            $password.find('.input').attr('type', 'text')
            that.find('use').attr('xlink:href', './img/sprites/sprite.svg#icon-eye-1')
        } else {
            $password.find('.input').attr('type', 'password')
            that.find('use').attr('xlink:href', './img/sprites/sprite.svg#icon-eye')
        }
    })
})