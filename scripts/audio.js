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