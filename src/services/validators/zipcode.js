import axios from 'axios';

const validateZipcode = (zipcode) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}`)
            .then((result) => {
                const locationData = {};
                if (result.data.results.length && result.data.results[0] && result.data.results[0]['address_components'].length) {
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
export default validateZipcode;