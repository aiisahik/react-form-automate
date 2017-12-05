import validateZipcode from './zipcode';

const validateRequired = (val, data) => {
    return Promise.resolve({
        type: "required",
        valid: (typeof val === 'string' && val.length > 0)
    });
}
const validateMinlength = (val, data) => {
    if (typeof data.minlength === 'number') {
        return Promise.resolve({
            type: 'minlength',
            valid: val && val.length >= data.minlength
        });
    } else {
        return { valid: {} };
    }
}
const validateMaxlength = (val, data) => {
    if (typeof data.maxlength === 'number') {
        return Promise.resolve({
            type: 'maxlength',
            valid: val && val.length <= data.maxlength
        });
    } else {
        return { valid: {} };
    }
}
const validateEmail = (val, data) => {
    const reEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    return Promise.resolve({
        type: 'email',
        valid: reEmail.test(val)
    });
}

const validatePhone = (val, data) => {
    const rePhone = /[0-9\- #()]{10,}/igm;
    return Promise.resolve({
        type: 'phone',
        valid: rePhone.test(val)
    });
}

const ValidatorMap = {
    'required': validateRequired,
    'minlength': validateMinlength,
    'maxlength': validateMaxlength,
    'email': validateEmail,
    'phone': validatePhone,
    'zipcode': validateZipcode,
};

export {
    validateRequired, 
    validateMinlength, 
    validateMaxlength,
    validateEmail, 
    validatePhone,
    validateZipcode,
    ValidatorMap,
};
