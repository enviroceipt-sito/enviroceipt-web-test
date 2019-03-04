/**
 * Move to point on webapge
 */
function scrollToSection(elementid) {
  document.getElementById(elementid).scrollIntoView({behavior: "smooth"});
}