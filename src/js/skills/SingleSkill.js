/**
 * Makes skill smooth slide in/out with user scroll.
 *
 * Created with plumming love to code.
 *
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@plumthedev.com>
 */

import $ from 'jquery';

export default class SingleSkill {
    constructor(skillElement) {
        this.skillElement = $(skillElement);
        this.windowScroll = window.scrollY;
        this.skillElementOffset = this.skillElement.offset();
        this.skillElementHeight = this.skillElement.outerHeight();
        this.scrollProgress = 0;
        this.translateValue = 0;
    }

    static isMediumUpScreen() {
        return window.innerWidth > 768;
    }

    calibrateWindowScroll() {
        this.windowScroll = window.scrollY;
    }

    inShowZone() {
        this.calibrateWindowScroll();
        const showZone = this.calcShowZonePosition();

        return (this.windowScroll > showZone);
    }

    calcShowZonePosition() {
        return (this.skillElementOffset.top - (window.innerHeight - this.skillElementHeight));
    }

    influenceSmoothly() {
        this.moveWithTranslate();
        this.addAnimations();
    }

    moveWithTranslate() {
        if (this.inShowZone() && SingleSkill.isMediumUpScreen()) {
            this.calcScrollProgress();
            this.calcTranslateValue();
            this.setSkillTranslate();
        }
    }

    addAnimations() {
        if (this.canStartAnimations()) {
            this.skillElement.removeClass('skill-anim-hide');
            this.skillElement.addClass('skill-anim-show');
        }
    }

    setSkillTranslate() {
        const transformCssValue = `translateX(${this.translateValue}px)`;
        this.skillElement.css('transform', transformCssValue);
    }

    calcCurrentPointOfView() {
        return this.windowScroll + (window.innerHeight - window.innerHeight * 0.15);
    }

    calcStartAnimationPoint() {
        return this.skillElementOffset.top + (window.innerHeight + this.skillElementHeight);
    }

    canStartAnimations() {
        const currentPointOfView = this.calcCurrentPointOfView();
        const startAnimationPoint = this.calcStartAnimationPoint();
        const isBeforeSkillOffsetTop = (currentPointOfView > this.skillElementOffset.top);
        const passedStartAnimationPoint = (currentPointOfView < startAnimationPoint);

        return (isBeforeSkillOffsetTop && passedStartAnimationPoint);
    }

    calcScrollProgress() {
        const showZonePosition = this.calcShowZonePosition();
        const stopPlacePosition = this.calcStopPlacePosition();
        const currentPosition = this.windowScroll - showZonePosition;

        const scrollProgress = Math.round((currentPosition / stopPlacePosition) * 100);
        this.setScrollProgress(scrollProgress);
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

    calcStopPlacePosition() {
        return this.skillElementOffset.top - (window.innerHeight / 2);
    }

    calcTranslateValue() {
        let translateValue = (this.scrollProgress * 4);

        if (this.isRightSided()) {
            translateValue *= -1;
        }

        this.setTranslateValue(translateValue);
    }

    setTranslateValue(translateValue) {
        switch (true) {
        case (translateValue < -40):
            this.translateValue = -40;
            break;
        case (translateValue > 40):
            this.translateValue = 40;
            break;
        default:
            this.translateValue = translateValue;
            break;
        }
    }


    isRightSided() {
        return this.skillElement.hasClass('skills__list-item--right');
    }

    init() {
        this.influenceSmoothly();

        $(document).scroll(() => {
            this.influenceSmoothly();
        });
    }
}
