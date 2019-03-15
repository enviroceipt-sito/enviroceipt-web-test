var $logo = $("#index-logo");
var $heading = $("#index-heading");
var $button = $ (".index-button");

var $anims = $('.animated');

$(window).on('scroll resize', function() {
  var page_offset = window.pageYOffset - 100;
  var logo_width = window.outerWidth / 2.4;

  var window_top = window.scrollY;
  var window_bottom = window_top + window.outerHeight;

  if (window_top < window.outerHeight) {
    var logo_offset = (page_offset * page_offset / 1200) - page_offset;
    var width_offset = (page_offset * page_offset / 50) - page_offset;

    $logo.css( "--offset-top", -logo_offset + "px" );
    $logo.css( "--width", (logo_width - width_offset * 0.06) + "px" );
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
      }, 1200);
  }

});

// Trigger scroll on load:
$(window).trigger('scroll');