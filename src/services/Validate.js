import axios from 'axios';

export const validate = (val, validations) => {
    const validationPromises = Object.keys(validations).map((type) => {
        switch (type) {
            case "required":
                return Promise.resolve({
                    type: type,
                    valid: (typeof val === 'string' && val.length > 0)
                });
            case "minlength":
                if (typeof validations[type].minlength === 'number') {
                    return Promise.resolve({
                        type: type,
                        valid: val && val.length > validations[type].minlength
                    });
                } else {
                    return { valid: {} };
                }
            case "email":
                const reEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                return Promise.resolve({
                    type: type,
                    valid: reEmail.test(val)
                });
            case "phone":
                const rePhone = /[0-9\- #()]{10,}/igm;
                return Promise.resolve({
                    type: type,
                    valid: rePhone.test(val)
                });
            case "zipcode":
                return validateZipcode(val);
            default: 
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
}

const validateZipcode = (zipcode) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}`)
            .then((result) => {
                console.log("google maps api result", result);
                const locationData = {};
                if (result.data.results.length && result.data.results[0] && result.data.results[0]['address_components'].length){
                    const firstResult = result.data.results[0];
                    const addressComponents = firstResult['address_components'];
                    locationData.country = addressComponents[addressComponents.length - 1]['short_name'];
                    locationData.state = addressComponents[addressComponents.length - 2]['short_name'];
                    if (firstResult.types && firstResult.types.indexOf('postal_code') >= 0) {
                        locationData.city = firstResult['formatted_address'].split(',')[0];
                    }
                    if (locationData.country && 
                        ["CA", "US",].indexOf(locationData.country) >= 0) {
                        resolve({
                            type: 'zipcode',
                            valid: true,
                            formData: locationData
                        });
                    } else {
                        resolve({ type: 'zipcode', valid: false });
                    }
                } else {
                    resolve({ type: 'zipcode', valid: false });
                }
            }).catch((result) => {
                resolve({ type: 'zipcode', valid: false });
            });
    });
}