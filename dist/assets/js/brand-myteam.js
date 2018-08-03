document.addEventListener("DOMContentLoaded", function() {

    // test-active
    $('.test-active').owlCarousel({
        smartSpeed: 1000,
        margin: 0,
        nav: false,
        center: true,
        autoplay: true,
        autoplayTimeout: 3000,
        loop: true,
        navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            678: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })

    // brand-active
    $('.brand-active').owlCarousel({
        smartSpeed: 1000,
        margin: 0,
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,
        loop: true,
        navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            678: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    })

});