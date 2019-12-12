/**
 * Smooth change position of background in about section.
 *
 * Created with plumming love to code.
 *
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@plumthedev.com>
 */

import $ from 'jquery';

export default class About {
    constructor() {
        this.aboutElement = $('#about');
        this.scrollProgress = 0;
        this.windowScrollY = window.scrollY;
        this.aboutElementOffset = this.aboutElement.offset();
        this.aboutElementHeight = this.aboutElement.outerHeight();
        this.backgroundPosition = 50;
    }

    swimBackground() {
        if (this.canSwim()) {
            this.calcProgress();
            this.calcBackgroundPosition();
            this.setCssBackgroundPosition();
        }
    }

    calibrateWindowScroll() {
        this.windowScrollY = window.scrollY;
    }

    setCssBackgroundPosition() {
        const backgroundPositionPercent = `${this.backgroundPosition}%`;
        this.aboutElement.css('background-position-y', backgroundPositionPercent);
    }

    calcBackgroundPosition() {
        const backgroundPostion = -150 + (this.scrollProgress * 5);
        this.setBackgroundPosition(backgroundPostion);
    }

    canSwim() {
        this.calibrateWindowScroll();

        return (this.isFutherThanStartAnimationPoint() && this.isBeforeEndAnimationPoint());
    }

    isFutherThanStartAnimationPoint() {
        return (this.windowScrollY > (this.aboutElementOffset.top - this.aboutElementHeight / 3));
    }

    isBeforeEndAnimationPoint() {
        return (this.windowScrollY < (this.aboutElementOffset.top + this.aboutElementHeight));
    }

    calcProgress() {
        const startSwimPosition = this.calcStartSwimPosition();
        const endSwimPosition = this.calcEndSwimPosition();
        const currentPostion = this.windowScrollY - startSwimPosition;

        const scrollProgress = Math.round((currentPostion / endSwimPosition) * 100);
        this.setScrollProgress(scrollProgress);
    }

    calcStartSwimPosition() {
        return this.aboutElementOffset.top - (this.aboutElementHeight / 3);
    }

    calcEndSwimPosition() {
        return this.aboutElementOffset.top + (this.aboutElementHeight / 3);
    }

    setScrollProgress(scrollProgress) {
        switch (true) {
        case (scrollProgress < 0):
            this.scrollProgress = 0;
            break;
        case (scrollProgress > 100):
            this.scrollProgress = 100;
            break;
        default:
            this.scrollProgress = scrollProgress;
            break;
        }
    }

    setBackgroundPosition(backgroundPosition) {
        switch (true) {
        case (backgroundPosition < -200):
            this.backgroundPosition = -200;
            break;
        case (backgroundPosition > 100):
            this.backgroundPosition = 100;
            break;
        default:
            this.backgroundPosition = backgroundPosition;
            break;
        }
    }

    init() {
        this.swimBackground();
        $(document)
            .scroll(() => {
                this.swimBackground();
            });
    }
}
