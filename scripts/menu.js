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