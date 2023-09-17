$(function() {
    const $ymapsObj = $(".map");

    if (!$ymapsObj.length) return;

    let myMap = null;
    ymaps.ready(init);
    function init() {
        $('.map__container').each((_, el) => {
            myMap = new ymaps.Map(el, {
                center: [55.845698, 37.532700],
                zoom: 12,
                controls: ["zoomControl"]
            });
    
            const placeMark = new ymaps.Placemark([55.845698, 37.532700], {
                balloonContent: 'Технолом'
            }, {
                preset: 'islands#redIcon'
            })
    
            myMap.geoObjects.add(placeMark);
        })
    }
})