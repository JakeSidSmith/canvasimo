declare function ga(event: string, options: {[i: string]: string}): void;

const MATCHES_INTERNAL_LINK = /^#/;
const LINKS = document.getElementsByTagName('a');

const trackLinkClick = (event: MouseEvent) => {
  if (typeof ga === 'function' && event.target instanceof HTMLAnchorElement) {
    const href = event.target ? event.target.getAttribute('href') : 'unknown';

    if (href === 'unknown') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'link',
        eventAction: 'click',
        eventLabel: 'Missing link clicked',
        eventValue: href,
      });
    } else if (MATCHES_INTERNAL_LINK.test(href)) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'link',
        eventAction: 'click',
        eventLabel: 'Internal link clicked',
        eventValue: href,
      });
    } else {
      ga('send', {
        hitType: 'event',
        eventCategory: 'link',
        eventAction: 'click',
        eventLabel: 'External link clicked',
        eventValue: href,
      });
    }
  }
};

for (const link of LINKS) {
  link.addEventListener('click', trackLinkClick);
}
