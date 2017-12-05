import validateZipcode from './zipcode';

test('a valid zipcode passes validation', () => {
    expect.assertions(1);
    return expect(validateZipcode('11201')).resolves.toEqual({
        type: 'zipcode',
        valid: true,
        formData: {
            city: "Brooklyn",
            state: "NY",
            country: "US"
        }
    });
});

test('an invalid zipcode fails validation', () => {
    expect.assertions(1);
    return expect(validateZipcode('00201XXX')).resolves.toEqual({
        type: 'zipcode',
        valid: false
    });
});