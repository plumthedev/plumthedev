export default class About {
    constructor(aboutElement) {
        this.aboutElement = aboutElement;
        this.progress = 0;
        this.windowScrollY = window.scrollY;
        this.aboutElementOffset = this.aboutElement.offsetTop;
        this.aboutElementHeight = this.aboutElement.offsetHeight;
        this.lastWindowScroll = (this.aboutElementOffset - this.aboutElementHeight / 3);
        this.backgroundPositionPercent = 50;

        this.eventer.call(this);
    }

    eventer() {
        window.addEventListener('scroll', this.moveBackground.bind(this));
    }

    moveBackground() {
        if (this.isInRange()) {
            this.calcProgress();
            this.getBackgroundPositionPercent();

            this.aboutElement.style.backgroundPositionY = `${this.backgroundPositionPercent}%`;
        }
    }

    isInRange() {
        this.windowScrollY = window.scrollY;

        return (this.windowScrollY > (this.aboutElementOffset - this.aboutElementHeight / 3) && this.windowScrollY < (this.aboutElementOffset + this.aboutElementHeight));
    }

    calcProgress() {
        const start = this.aboutElementOffset - (this.aboutElementHeight / 3);
        const actual = this.windowScrollY - start;
        const end = this.aboutElementOffset + this.aboutElementHeight / 3;

        this.progress = Math.round((actual / end) * 100);
        if (this.progress < 0) this.progress = 0;
        if (this.progress > 100) this.progress = 100;
    }

    getBackgroundPositionPercent() {
        let calc = -150 + (this.progress * 5);

        if (calc < -200) calc = -200;
        if (calc > 100) calc = 100;

        this.backgroundPositionPercent = calc;
    }
}
