/**
 * Main JavaScript bundle file. Magic happens here!
 *
 * Created with plumming love to code.
 *
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@plumthedev.com>
 */

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import SmoothScroll from './helpers/SmoothScroll';
import FormValidation from './form/FormValidation';
import About from './about/about';
import Skills from './skills/skills';
import Nav from './nav/Nav';

window.jQuery = $;

class Plum {
    constructor() {
        this.aboutNode = document.getElementById('about');
        this.about = this.getAbout();
        this.skillsNode = document.getElementById('skills');
        this.skills = this.getSkills();
        this.nav = new Nav();
        this.formValidation = FormValidation;
        this.smoothScroll = SmoothScroll;
    }

    static nodeExist(node) {
        return Boolean(document.body.contains(node));
    }

    getSkills() {
        if (Plum.nodeExist(this.skillsNode)) {
            this.skills = new Skills(this.skillsNode);
        }

        return this.skills;
    }

    getAbout() {
        if (Plum.nodeExist(this.aboutNode)) {
            this.about = new About(this.aboutNode);
        }

        return this.about;
    }

    init() {
        this.nav.init();
        this.formValidation.validate();
        this.smoothScroll.scroll();

        if (Plum.nodeExist(this.aboutNode)) {
            this.about.moveBackground();
        }
    }
}

// it's time to plumming
$(document).ready(() => {
    const plumWebsite = new Plum();
    plumWebsite.init();
});
