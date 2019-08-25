/**
 * Smooth scroll with start evemt.
 * Start event helps close menu on link click.
 *
 * Created with plumming love to code.
 *
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@plumthedev.com>
 */

import $ from 'jquery';

export default class SmoothScroll {
    static getAllHashesLinks() {
        return $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');
    }

    static scroll() {
        const hashesLinks = SmoothScroll.getAllHashesLinks();

        hashesLinks.click((event) => {
            const clickedLink = event.currentTarget;

            if (SmoothScroll.validateClickedLink(clickedLink)) {
                const scrollTarget = this.getScrollTarget(clickedLink);

                if (SmoothScroll.isValidScrollTarget(scrollTarget)) {
                    event.preventDefault();
                    SmoothScroll.setLocationHash(clickedLink);
                    SmoothScroll.animateScroll(scrollTarget);
                    SmoothScroll.triggerStartEvent();
                }
            }
        });
    }

    static triggerStartEvent() {
        $(document).trigger('smoothScrollStart');
    }

    static validateClickedLink(clickedLink) {
        const isValidPathName = SmoothScroll.validatePathname(clickedLink);
        const isValidHostname = SmoothScroll.validateHostname(clickedLink);

        return (isValidPathName && isValidHostname);
    }

    static validatePathname(link) {
        return (document.location.pathname.replace(/^\//, '') === link.pathname.replace(/^\//, ''));
    }

    static validateHostname(link) {
        return (document.location.hostname === link.hostname);
    }

    static getScrollTarget(link) {
        const scrollTarget = $(link.hash);

        return SmoothScroll.isValidScrollTarget(scrollTarget) ? scrollTarget : $(`[name=${link.hash.slice(1)}]`);
    }

    static isValidScrollTarget(scrollTarget) {
        return scrollTarget.length;
    }

    static setLocationHash(link) {
        const {
            hash,
        } = link;

        window.history.pushState({}, '', hash);
    }

    static animateScroll(scrollTarget) {
        $('html, body').animate({
            scrollTop: SmoothScroll.getScrollTargetTopOffset(scrollTarget),
        }, 1000);
    }

    static getScrollTargetTopOffset(target) {
        return target.offset().top;
    }
}
