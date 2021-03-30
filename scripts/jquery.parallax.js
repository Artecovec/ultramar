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