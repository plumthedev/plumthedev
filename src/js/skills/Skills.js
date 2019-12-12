/**
 * Skills section script partial script.
 * Finds single skills elements and inits it.
 *
 * Created with plumming love to code.
 *
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@plumthedev.com>
 */

import $ from 'jquery';
import SingleSkill from './SingleSkill';

export default class Skills {
    constructor() {
        this.skillsSection = $('#skills');
        this.singleSkills = [];
    }

    collectAllSkills() {
        const singleSkillsItems = this.findSingleSkillsItems();

        singleSkillsItems.each((index, singleSkillsItem) => {
            const singleSkill = new SingleSkill(singleSkillsItem);
            this.pushSingleSkill(singleSkill);
        });
    }

    findSingleSkillsItems() {
        return this.skillsSection.find('.skills__list-item');
    }

    pushSingleSkill(singleSkill) {
        this.singleSkills.push(singleSkill);
    }

    canInit() {
        return this.skillsSection.length;
    }

    init() {
        this.collectAllSkills();

        this.singleSkills.forEach((singleSkill) => {
            singleSkill.init();
        });
    }
}
