(function( $ ) {

    $.fn.plaxmove = function( options ) {
        options = $.extend({
            ratioH: 0.2,
            ratioV: 0.2,

            invert: false,

            wrap: $( 'html' )
        }, options || {});

        return this.each(function() {
            var wrap = options.wrap,
                layer = $( this ),

                y0 = layer.position().top - 50,
                x0 = layer.position().left,

                center,
                wrap_center,

                last_event,

                __position;

            if ( options.invert ) {
                __position = function ( event ) {
                    return {
                        top:  y0 + center.y + ( event.pageY - wrap_center.y ) * options.ratioV,
                        left: x0 + center.x + ( event.pageX - wrap_center.x ) * options.ratioH
                    }
                }
            } else {
                __position = function ( event ) {
                    return {
                        top:  y0 + center.y - ( event.pageY - wrap_center.y ) * options.ratioV,
                        left: x0 + center.x - ( event.pageX - wrap_center.x ) * options.ratioH
                    }
                }
            }

            __correct_center();

            last_event = {
                pageX: wrap_center.x,
                pageY: wrap_center.y
            }

            $( layer ).css( __position( last_event ) );

            wrap.on( 'mousemove', function( event ) {
                $( layer ).css( __position( event ) );
            })

            $( window ).resize(function( event ) {
                __correct_center();
            });

            function __correct_center () {
                wrap_center = {
                    x: wrap.width() / 2,
                    y: wrap.height() / 2
                };

                center = {
                    x: wrap_center.x - layer.width() / 2,
                    y: wrap_center.y - layer.height() / 2
                };
            }
        });
    };

})( jQuery );

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

$(function () {
    var audio =  $( 'audio'),
        mute_button = $('.sound-button');

    value_on();

    mute_button.click(function () {
        if ( mute_button.hasClass( 'sound-button__on' ) ) {
            value_on();
            mute_button.removeClass( 'sound-button__on' );
        } else {
            mute();
            mute_button.addClass( 'sound-button__on' );
        }
    });

    function mute() {
        audio.each( function () {
            this.volume = 0;
        });
    }

    function value_on() {
        audio.each( function () {
            this.volume = 0.1;
        });
    }
});

