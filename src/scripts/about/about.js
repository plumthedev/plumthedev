/**
 * Class about is responsible for manage anims in about section 
 * 
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@kacperpruszynski.pl>
 * @class About
 * @param {HTMLElement} aboutElement Element of section about
 */
export default class About{

    constructor(aboutElement){
        this.aboutElement = aboutElement;
        this.progress = 0;
        this.windowScrollY = window.scrollY;
        this.aboutElementOffset = this.aboutElement.offsetTop;
        this.aboutElementHeight = this.aboutElement.offsetHeight;
        this.lastWindowScroll = (this.aboutElementOffset - this.aboutElementHeight / 3);
        this.backgroundPositionPercent = 50;

        window.addEventListener('scroll', this.moveBackground.bind(this))
        document.getElementById('scroll-to-about').addEventListener('click', this.scrollToSection.bind(this));
    }

    /**
     * Check is user in range of about section, calc how far and move backgorund of about
     * 
     */
    moveBackground(){
        if(this.isInRange()){
            this.calcProgress();
            this.getBackgroundPositionPercent();
            
            this.aboutElement.style.backgroundPositionY = `${this.backgroundPositionPercent}%`;
        }

    }

    /**
     * Check is user in range of about section
     * 
     * @return {Boolean} Is user in range 
     */
    isInRange(){
        this.windowScrollY = window.scrollY;

        return (this.windowScrollY > (this.aboutElementOffset - this.aboutElementHeight / 3) && this.windowScrollY < (this.aboutElementOffset + this.aboutElementHeight))
    }

    /**
     * Calc progress of user scroll
     */
    calcProgress(){
        const start = this.aboutElementOffset - (this.aboutElementHeight / 3);
        const actual = this.windowScrollY - start;
        const end = this.aboutElementOffset + this.aboutElementHeight / 3;

        this.progress = Math.round((actual / end) * 100);
        if(this.progress < 0) this.progress = 0;
        if(this.progress > 100) this.progress = 100;
    }

    scrollToSection(){
        this.windowScrollY = window.scrollY;
        history.pushState(null,null,'#about');

        window.scroll({
            top: this.aboutElementOffset, 
            left: 0, 
            behavior: 'smooth' 
          });
    }

    /**
     * Calc percent of background position
     */
    getBackgroundPositionPercent(){
        let calc = -150 + (this.progress * 5 );

        if(calc < -200) calc = -200;
        if(calc > 100) calc = 100;

        this.backgroundPositionPercent = calc;
    }
}