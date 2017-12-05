import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';

import validateField from '../../services/validateField';

const propTypes = {
    defaultValue: PropTypes.string,
    fieldName: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    submitted: PropTypes.bool, // whether the user has attempt to submit the form 
    type: PropTypes.string,
    validations: PropTypes.object,
    validatorMap: PropTypes.object,
};

const defaultProps = {
    inputClassName: '',
    label: '',
    onChange: () => { },
    placeholder: '',
    submitted: false,
    type: 'text',
    validations: {},
    validatorMap: {},
};

class AutomateField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: this.props.defaultValue ? this.props.defaultValue : null,
            valid: null,
            validations: Object.assign({}, this.props.validations),
            dirty: false,
            blurred: false,
            isRequired: Object.keys(this.props.validations).indexOf('required') >= 0,
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.validate = this.validate.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.validations && !deepEqual(newProps.validations, this.state.validations)) {
            this.setState({
                validations: Object.assign({}, this.state.validations, newProps.validations),
                valid: this.isValid(newProps.validations)
            });
        }
        if (newProps.submitted === true && !this.props.submitted) {
            this.validate();
        }
    }
    componentWillUpdate() {
        return false;
    }
    isValid(validations) {
        return Object.values(validations).map((validation) => {
            return validation ? validation.valid : true;
        }).indexOf(false) < 0;
    }
    validate() {
        var self = this;
        return validateField(this.state.val, this.state.validations, this.props.validatorMap)
            .then(results => {
                self.setState({
                    validations: Object.assign({}, this.state.validations, results.validations),
                    valid: results.valid,
                    dirty: (!this.state.dirty && self.state.val && self.state.val.length > 0)
                }, ()=> {
                    if (typeof self.props.onChange === 'function') {
                        self.props.onChange(self.props.fieldName, self.state.val, results.valid, results.formData);
                    }
                });
                return results.valid;
            });
    }
    onChange(e, forceValidate) {
        const val = (this.props.type === 'checkbox') ?
            (e.target && e.target.checked ? 'Y' : false) :
            e.target ? e.target.value : false;
        const self = this;
        this.setState({ 'val' : val }, () => {
            self.props.onChange(self.props.fieldName, self.state.val);
            if (forceValidate || self.state.blurred === true || self.props.submitted === true) {
                self.validate();
            }
        });
    }
    onBlur(e) {
        if (!this.state.blurred) {
            this.setState({
                blurred: true,
            });
        }
        this.onChange(e, true);
    }
    onKeyDown(e) {
        if (e.keyCode === 9) {
            this.setState({
                blurred: true
            }, () => {
                this.onChange(e, true);
            });
        }
    }
    render() {
        
        return (<this.props.render
            {...this.props}
            valid={this.state.valid}
            onKeyDown={this.onKeyDown}
            onBlur={this.onBlur}
            onChange={this.onChange}
        />);
    }
}

AutomateField.propTypes = propTypes;
AutomateField.defaultProps = defaultProps;

export default AutomateField;