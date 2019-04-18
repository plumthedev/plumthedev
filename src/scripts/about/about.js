export default class About{

    constructor(aboutElement){
        this.aboutElement = aboutElement;
        this.progress = 0;
        this.windowScrollY = window.scrollY;
        this.aboutElementOffset = this.aboutElement.offsetTop;
        this.aboutElementHeight = this.aboutElement.offsetHeight;
        this.lastWindowScroll = (this.aboutElementOffset - this.aboutElementHeight / 3);

        this.eventer = this.eventer.call(this);
    }

    eventer(){
        window.addEventListener('scroll', this.moveBackground.bind(this))
    }

    moveBackground(){
        if(this.isInRange()){
            this.calcProgress();
            let backgroundPositionPercent = this.getBackgroundPositionPercent();
            
            this.aboutElement.style.backgroundPositionY = `${backgroundPositionPercent}%`;
        }

    }

    isInRange(){
        this.windowScrollY = window.scrollY;
        this.aboutElementOffset = this.aboutElement.offsetTop;
        this.aboutElementHeight = this.aboutElement.offsetHeight;

        return (this.windowScrollY > (this.aboutElementOffset - this.aboutElementHeight / 3) && this.windowScrollY < (this.aboutElementOffset + this.aboutElementHeight))
    }

    calcProgress(){
        const start = this.aboutElementOffset - (this.aboutElementHeight / 3);
        const actual = this.windowScrollY - start;
        const end = this.aboutElementOffset + this.aboutElementHeight / 3;

        this.progress = Math.round((actual / end) * 100);
        if(this.progress < 0) this.progress = 0;
        if(this.progress > 100) this.progress = 100;
    }

    getBackgroundPositionPercent(){
        return ((-150 + (this.progress * 5 )) > 100)? 100 : (-150 + (this.progress * 5 ));
    }
}