/* global ga */

'use strict';

(function () {

  var isInternalLink = /^#/;
  var links = document.getElementsByTagName('a');

  var trackLinkClick = function trackLinkClick (event) {
    if (typeof ga === 'function') {
      var href = event.target && event.target.getAttribute('href') || 'unknown';

      if (isInternalLink.test(href)) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'link',
          eventAction: 'click',
          eventLabel: 'Internal link clicked',
          eventValue: href
        });
      } else {
        ga('send', {
          hitType: 'event',
          eventCategory: 'link',
          eventAction: 'click',
          eventLabel: 'External link clicked',
          eventValue: href
        });
      }
    }
  };

  for (var i = 0; i < links.length; i += 1) {
    links[i].addEventListener('click', trackLinkClick);
  }

})();
