import React from 'react';

const signupForm = [
    {
        type: 'input',
        fieldName: 'username',
        label: 'Email',
        validations: {
            'email': { message: 'Please provide a real email address' },
            'required': { message: 'Email is required' },
            'minlength': { message: 'Email needs to be at least 10 characters', minlength: 10 },
            'maxlength': { message: 'Email can be a max of 99 characters', maxlength: 99 },
        },
    },
    {
        type: 'input',
        fieldName: 'companyName',
        label: 'Company Name',
        validations: {
            'required': { message: 'Company is required' },
        },
    },
    {
        type: 'input',
        fieldName: 'zipcode',
        label: 'Zip Code',
        validations: {
            'required': { message: 'Zip code is required' },
            'zipcode': { message: 'Please enter a valid US / Canada zipcode' },
        },
    },
    {
        type: 'select',
        fieldName: 'business_size',
        label: 'Business Size',
        defaultValue: 'small',
        options: [
            { value: '', label: '' },
            { value: 'small', label: 'Small (fewer than 25 employees)' },
            { value: 'medium', label: 'Medium (25 to 100 employees)' },
            { value: 'large', label: 'Large (more than 100 employees)' },
        ],
        validations: {
            'required': { message: 'Business Size is required' },
        },
    },
    {
        type: 'checkbox',
        fieldName: 'tos',
        html: 'I accept the Kinnek <a href="/terms/" target="_blank"> Terms of Use</a > and <a href="/privacy/" target="_blank"> Privacy Policy</a>',
        validations: {
            'required': { message: 'Acceptance of the terms is required' },
        },
    },
];

export default signupForm;