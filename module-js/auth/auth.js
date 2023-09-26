$(()=> {
    const $formBlock = $('.js-form-block')
    const $authBlock = $('.js-auth')
    const $window = $(window)
    
    function init() {
        const formHeight = $formBlock.height()
        const authHeight = $authBlock.innerHeight()
        const windowHeight = $window.height()

        if (windowHeight < authHeight) {
            $formBlock.find('.auth__block-inner').height(
                formHeight - (authHeight - windowHeight) - 60
            )
        } else {
            $formBlock.find('.auth__block-inner').removeAttr('style')
        }
    }

    init()

    $window.on('resize', init)
})