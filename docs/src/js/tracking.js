'use strict';

(function () {

  var links = document.getElementsByTagName('a');

  var trackLinkClick = function trackLinkClick (event) {
    if (typeof ga === 'function') {
      var href = event.target.href || '';
      var indexOfHash = href.lastIndexOf('#');
      href = href.substring(indexOfHash);

      ga('send', {
        hitType: 'event',
        eventCategory: 'link',
        eventAction: 'click',
        eventLabel: 'Content link clicked',
        eventValue: href
      });
    }
  };

  for (var i = 0; i < links.length; i += 1) {
    links[i].addEventListener('click', trackLinkClick);
  }

})();
