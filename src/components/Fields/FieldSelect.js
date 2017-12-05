import React from 'react';
import classNames from 'classnames';
import { FormGroup, Input, Label } from 'reactstrap';
import FieldValidationMessages from './FieldValidationMessages';

const FieldSelect = (props) => {
    return (
        <FormGroup
            className={classNames({
                "has-success": props.valid === true,
                "has-danger": props.valid === false,
            })}
        >
            <Label for="username">{props.label}</Label>

            <Input 
                type="select" 
                name={props.fieldName}
                defaultValue={props.defaultValue}
                className={classNames(props.className, {
                    "is-invalid": props.valid === false,
                    "is-valid": props.valid === true,
                })}
                onChange={props.onChange}
                required={props.isRequired}
                >
                {props.options.map((option, index) => (
                    <option
                        key={index}    
                        value={option.value}
                    >{option.label}
                    </option>    
                ))}
            </Input>
            <FieldValidationMessages 
                validations={props.validations}
            />
        </FormGroup>
    );
};

export default FieldSelect;