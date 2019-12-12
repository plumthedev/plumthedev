/**
 * Shows navigation and add keyboard shortcuts to easy close it.
 *
 * Created with plumming love to code.
 *
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@plumthedev.com>
 */

import $ from 'jquery';

export default class Nav {
    constructor() {
        this.page = $(document.body);
        this.hamburgerButton = $('#nav-hamburger');
        this.navMenu = $('#nav-menu');
        this.isShowed = false;
    }

    show() {
        this.navMenu.addClass('nav__menu--show');
        this.hamburgerButton.addClass('nav__hamburger--close');
        this.page.css('overflow', 'hidden');
    }

    hide() {
        this.navMenu.removeClass('nav__menu--show');
        this.hamburgerButton.removeClass('nav__hamburger--close');
        this.page.css('overflow', 'auto');
    }

    toggle() {
        if (this.isShowed) {
            this.hide();
        } else {
            this.show();
        }

        this.isShowed = !this.isShowed;
    }

    addKeyShortcuts() {
        $(document)
            .keyup((event) => {
                const {
                    keyCode,
                } = event;

                // hide on esc
                if (keyCode === 27 && this.isShowed) {
                    this.hide();
                }
            });
    }

    canInit() {
        return this.hamburgerButton.length;
    }


    init() {
        this.addKeyShortcuts();

        this.hamburgerButton.click(() => {
            this.toggle();
        });

        $(document)
            .on('smoothScrollStart', () => {
                if (this.isShowed) {
                    this.hide();
                }
            });
    }
}
