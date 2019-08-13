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
        return (window.location.href.includes('/pl')) ? 'pl' : 'en';
    }
}
