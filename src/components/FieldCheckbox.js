import React from 'react';
import classNames from 'classnames';
import { FormGroup, Input, Label } from 'reactstrap';
import FieldValidationMessages from './FieldValidationMessages';

const FieldCheckbox = (props) => {
    return (
        <FormGroup check>
            <Label className="custom-control custom-checkbox" check>
                <Input
                    name={props.fieldName}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}
                    className="custom-control-input"
                    type="checkbox" />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                    {(props.children && props.children.length > 0) ? (
                        props.children
                    ) : (
                        props.label
                    )}
                </span>
            </Label>
            <FieldValidationMessages
                validations={props.validations}
            />
        </FormGroup>
    );
};

export default FieldCheckbox;

