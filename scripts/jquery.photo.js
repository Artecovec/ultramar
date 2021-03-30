(function( $ ) {

$.fn.photo = function( options ) {
    options = $.extend({

    }, options || {});

    return this.each(function() {
        var link = $( this ),
            url = link.attr( 'href' ),
            img,
            img_width,
            img_height,
            photo = $( '#photo' ),
            wrap = $( '#photo-wrap' ),
            close = $( '.photo-close-button', wrap ),
            html = $('html');

        link.click( function () {
            img = new Image();
            img.src = url;

            img.onload = function() {
                photo.css( { backgroundImage: 'url(' + url + ')' });
                img_width = Math.min(html.width() - 80, img.width);
                img_height = Math.min(html.height() - 80, img.height);

                open_photo(html, wrap, photo, img_width, img_height);
            }

            return false;
        });

        close.click(function () {
            close_photo(html, wrap, photo, img_width, img_height);
        });

        $(window).resize(function () {
            img_width = Math.min(html.width() - 80, img.width);
            img_height = Math.min(html.height() - 80, img.height);

            open_photo(html, wrap, photo, img_width, img_height);
        });
    });

    function open_photo( html, wrap, photo, img_width, img_height ) {
        var top = (html.height() - img_height) / 2,
            left = (html.width() - img_width) / 2;

        wrap.css({top: html.height() / 2, left: html.width() / 2})
            .dequeue()
            .fadeIn(400)
            .dequeue()
            .animate({top: top, left: left}, 400);
        photo.width(0).height(0)
            .dequeue()
            .animate({width: img_width, height: img_height}, 400);
    }

    function close_photo( html, wrap, photo, img_width, img_height ) {
        var top = (html.height() - img_height) / 2,
            left = (html.width() - img_width) / 2;

        photo.css({width: img_width, height: img_height})
            .dequeue()
            .animate({width: 0, height: 0}, 400);
        wrap.css({top: top, left: left})
            .dequeue()
            .animate({top: html.height() / 2, left: html.width() / 2}, 400)
            .dequeue()
            .fadeOut(400);
    }
};

})( jQuery );