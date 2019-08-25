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
        this.section = $('#skills');
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
        return this.section.find('.skills__list-item');
    }

    pushSingleSkill(singleSkill) {
        this.singleSkills.push(singleSkill);
    }

    init() {
        this.collectAllSkills();

        this.singleSkills.forEach((singleSkill) => {
            singleSkill.init();
        });
    }
}
