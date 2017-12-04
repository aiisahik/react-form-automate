import React, { Component } from 'react';
import './App.scss';
import FormFields from './components/FormFields';
import FieldInput from './components/FieldInput';
import FieldCheckbox from './components/FieldCheckbox';

const formFieldsData = [
  { 
    type: 'input',
    render: FieldInput,
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
    render: FieldInput,
    fieldName: 'companyName',
    label: 'Company Name',
    validations: {
      'required': { message: 'Company is required' },
    },
  },
  {
    type: 'input',
    render: FieldInput,
    fieldName: 'zipcode',
    label: 'Zip Code',
    validations: {
      'required': { message: 'Zip code is required' },
      'zipcode': { message: 'Please enter a valid US / Canada zipcode' },
    },
  },
  {
    type: 'checkbox',
    render: FieldCheckbox,
    fieldName: 'tos',
    html: () => {
      return (
        <span> I accept the Kinnek < a href = "/terms/" target = "_blank" > Terms of Use</a > and < a href = "/privacy/" target = "_blank" > Privacy Policy</a > </span>
      );
    },
    validations: {
      'required': { message: 'Acceptance of the terms is required' },
    },
  },
];

class App extends Component {
  render() {
    return (
      <div className="container">
        <FormFields fields={formFieldsData} />
      </div>
    );
  }
}

export default App;
