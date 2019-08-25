/**
 * Form validation.
 *
 * Created with plumming love to code.
 *
 * @version 1.0.0
 * @author Kacper Pruszynski <contact@plumthedev.com>
 */

import $ from 'jquery';

export default class FormValidation {
    static getValidationOptions() {
        return {
            lang: FormValidation.getLanguage(),
            errorMessageClass: 'form-error contact__form__error',
            onfocusout: false,
            onkeyup: false,
            success(label) {
                label.parent().removeClass('error');
                label.remove();
            },
        };
    }

    static validate() {
        window.jQuery.validate(FormValidation.getValidationOptions());
    }

    static getLanguage() {
        return $('html').attr('lang');
    }
}
