/*--------------------------------------------------------------
## Very lightweight parallax scrolling
--------------------------------------------------------------*/
(function() {
  var supportedTransform = getSupportedTransform(); //or just assign 'transform' if you don't want to support it cross-browser
  if( !supportedTransform )
    return false; //transformations are not supported
  
  var $parallax, vh, defaultSpeed = .5;
  $(document).ready(function() {
    $parallax = $('.parallax');
    vh = $(window).height();

    // trigger reset
    $(window).scroll(); 

    // add parallax settings to elements using 
    $parallax.parallaxInit();
  });

  $(window).resize(function() {
    vh = $(window).height();

    $parallax.parallaxInit();
  });


  $.fn.parallaxInit = function() { 
    this.each(function() {
      var height = $(this).outerHeight(),
          extraHeight = parseFloat( $(this).data('speed') ) || defaultSpeed;
      
      
      /* if( extraHeight < 1 )
        extraHeight = 1 - extraHeight; */
      
      height += $(this).outerHeight() * extraHeight;
      
      //if( $(this).outerHeight() > vh )
        height = vh + $(this).outerHeight() * ( 1 - extraHeight);
      height *+ .1;
      $(this).find('.parallax-bg')
        .css('height', height);
    });

  }



  //call function on scroll
  $(window).scroll(function() {
    window.requestAnimationFrame(parallax);
  });

  var parallaxElements = document.getElementsByClassName('parallax'),
    parallaxLength = parallaxElements.length;

  var el, scrollTop, elOffset, i;

  function parallax(){

    for( i = 0; i < parallaxLength; i++ ) {

      el = parallaxElements[i];
      elOffset = el.getBoundingClientRect().top;

      // only change if the element is in viewport - save resources
      if( elOffset < vh && elOffset + el.offsetHeight > 0) {
        var setSpeed = parseFloat(el.getAttribute('data-speed')) || defaultSpeed;
        var speed = -( elOffset * setSpeed )

        el.getElementsByClassName('parallax-bg')[0].style[supportedTransform] = 'translate(0, ' + speed + 'px)';


      }

    }

  }
})();







/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 */

if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}

/**
 * Returns the supported transform for your browser.
 */
function getSupportedTransform() {
    var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    var div = document.createElement('div');
    for(var i = 0; i < prefixes.length; i++) {
        if(div && div.style[prefixes[i]] !== undefined) {
            return prefixes[i];
        }
    }
    return false;
}