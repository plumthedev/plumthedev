export default class SingleSkill{
    constructor(skillElement){
        this.skillElement = skillElement;
        this.windowScrollY = window.scrollY;
        this.win
        this.skillElementOffset = this.skillElement.offsetTop;
        this.skillElementHeight = this.skillElement.offsetHeight;
        this.progress = 0;
        this.translateYPercent = 0;

        window.addEventListener('scroll', this.move.bind(this));
        this.move.call(this);
    }

    canMove(){
        this.windowScrollY = window.scrollY;

        return (this.windowScrollY > (this.skillElementOffset - (window.innerHeight - this.skillElementHeight)))
    }

    move(){
        if(this.canMove() && window.innerWidth > 768){
            this.calcProgress();
            this.getTranslateYPercent();

            this.skillElement.style.transform = "translateX("+this.translateYPercent+"px)";
        }

        if(this.isVisible()){
            this.addAnimationClasses('skill-anim-hide', 'skill-anim-show');
        }
    }

    addAnimationClasses(classToRemove, classToAdd){
        if(this.skillElement.classList.contains(classToRemove)){
            this.skillElement.classList.remove(classToRemove)
        }

        if(!this.skillElement.classList.contains(classToAdd)){
            this.skillElement.classList.add(classToAdd)
        }
    }

    isVisible(){
        const actualScreenPostion = this.windowScrollY + (window.innerHeight - window.innerHeight * 0.15);

        return (actualScreenPostion > this.skillElementOffset && actualScreenPostion < this.skillElementOffset + window.innerHeight + this.skillElementHeight)
    }

    calcProgress(){
        const start = (this.skillElementOffset - (window.innerHeight - this.skillElementHeight));
        const actual = this.windowScrollY - start;
        const end = this.skillElementOffset - window.innerHeight / 2;

        this.progress = Math.round((actual / end) * 100);
        if(this.progress < 0) this.progress = 0;
        if(this.progress > 100) this.progress = 100;
    }

    getTranslateYPercent(){
        let calc = (this.progress * 4);

        if(calc <= -40) calc = -40;
        if(calc > 40) calc = 40;

        if(this.skillElement.classList.contains('skills__list-item--right')){
            calc = calc * -1;
        }
        this.translateYPercent = calc;
    }

}