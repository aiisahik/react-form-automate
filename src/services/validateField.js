// for 
//      a given value, 
//      a set of validations to apply 
//      a mapping of validation type to validator functions
// return an object with: 
//      the original set of validations, each with a key: valid to denote validity under that validation 
//      any additional form data necessary 
//      a boolean value 'valid' denoting if all validation rules had passed 

const validateField = (val, validations, validators) => {
    const validationPromises = Object.keys(validations).map((type) => {
        const validatorFunction = validators[type];
        if (typeof validatorFunction === 'function'){
            return validatorFunction(val, validations[type]);
        } else {
            return Promise.resolve({
                type: type,
                valid: false,
            });
        }
    });
    return new Promise((resolve, reject) => {
        Promise.all(validationPromises).then(values => {
            const newValidations = values.reduce((reducedValidations, validation) => {
                if (validation) {
                    return Object.assign(reducedValidations, {
                        [validation.type]: Object.assign(reducedValidations[validation.type],
                            { valid: validation.valid }
                        )
                    });
                } else {
                    return reducedValidations;
                }
            }, validations);
            const newFormData = values.reduce((reducedFormData, validation) => {
                if (validation && validation.formData) {
                    return Object.assign(reducedFormData, validation.formData)
                } else {
                    return reducedFormData;
                }
            }, {});
            resolve({
                validations: newValidations,
                formData: newFormData,
                valid: Object.values(newValidations).every(x => x.valid !== false)
            });
        }).catch(reason => {
            console.log('error', reason);
            reject(false);
        });
    });
};

export default validateField;
