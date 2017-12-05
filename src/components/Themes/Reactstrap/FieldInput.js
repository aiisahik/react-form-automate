import React from 'react';
import classNames from 'classnames';
import { FormGroup, Input, Label } from 'reactstrap';
import FieldValidationMessages from './FieldValidationMessages';

const FieldInput = (props) => {
    return (
        <FormGroup
            className={classNames({
                "has-success": props.valid === true,
                "has-danger": props.valid === false,
            })}
        >
            <Label for="username">{props.label}</Label>
            <Input
                name={props.fieldName}
                defaultValue={props.defaultValue}
                type={props.type}
                className={classNames(props.className, {
                    "is-invalid": props.valid === false,
                    "is-valid": props.valid === true,
                })}
                onBlur={props.onBlur}
                onChange={(e) => props.onChange(e)}
                onKeyDown={props.onKeyDown}
                required={props.isRequired}
                maxLength="60"
                placeholder={props.placeholder} />

            <FieldValidationMessages 
                validations={props.validations}
            />
        </FormGroup>
    );
};

export default FieldInput;