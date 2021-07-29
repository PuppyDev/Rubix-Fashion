var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 5,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical',
    breakpoints: {
        0: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        },
    }
});

var galleryTop = new Swiper('.gallery-top', {
    thumbs: {
        swiper: galleryThumbs
    },
});

// change carousel item height
// gallery - top

// activation zoom plugin
var $easyzoom = $('.easyzoom').easyZoom();