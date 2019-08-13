import $ from 'jquery';

export default class Nav {
    constructor() {
        this.page = $(document.body);
        this.hamburgerButton = $('#nav-hamburger');
        this.navMenu = $('#nav-menu');
        this.isNavShowed = false;
    }

    show() {
        this.isNavShowed = true;

        this.slideInNavMenu();
        this.processHamburgerToClose();
        this.blockPageScroll();
    }

    hide() {
        this.isNavShowed = false;

        this.slideOutNavMenu();
        this.processCloseToHamburger();
        this.unblockPageScroll();
    }

    toggle() {
        if (this.isNavShowed) {
            this.hide();
        } else {
            this.show();
        }
    }

    init() {
        this.keyboardShortcuts();

        this.hamburgerButton.click(() => {
            this.toggle();
        });

        $(document).on('smoothScrollStart', () => {
            if (this.isNavShowed) {
                this.hide();
            }
        });
    }

    keyboardShortcuts() {
        $(document).keyup((event) => {
            const {
                keyCode,
            } = event;

            if (keyCode === 27 && this.isNavShowed) {
                this.hide();
            }
        });
    }

    slideInNavMenu() {
        this.navMenu.addClass('nav__menu--show');
    }

    slideOutNavMenu() {
        this.navMenu.removeClass('nav__menu--show');
    }

    processHamburgerToClose() {
        this.hamburgerButton.addClass('nav__hamburger--close');
    }

    processCloseToHamburger() {
        this.hamburgerButton.removeClass('nav__hamburger--close');
    }

    blockPageScroll() {
        this.page.css('overflow', 'hidden');
    }

    unblockPageScroll() {
        this.page.css('overflow', 'auto');
    }
}
