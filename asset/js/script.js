$(document).ready(function () {
    $('#nav-burger').click(function () {
        $(this).toggleClass('open')
        $('.collapse:not(.show)').toggleClass('active')
    })
    // aos

    AOS.init()

    // owl carousel
    $('.owl-carousel.film-image-blk').owlCarousel({
        loop: true,
        margin: 16,
        autoplay: true,
        navSpeed: 5000,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 2,
            },
        },
    })

    // get currrent year in footer
    var currentYear = new Date().getFullYear()
    $('#currentYear').text(currentYear)

    // scroll to second section
    $('.btn-click').on('click', function (event) {
        event.preventDefault()
        var target = $(this).attr('href')
        var headerHeight = $('header').outerHeight()
        $('html, body').animate(
            {
                scrollTop: $(target).offset().top - headerHeight,
            },
            1000,
        )
    })

    // card flip
    $('.flipper-btn').click(function (ev) {
        ev.preventDefault()
        $('.flipper').removeClass('do-flip')
        $(this).parents('.flipper').addClass('do-flip')
    })
    $('.flipper-btn-close').click(function (ev) {
        ev.preventDefault()
        $(this).parents('.flipper').removeClass('do-flip')
    })

    // scroll to section on click
    $('.nav-link').on('click', function (e) {
        e.preventDefault()
        // $(".nav-link").removeClass("active");
        var headerHeight = $('header').outerHeight()
        var targetId = $(this).attr('href')
        var targetPosition = $(targetId).offset().top - headerHeight
        // $(this).addClass("active");
        $('html, body').animate(
            {
                scrollTop: targetPosition,
            },
            1000,
        )
        if ($(window).width() < 992) {
            $('#nav-burger').trigger('click')
        }
    })

    // highlight nav-link on scroll
    $(window).on('scroll', function () {
        highlightNavLink()
    })

    function handleVideoPlayers(clickedVideo) {
        // Pause all other videos
        $('.video-clip')
            .not(clickedVideo)
            .each(function () {
                this.pause();
            })
    }

    $('.play-btn').click(function (ev) {
        // Prevent the default click behavior
        ev.preventDefault()
        // Get the clicked video element
        var clickedVideo = $(this).parent().siblings('.video-clip')[0];

        // Hide the parent element of the clicked button
        $(this).parent().hide();

        // Hide the siblings with the class ".sm-video-bg-img"
        $(this).parent().siblings('.sm-video-bg-img').hide();

        handleVideoPlayers(clickedVideo);

        clickedVideo.play();
    })
    $('.video-clip').click(function (ev) {
        // Prevent the default click behavior
        ev.preventDefault();

        // Get the clicked video element
        var clickedVideo = $(this)[0];
        handleVideoPlayers(clickedVideo);

    })


    // typing effect
    var text = $('.typing-effect').html()
    var textLength = text.length
    var currentIndex = 0
    var delay = 500

    function typeCharacter() {
        if (isElementInViewport('#who-am-i')) {
            $('.typing-effect').html(text.substr(0, currentIndex))
            currentIndex++
            if (currentIndex < textLength) {
                setTimeout(typeCharacter, delay)
            }
        }
    }
    $('.typing-effect').text('')

    let flag = false
    $(window).scroll(function () {
        if (isElementInViewport('#who-am-i') && !flag) {
            typeCharacter()
            flag = true;
        } else {
            flag = false;
        }
    })
    // modal on load
    // $('#site-load').modal('show');
    $('body').on('contextmenu', function (e) {
        // Prevent the default context menu from appearing
        e.preventDefault()

        // Show the modal on right-click
        $('#site-load').modal('show')
    })

    // accodion on viewport

    const accordionButtons = $('.accordion-button')
    let headerHeight = $('header').outerHeight()

    accordionButtons.each(function () {
        const accordionButton = $(this)

        accordionButton.on('click ,resize', function () {
            if (isElementInViewport(accordionButton)) {
                setTimeout(function () {
                    const targetTop = accordionButton.offset().top - headerHeight
                    $('html, body').animate(
                        {
                            scrollTop: targetTop,
                        },
                        1000,
                    )
                }, 500)
            }
        })
    })
    // Handle resize event to adjust scroll position when the window is resized
    // $(window).on('resize', function () {
    //     var targetTop = accordionButtons.offset().top - headerHeight

    //     $('html, body').scrollTop(targetTop)
    // })
})

function isElementInViewport(elem) {
    var docViewTop = $(window).scrollTop()
    var docViewBottom = docViewTop + $(window).height()
    var elemTop = $(elem).offset().top
    var elemBottom = elemTop + $(elem).height()

    return (
        (elemTop >= docViewTop && elemTop <= docViewBottom) ||
        (elemBottom >= docViewTop && elemBottom <= docViewBottom) ||
        (elemTop <= docViewTop && elemBottom >= docViewBottom)
    )
}
// nav link highlight function
function highlightNavLink() {
    var currentPosition = $(window).scrollTop()
    $('section').each(function () {
        var sectionTop = $(this).offset().top
        var headerHeight = $('header').height()
        var sectionBottom = sectionTop + $(this).outerHeight()
        var sectionId = $(this).attr('id')
        var navLink = $('nav a.nav-link[href="#' + sectionId + '"]')

        if (
            currentPosition >= sectionTop - headerHeight &&
            currentPosition < sectionBottom
        ) {
            navLink.addClass('active')
        } else {
            navLink.removeClass('active')
        }
    })
}










