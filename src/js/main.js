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

import Nav from './nav/Nav';
import About from './about/About';
import Skills from './skills/Skills';
import SmoothScroll from './helpers/SmoothScroll';
import FormValidation from './form/FormValidation';

window.jQuery = $;

class Plum {
    constructor() {
        this.components = {
            nav: new Nav(),
            about: new About(),
            skills: new Skills(),
        };
        this.smoothScroll = SmoothScroll;
        this.formValidation = FormValidation;
    }

    initComponents() {
        const compoents = Object.values(this.components);

        compoents.forEach((compoent) => {
            compoent.init();
        });
    }

    runHelpers() {
        this.smoothScroll.scroll();
        this.formValidation.validate();
    }

    init() {
        this.initComponents();
        this.runHelpers();
    }
}

// it's time to plumming
$(document).ready(() => {
    const plum = new Plum();
    plum.init();
});
