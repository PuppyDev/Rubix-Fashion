// This is slider list products
$(".listproduct").owlCarousel({
    loop: false,
    nav: false,
    margin: 20,
    responsive: {

        600: {
            items: 2,
        },
        1000: {
            items: 4,
        },
    },
});

// this is list blog
$("#blog").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: [
        `<i class="fas fa-chevron-left"></i>`,
        `<i class="fas fa-chevron-right"></i>`
    ],
    responsive: {
        600: {
            items: 2,
        },
        1000: {
            items: 3,
        },
    },

});


$("#brand").owlCarousel({
    loop: true,
    margin: 100,
    nav: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
        0: {
            items: 2
        },
        630: {
            items: 3,
        },
        765: {
            items: 4
        },
        992: {
            items: 5
        },
        1200: {
            items: 6,
        },
    },

});