$(function () {
    var logo                  = $('#logo'),
        menu_buttons          = $( '.main-menu_button' ),
        crystals              = $( '.parallax-nav_single_crystal' ),

        flash_interval,
        flash_current_index = 0,
        flash_last_index    = -1;

    submenu_selector        = '.main-submenu',
        menu_link_selector      = '.main-menu_link',
        context_menu_selector   = '.context-menu',
        crystal_normal_selector = '.parallax-nav_single_crystal_normal',
        crystal_bright_selector = '.parallax-nav_single_crystal_bright';

    $('.window-wrap').hide();
    $('#bird').hide();

    $( '.context-menu, .parallax-nav_single_crystal_bright' ).hide();

    $( '#crystal-group-0' ).plaxmove( { ratioH: 0.03,  ratioV: 0.03  } );
    $( '#crystal-group-1' ).plaxmove( { ratioH: 0.12,  ratioV: 0.12  } );
    $( '#crystal-group-2' ).plaxmove( { ratioH: 0.08,  ratioV: 0.08  } );
    $( '#crystal-group-3' ).plaxmove( { ratioH: 0.1,   ratioV: 0.1   } );
    $( '#crystal-group-4' ).plaxmove( { ratioH: 0.07,  ratioV: 0.07  } );
    $( '#crystal-group-5' ).plaxmove( { ratioH: 0.06,  ratioV: 0.06  } );
    $( '#crystal-group-6' ).plaxmove( { ratioH: 0.045, ratioV: 0.045 } );

    $( '#crystal-about'    ).plaxmove( { ratioH: 0.051,  ratioV: 0.051 } );
    $( '#crystal-terminal' ).plaxmove( { ratioH: 0.03,   ratioV: 0.03  } );
    $( '#crystal-services'    ).plaxmove( { ratioH: 0.033,  ratioV: 0.033 } );
    $( '#crystal-contacts' ).plaxmove( { ratioH: 0.042,  ratioV: 0.042 } );
    $( '#crystal-1' ).plaxmove( { ratioH: 0.02,   ratioV: 0.02  } );
    $( '#crystal-2'    ).plaxmove( { ratioH: 0.038,  ratioV: 0.038 } );

    flashing();

    if ( location.hash ) {
        open_window( location.hash, true );
    }

    menu_buttons.click(function( event ) {
        var submenu = $( submenu_selector, this ),
            last_submenu = $( submenu_selector + ':visible' );

        if ( submenu.length && $( event.target ).is( menu_link_selector ) ) {
            event.preventDefault();
            return false;
        }

        if ( !submenu.is( last_submenu ) ) {
            close( last_submenu );
            open( submenu );
        }

    }).hover(function( event ) {
            var submenu = $( submenu_selector, this ),
                crystal_index = $( this ).index();

            open( submenu );

            flash_current_index = crystal_index;
            flash_last_index = crystal_index - 1;
            stop_flashing();
        }, function( event ) {
            var submenu = $( submenu_selector, this ),
                crystal_index = $( this ).index();

            close( submenu );

            flash_current_index = crystal_index + 1;
            flash_last_index = crystal_index;
            flashing();
        });

    $( window ).click( function ( event ) {
        var target = $( event.target ),
            submenu = $( submenu_selector + ':visible' );

        if ( !target.is( menu_link_selector ) ) {
            close( submenu );
        }
    });

    $( '.context-menu-link, .main-menu_link, .main-submenu_link, .parallax-nav_single_crystal__link' ).click(function ( event ) {
        var hash = $( this ).attr( 'href' );

        event.preventDefault();

        open_window( hash );
    });

    $( '.window-close-button' ).click(function ( event ) {
        event.preventDefault();

        close_window();
    });

    crystals.hover(function () {
        var crystal_index = $( this ).index();

        flash_current_index = crystal_index;
        flash_last_index = crystal_index - 1;

        stop_flashing();
        $( context_menu_selector, this ).stop( true, true ).fadeIn( 400 );
    }, function () {
        var crystal_index = $( this ).index();

        flash_current_index = crystal_index + 1;
        flash_last_index = crystal_index;

        flashing();
        $( context_menu_selector, this ).stop( true, true ).fadeOut( 400 );
    });

    logo.click(function () {
        close_window();
    });

    function open( menu ) {
        if ( !isOpen( menu ) ) {
            menu.data( 'opened', true );
            menu.stop( true, true ).fadeIn( 400 );
        }
    }

    function close( menu ) {
        menu.stop( true, true ).fadeOut( 400 );
        menu.removeData( 'opened' );
    }

    function isOpen( menu ) {
        return menu.data( 'opened' );
    }

    function open_window ( name, reload ) {
        var window = $( name );

        if ( !reload && name === location.hash ) {
            return;
        }

        location.hash = name;

        if ( $('#crystal-audio') && $('#crystal-audio')[0] && $('#crystal-audio')[0].play ) {
            $('#crystal-audio')[0].play();
        }

        $('.main-menu_link__selected').removeClass('main-menu_link__selected');

        if ( '#to-containers' === name || '#prepacking' === name || '#liquid' === name ) {
            name = '#terminal';
        }

        $(name + '-menu').addClass('main-menu_link__selected');

        stop_flashing();
        $('.parallax-nav_single_crystal_bright').stop(true, true).fadeOut(0);
        $('.context-menu').stop(true, true).fadeOut(400);
        $('.parallax-nav').stop(true, true).fadeOut(400);

        var visible = $( '.window-wrap').not(window);

        if ( window.height() > $( 'html' ).height()  ) {
            $('.foot').hide();
        }

        visible.css({ position: 'relative' });
        window.css({ position: 'absolute' });


        visible.stop(true, true).fadeOut(400, function () {
            visible.css({ position: 'absolute' });
        });
        window.stop(true, true).fadeIn(400, function () {
            window.css({ position: 'relative' });
            $('.foot').show();
        });
        $('#bird').stop(true, true).fadeIn(400);
        logo.css({cursor: 'pointer'});
    }

    function close_window () {
        location.hash = '';
        $('.main-menu_link__selected').removeClass('main-menu_link__selected');
        flashing();
        $('.parallax-nav').stop(true, true).fadeIn(400);
        $('.parallax-nav_single_crystal_bright').stop(true, true).fadeOut(0);
        $('.window-wrap').css({ position: 'absolute' }).stop(true, true).fadeOut(400);
        $('#bird').stop(true, true).fadeOut(400);
        logo.css({cursor: 'default'});
    }

    function flashing () {
        flash();

        flash_interval = setInterval( function () {
            flash();
        }, 2000 );
    }

    function stop_flashing () {
        for ( var i = 0; i < flash_current_index; ++i ) {
            snuff_out( crystals.eq( i ) );
        }
        for ( var i = flash_current_index + 1; i < crystals.length; ++i ) {
            snuff_out( crystals.eq( i ) );
        }

        highlight( crystals.eq( flash_current_index ) );
        clearInterval( flash_interval );
    }

    function flash () {
        snuff_out( crystals.eq( flash_last_index ) );
        highlight( crystals.eq( flash_current_index ) );

        ++flash_last_index;
        ++flash_current_index;

        if ( crystals.length === flash_current_index ) {
            flash_current_index = 0;
        }
        if ( crystals.length - 1 === flash_last_index ) {
            flash_last_index = -1;
        }
    }

    function snuff_out( crystal ) {
        //$( crystal_normal_selector, crystal ).stop( true, true ).fadeIn( 200 );

        $( crystal_bright_selector, crystal ).stop( true, true ).fadeOut( 400 );
    }

    function highlight( crystal ) {
        //$( crystal_normal_selector, crystal ).stop( true, true ).fadeOut( 200 );

        $( crystal_bright_selector, crystal ).stop( true, true ).fadeIn( 400 );
    }
});

$(function () {
    $('.poster' ).photo();
});