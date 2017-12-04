import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import deepEqual from 'deep-equal';

import { validate } from '../services/Validate';

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
};

const defaultProps = {
    defaultValue: '',
    inputClassName: '',
    label: '',
    onChange: () => { },
    placeholder: '',
    submitted: false,
    type: 'text',
    validations: {},
};

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: null,
            valid: null,
            validations: Object.assign({}, this.props.validations),
            dirty: false,
            blurred: false,
            value: this.props.defaultValue,
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
        return validate(this.state.val, this.state.validations)
            .then(results => {
                self.setState({
                    validations: Object.assign({}, this.state.validations, results.validations),
                    valid: results.valid,
                    dirty: (!this.state.dirty && self.state.val && self.state.val.length > 0)
                });
                if (typeof self.props.onChange === 'function') {
                    self.props.onChange(self.props.fieldName, self.state.val, results.valid, results.formData);
                }
                return results.valid;
            });
    }
    onChange(e, track) {
        const val = (this.props.type === 'checkbox') ?
            (e.target.checked ? 'Y' : '') :
            e.target.value;
        if (this.state.val !== val) {
            this.state.val = val;
        }
        if (track === true && (this.state.blurred === true || this.props.submitted === true)) {
            this.validate();
        }
    }
    onBlur(e) {
        if (!this.state.blurred) {
            this.state.blurred = true;
        }
        this.onChange(e, true);
    }
    onKeyDown(e) {
        if (e.keyCode === 9) {
            this.state.blurred = true;
            this.onChange(e, true);
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

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;