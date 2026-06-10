(function () {
    'use strict';

    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 0,
        dots: false,
        nav: true,
        autoplay: true,
        smartSpeed: 800,
        responsive: {
            0: { items: 2 },
            500: { items: 3 },
            800: { items: 4 },
            1100: { items: 5 }
        }
    });

})();