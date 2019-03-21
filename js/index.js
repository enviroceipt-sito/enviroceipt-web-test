var $logo = $("#index-logo");
var $heading = $("#index-heading");
var $button = $ (".index-button");

var $anims = $('.animated');

$(window).on('scroll resize', function() {
  var page_offset = window.pageYOffset - 100;

  var window_top = window.scrollY;
  var window_bottom = window_top + window.outerHeight;

  if (window_top < window.outerHeight) {
    if (window.outerWidth > 800) {
      var logo_offset = (page_offset * page_offset / 1200) - page_offset;
      var width_offset = (page_offset * page_offset / 50) - page_offset;

      $logo.css( "--offset-top", -logo_offset + "px" );

      var new_width = window.outerWidth * 0.5;

      new_width = new_width > 800 ? 800 : new_width;
      new_width -= width_offset * 0.06;

      if (new_width < 50) new_width = 50;

      $logo.css( "--width", new_width + "px" );
    } else {
      $logo.css( "--width", window.outerWidth * 0.8 + "px" );
    }
  }

  // Show scroll down button if not at top of page:
  if (window.pageYOffset > 10) {
    $button.addClass("disabled");
    $button.css("--opacity", "0");

    $heading.css("--opacity", "0");
    $heading.css( "--offset-top", "10px");
  } else {
    $button.removeClass("disabled");
    $button.css("--opacity", "1");

    $heading.css("--opacity", "1");
    $heading.css( "--offset-top", "0");
  }

  $.each($anims, function() {
    var $el = $(this);

    if (isRevealed($el, window_top, window_bottom)) {
      $el.addClass('revealed');
    } else {
      $el.removeClass('revealed');
    }
  });
});

/**
 * Check if element is revealed in current window view
 */
function isRevealed($el, window_top, window_bottom) {
  var el_top = $el.offset().top;
  var el_bottom = el_top + $el.outerHeight();

  return ((el_bottom < window_bottom) && (el_top > window_top - 100));
}

/**
 * Add click handler for all # anchor links
 */
$('a[href^="#"]').on('click', function(event) {
  var target = $(this.getAttribute('href'));

  if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: target.offset().top
      }, 1100);
  }

});

// Trigger scroll on load:
$(window).trigger('scroll');