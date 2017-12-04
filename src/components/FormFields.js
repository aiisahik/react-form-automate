import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

const propTypes = {
    triggerSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    fields: PropTypes.array,
}

const defaultProps = {
    triggerSubmit: () => {},
    submitting: false,
    fields: [],
};

class FormFields extends PureComponent {
    constructor(props) {
        super(props);
        this.fields = {};
        const validations = this.props.fields.reduce((obj, field) => (
            Object.assign(obj, { [field.fieldName]: field.validations })
        ), {});
        console.log('merged validations', validations);

        this.state = {
            formData: {
                username: this.props.username,
                userType: this.props.userType,
                zipcode: '',
                phone: 'XXX-XXX-XXXX',
                companyName: this.props.companyName,  
            },
            validity: {},
            validations: validations,
            submitting: this.props.submitting || false,
            submitted: false,
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
    this.props.triggerSubmit(this.submit)
    }   
    componentWillReceiveProps(newProps){
        if (newProps.submitting === true && !this.state.submitted){
            this.setState({
                submitted: newProps.submitting
            });
        }
    }
    submit(){
        if (this.isValidForm()){
            return this.props.submit(this.state.formData);
        } else {
            const failedFields = []
            Object.keys(this.state.validity).map((fieldName) => {
                if (this.state.validity[fieldName] === false){
                    failedFields.push(fieldName);
                }
            });
            return new Promise((resolve, reject) => {
                reject(null);
            });
        }
    }
    isValidForm(){
        const fieldsValidity = Object.keys(this.fields).map((fieldName) => {
            if (this.fields[fieldName] && typeof this.fields[fieldName].validate === 'function'){
                const fieldValidity = this.fields[fieldName].validate();
                // update our state.validity object 
                this.state.validity[fieldName] = fieldValidity;
                return fieldValidity;
            } else {
                //weird result?
                return true;
            }
        });
        return !Object.values(fieldsValidity).includes(false);
    }
    onInputChange(fieldName, val, valid, formData){
        if (!formData){
            formData = {};
        }
        this.state = Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, formData, {
                [fieldName]: val
            }),
            validity: Object.assign({}, this.state.validity, {
                [fieldName]: valid
            }),
        });
    }
    render() {
        const self = this;
        return (
            <form className="form" noValidate>
                {this.props.fields.map((fieldData, index) => (
                    <Field
                        {...fieldData}
                        key={index}
                        onChange={self.onInputChange}
                        submitted={self.state.submitted}
                    ></Field>
                ))}
            </form>
        );
    }
}

FormFields.propTypes = propTypes;
FormFields.defaultProps = defaultProps;

export default FormFields;
