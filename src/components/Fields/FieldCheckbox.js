import React from 'react';
import classNames from 'classnames';
import { FormGroup, Input, Label } from 'reactstrap';
import FieldValidationMessages from './FieldValidationMessages';

const FieldCheckbox = (props) => {
    return (
        <FormGroup 
            className={classNames({
                "has-success": props.valid === true,
                "has-danger": props.valid === false,
            })}
            check>
            <Label className="custom-control custom-checkbox" check>
                <Input
                    name={props.fieldName}
                    defaultValue={props.defaultValue}
                    onChange={(e) => props.onChange(e, true)}
                    type="checkbox"
                    value={true}
                />
                <span className="custom-control-indicator"></span>
                {props.html && (<div className="custom-control-description mb-3">
                    {props.html}
                </div>)}
                <FieldValidationMessages
                    validations={props.validations}
                />
            </Label>
            
        </FormGroup>
    );
};

export default FieldCheckbox;

