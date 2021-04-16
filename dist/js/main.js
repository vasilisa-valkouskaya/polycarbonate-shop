$(document).ready(function () {
    // Form submit
    $("form").submit(function (event) {
        event.preventDefault();

        if (typeof sessionStorage !== 'undefined') {
            if (sessionStorage.getItem('formSubmitted')) {
                if (!confirm('Вы уже отправили заявку, повторить?')) {
                    return false
                }
            } else {
                sessionStorage.setItem('formSubmitted', 'true')
            }
        }
        var data = $(this).serializeArray();
        data.push({
            name: "source",
            value: "Test"
        });
        data.push({
            name: "title",
            value: "Test message"
        });
        data.push({
            name: "link",
            value: location.href
        });

        // console.log(JSON.stringify(data));
        // return false;

        $.ajax({
            type: "POST",
            url: "https://skidka-tut.by/action/index.php",
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            dataType: "json",
            data: data,
        }).done(function (response) {
            alert(response.text);
        }).fail(function (error, textStatus) {
            console.log(error, textStatus);
            alert('Извините, произошла ошибка запроса. Свяжитесь с менеджером по телефону!');
        });

        // Event dispatcher for IE9+ included
        if (typeof (Event) === 'function') {
            document.dispatchEvent(new Event('app.form.send'));
        } else {
            var ev = document.createEvent('Event');
            ev.initEvent('app.form.send', false, false);
            document.dispatchEvent(ev);
        }

        //console.log(JSON.stringify(data))
        return false
    });



    //  menu anchor scroll
    $(".smoothscroll").click(function (event) {
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            $("html, body").animate({
                    scrollTop: $(hash).offset().top - 100
                },
                600
            );
        }

    });

    // links hightLight after scroll page
    $.fn.nav = function (item) {
        var point = {
            offset: 0
        };
        $.extend(point, item);
        var links = this;
        $(links).each(function (a, index) {
            var link = $(index.hash);
            var place = $(link).offset();
            $(window).scroll(function () {
                var newPoint = $(window).scrollTop() + point.offset;
                place.top < newPoint && newPoint < place.top + $(link).height() && ($(links).removeClass("active"), $(index).addClass("active"))
            })
        })
    };

    $(".js-nav-scroll").nav({
        offset: 150
    });


});


// sticky-header

window.addEventListener('scroll', function () {
    if (window.innerWidth >= 1100) {
        let header = document.querySelector('.nav-sticky');
        header.classList.toggle('show-nav', window.scrollY > 700);
    }
});

// burger menu
let btnBurger = document.querySelector('.burger-menu');
let body = document.querySelector('body');

btnBurger.addEventListener('click', function () {
    document.querySelector('.mobile-menu').classList.toggle('show-menu');
    btnBurger.classList.toggle('active-burger');
    body.classList.toggle('overflow');
});