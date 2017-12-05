import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AutomateField from './AutomateField';

const propTypes = {
    triggerSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    renderMap: PropTypes.object,
    data: PropTypes.array,
    validatorMap: PropTypes.object,
}

const defaultProps = {
    triggerSubmit: () => {},
    submitting: false,
    renderMap: {},
    data: [],
    validatorMap: {},
};

class AutomateForm extends PureComponent {
    constructor(props) {
        super(props);
        this.fields = {};
        const validations = this.props.data.reduce((obj, field) => (
            Object.assign(obj, { [field.fieldName]: field.validations })
        ), {});
        this.state = {
            formData: {},
            validity: {},
            validations: validations,
            submitting: this.props.submitting || false,
            submitted: false,
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderField = this.renderField.bind(this);
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
        const self = this;
        return new Promise((resolve, reject) => {
            this.isValidForm().then(isFormValid => {
                if (isFormValid){
                    resolve(self.props.submit(self.state.formData));
                } else {
                    const failedFields = []
                    Object.keys(self.state.validity).map((fieldName) => {
                        if (self.state.validity[fieldName] === false){
                            failedFields.push(fieldName);
                        }
                    });
                    reject(null);
                }
            })
        });
    }
    isValidForm(){
        const self = this;
        const validationPromises = Object.keys(this.fields).map((fieldName) => {
            if (self.fields[fieldName] && typeof self.fields[fieldName].validate === 'function'){
                return self.fields[fieldName].validate();
                // // update our state.validity object 
                // self.state.validity[fieldName] = fieldValidity;
                // return fieldValidity;
            } else {
                //weird result?
                return Promise.resolve(false);;
            }
        });
        return new Promise((resolve, reject) => {
            Promise.all(validationPromises).then(fieldsValidity => {
                resolve(!Object.values(fieldsValidity).includes(false));
            });
        });
    }
    onInputChange(fieldName, val, valid, formData){
        if (!formData){
            formData = {};
        }
        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, formData, {
                [fieldName]: val
            }),
            validity: typeof valid === 'boolean' ? Object.assign({}, this.state.validity, {
                [fieldName]: valid
            }) : this.state.validity,
        }));

    }
    render() {
        const self = this;
        return (
            <form className="form" noValidate>
                {this.props.data.map((fieldData, index) => (
                    self.renderField(fieldData, index)
                ))}
            </form>
        );
    }
    renderField(fieldData, index) {
        fieldData.render = this.props.renderMap[fieldData.type];
        return (
            <AutomateField
                {...fieldData}
                ref={(fieldRef) => { this.fields[fieldData.fieldName] = fieldRef; }}
                key={index}
                onChange={this.onInputChange}
                submitted={this.state.submitted}
                validatorMap={this.props.validatorMap}
            />
        );
    }
}

AutomateForm.propTypes = propTypes;
AutomateForm.defaultProps = defaultProps;

export default AutomateForm;
