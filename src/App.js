import React, { Component } from 'react';
import './App.scss';
import { AutomateForm } from './components/Automate';
import { FieldRenderMap } from './components/Fields';
import { ValidatorMap } from './services/validators';
import validateField from './services/validateField';

const fieldGeneratorData = [
  {
    type: 'input',
    fieldName: 'fieldName',
    label: 'Field Name',
    validations: {
      'required': { message: 'Field Name is required' },
    },
  },
  {
    type: 'input',
    fieldName: 'label',
    label: 'Label',
    validations: {},
  },
  {
    type: 'select',
    fieldName: 'type',
    label: 'Field Type',
    options: [
      { value: 'input', label: 'Input' },
      { value: 'select', label: 'Select' },
      { value: 'checkbox', label: 'Checkbox' },
    ],
    validations: {
      'required': { message: 'Field type is required' },
    },
  },
];

const formFieldsData = [
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
        {  value: 'small', label: 'Small (fewer than 25 employees)' },
        {  value: 'medium', label: 'Medium (25 to 100 employees)' },
        {  value: 'large', label: 'Large (more than 100 employees)' },
    ],
    validations: {
      'required': { message: 'Business Size is required' },
    },
  },
  {
    type: 'checkbox',
    fieldName: 'tos',
    html: (
        <span> I accept the Kinnek < a href = "/terms/" target = "_blank" > Terms of Use</a > and < a href = "/privacy/" target = "_blank" > Privacy Policy</a > </span>
    ),
    validations: {
      'required': { message: 'Acceptance of the terms is required' },
    },
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
    };
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(data){
    console.log(data);
    this.setState({ successfulOutput: JSON.stringify(data, null, 2)});
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
  onSubmitClick(e) {
    this.setState({
      submitting: true
    });
    this.clickSubmit().then((result) => {
      this.setState({
        submitting: false,
      });
    }).catch((result) => {
      this.setState({
        submitting: false,
      });
    });
  }
  render() {
    return (
      <div className="container pt-5">
        <h2> React Form Automation</h2>
        <hr />
        <div className="row">
          <div className="col-6">
            <AutomateForm 
              data={formFieldsData}
              renderMap={FieldRenderMap}
              validatorMap={ValidatorMap}
              triggerSubmit={click => this.clickSubmit = click}
              submit={this.submit}
            />
            <div className="text-right">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={this.onSubmitClick}> Submit 
              </button>
            </div>
            {this.state.successfulOutput && (<pre>
              {this.state.successfulOutput}
            </pre>)}
          </div>
          <div className="col-6">
            Sup 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
