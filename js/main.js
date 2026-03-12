(function () {
    'use strict';

    // Init Libs
    new WOW().init();
    $('.lazy').lazyload();

    var scrollTopBtn = $('.scroll-top');

    const tabButtons = document.querySelectorAll(".tab-btn");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const tab = button.dataset.tab;

            // Atualiza estado dos botões
            document.querySelectorAll(".tab-btn").forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            // Atualiza o conteúdo (textos e logos)
            updateBanner(tab);
        });
    });

    function updateBanner(tab) {

        const banner = document.querySelector(".home-banner");
        const title = document.querySelector(".home-banner .title");
        const descDesktop = document.querySelector(".home-banner .desc.d-none.d-lg-block");
        const descMobile = document.querySelector(".home-banner .desc.d-block.d-lg-none");
        const logos = document.querySelectorAll(".verticais-neg__brands a");

        if (tab === "capital") {

            if (title && banner) {
                const customTitle = banner.getAttribute("data-title-capital");
                title.innerHTML = customTitle || "Investimos em inovação com potencial real de escala";
            }

            if (descDesktop && banner) {
                const customDesc = banner.getAttribute("data-desc-capital-desktop");
                descDesktop.innerHTML = customDesc || "Estruturamos e realizamos investimentos em empresas com forte tração e estágio de pré-scale up, em coinvestimento com fundos de venture capital e foco na geração consistente de retorno sobre o capital.";
            }

            if (descMobile && banner) {
                const customDesc = banner.getAttribute("data-desc-capital-mobile");
                descMobile.innerHTML = customDesc || "Estruturamos e realizamos investimentos em empresas com forte tração e estágio de pré-scale up, em coinvestimento com fundos de venture capital e foco na geração consistente de retorno sobre o capital.";
            }

        } else {

            if (title && banner) {
                const customTitle = banner.getAttribute("data-title-ventures");
                title.innerHTML = customTitle || "Construímos empresas preparadas para venture capital";
            }

            if (descDesktop && banner) {
                const customDesc = banner.getAttribute("data-desc-ventures-desktop");
                descDesktop.innerHTML = customDesc || "Desenvolvemos startups com base em times qualificados, plataformas digitais orientadas por dados e validação comercial consistente, estruturando empresas prontas para captar capital institucional e escalar.";
            }

            if (descMobile && banner) {
                const customDesc = banner.getAttribute("data-desc-ventures-mobile");
                descMobile.innerHTML = customDesc || "Desenvolvemos startups com base em times qualificados, plataformas digitais orientadas por dados e validação comercial consistente, estruturando empresas prontas para captar capital institucional e escalar.";
            }
        }

        // 🔥 TROCA DAS LOGOS - Remove a classe is-hidden dos logos do grupo ativo
        logos.forEach(logo => {
            const logoGroup = logo.dataset.group;
            if (logoGroup === tab) {
                logo.classList.remove("is-hidden");
                logo.style.display = ''; // Garante que o display seja resetado
                logo.style.visibility = ''; // Garante que o visibility seja resetado
            } else if (logoGroup && logoGroup !== tab) {
                logo.classList.add("is-hidden");
            }
        });
    }

    // 🔥 Inicializa mostrando ventures
    updateBanner("ventures");

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            scrollTopBtn.addClass('show');
        } else {
            scrollTopBtn.removeClass('show');
        }

        if ($(window).scrollTop() > 200) {
            $('#home-banner-more').css("opacity", 1 - $(window).scrollTop() / ($('#home-banner-more').height() + 400));
        } else {
            $('#home-banner-more').css("opacity", 1);
        }
    });

    $(document).on("scroll", function () {
        if ($(document).scrollTop() > 100) {
            $("#main-header").addClass("sticky");
        } else if (!($(".navbar-collapse").hasClass('show'))) {
            $("#main-header").removeClass("sticky");
        }
    });

    $('a[href*=\\#]:not([href$=\\#])').click(function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 50
        }, 500);
    });

    $('[data-toggle="painel-numeros"]').click(function () {
        const curr = $('#painel-numeros-tab-1').attr('data-visible') === 'true' ? 1 : 2;

        if (curr === 1) {
            $(this).addClass('active');
        }

        if (curr === 2) {
            $(this).removeClass('active');
        }

        $(`#painel-numeros-tab-${curr}`).attr('data-visible', false);
        $(`#painel-numeros-tab-${curr == 1 ? 2 : 1}`).attr('data-visible', true);
    });

    const carteiraLength = $('.carteira-sec__carousel-item').length - 1;
    let carteiraCurr = $('.carteira-sec__carousel-item[data-visible="true"]').index();

    const updateCarteira = function () {
        $('.carteira-sec__carousel-item').attr('data-visible', false);
        $(`.carteira-sec__carousel-item:nth-child(${carteiraCurr + 1})`).attr('data-visible', true);
    }

    $('[data-toggle="carteira-next"]').click(function () {
        carteiraCurr = carteiraCurr < carteiraLength ? carteiraCurr + 1 : 0;
        updateCarteira();
    });

    $('[data-toggle="carteira-prev"]').click(function () {
        carteiraCurr = carteiraCurr > 0 ? carteiraCurr - 1 : carteiraLength;
        updateCarteira();
    });

    $('[data-toggle="carteira-dot"]').click(function () {
        carteiraCurr = $(this).index();
        updateCarteira();
    });

    scrollTopBtn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });

    var isIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            return true;
        }

        return false;
    }

    if (isIE()) {
        $('#popup-explorer').addClass('visible');
    }

    window.dispatchEvent(new Event('resize'));

})();