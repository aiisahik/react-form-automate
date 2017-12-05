import React from 'react';
import { FormFeedback } from 'reactstrap';

const FieldValidationMessages = ({validations}) => {
    const validationFeedback = Object.keys(validations).map((type, index) => {
        if (validations[type] &&
            validations[type].valid === false) {
            return (
                <div className="text-danger small" key={index}>
                    {validations[type].message}
                </div>
            );
        }
        return null;
    }).filter(feedback => { return feedback && feedback !== null});
    
    if (validationFeedback.length && validationFeedback[0]){
        return (validationFeedback[0]);
    }
    return (<span></span>);
}

export default FieldValidationMessages;