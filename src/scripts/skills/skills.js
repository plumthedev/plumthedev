import SingleSkill from "./skills-single";

export default class Skills{
    constructor(skillsElement){
        this.skillsElement = skillsElement;
        this.allSkillsElements = [];
        this.allSkills = [];

        this.collectAllSkills.call(this);
    }

    collectAllSkills(){
        this.allSkillsElements = this.skillsElement.querySelectorAll('.skills__list-item');

        this.allSkillsElements.forEach((skillElement) => {
            this.allSkills.push(new SingleSkill(skillElement))
        });
    }

}