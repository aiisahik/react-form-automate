import React from 'react';
import { FormFeedback } from 'reactstrap';

const FieldValidationMessages = ({validations}) => {
    const validationFeedback = Object.keys(validations).map((type, index) => {
        if (validations[type] &&
            validations[type].valid === false) {
            console.log(validations[type].message);
            return (
                <FormFeedback className="text-danger" key={index}>
                    {validations[type].message}
                </FormFeedback>
            );
        }
        return;
    }).filter(feedback => feedback && feedback !== null);
    console.log('validationFeedback', validationFeedback);
    if (validationFeedback.length && validationFeedback[0]){
        return (validationFeedback[0]);
    } else {
        return (<span></span>);
    }
}

export default FieldValidationMessages;