export const ErrorMessages = {
    user: {
        username: [
            { type: 'required', message: 'Don\' be shy ! ' },
            { type: 'minlength', message: 'must be at least 5 characters long' },
            { type: 'maxlength', message: 'cannot be more than 20 characters long' },
            { type: 'pattern', message: 'must contain only numbers and letters ( _ allowed)' }
        ],
        email: [
            { type: 'required', message: 'We may need to reach you!' },
            { type: 'pattern', message: 'Try something like: example@email.com' }
        ],
        confirm: [
            { type: 'pattern', message: 'Passwords mismatch ! Try again' },
            { type: 'required', message: 'Please confirm your password' }
        ],
        birthDate: [ { type: 'required', message: 'You must be adult to register !' } ],
        password: [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'must be at least 6 characters long' },
            { type: 'maxlength', message: 'must be 25 characters max' },
            { type: 'pattern', message: 'must contain at least one uppercase, one lowercase, and one number' }
        ],
        terms: [ { type: 'pattern', message: 'You must accept terms and conditions' } ]
    },
    association: {
        name: [
            { type: 'required', message: 'Don\' be shy ! ' },
            { type: 'minlength', message: 'must be at least 6 characters long' },
            { type: 'maxlength', message: 'cannot be more than 20 characters long' },
            { type: 'pattern', message: 'must contain only numbers and letters ( _ allowed)' }
        ],
        code: [
            { type: 'required', message: 'Don\' be shy ! ' },
            { type: 'minlength', message: 'must be at least 2 characters long' },
            { type: 'maxlength', message: 'cannot be more than 5 characters long' },
            { type: 'pattern', message: 'must contain only letters' }
        ],
        description: [
            { type: 'maxlength', message: 'cannot be more than 255 characters long' },
            { type: 'pattern', message: 'must contain only numbers and letters ( _ allowed)' }
        ],
        link: [ { type: 'pattern', message: 'This is not an url' } ],
    },
    jar: {
        title: [
            { type: 'required', message: 'You need to add a title' },
            { type: 'maxlength', message: 'must be 20 characters max' },
            { type: 'minlength', message: 'must be at least 5 characters long' }
        ],
        description: [
            { type: 'pattern', message: 'This description contains invalid characters' },
            { type: 'maxlength', message: 'must be 144 characters max' }
        ],
        maxAmount: [
            { type: 'required', message: 'must be defined' },
            { type: 'min', message: 'must be at least 10' },
            { type: 'max', message: 'can\'t be more than 100' }
        ],
        referenceCost: [
            { type: 'required', message: 'must be defined' },
            { type: 'min', message: 'must be at least 0.10' },
            { type: 'max', message: 'can\'t be more than 2' }
        ],
        addressee: [ { type: 'required', message: 'You must choose an addressee' } ],
        closingDate: [
            { type: 'required', message: 'You must choose a closing date !' },
            { type: 'matDatepickerMin', message: 'too soon' },
            { type: 'matDatepickerMax', message: 'too far away' }
        ]
    },
    pass_required: 'Your current password is required !'
    };

export const HttpErrorMessages = {
    invalidCredentials: 'These credentials doesn\'t seems right ...  please check them again ! ',
    unreachableApi: 'Seems like server is down, try again later ... ',
    blackMagic: 'Black Magic happened, sorry ! 🎩'
    };
