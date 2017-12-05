## Project Goals:

To create a form system that can handle a variety of situations with minimal dev work.   

Developers should be able to: 
- Add Custom form validations
- Add Asynchronous form validations 
- Fully Customize presentation (html/css) for each type of form element 
- Add unit tests for each of the above customizations 

Non-Developers should be able to: 
- Set validation rules and error message for each field
- Set fields, labels, options, etc 
- Select (though not fully customize) the presentation theme for each form element 

## Usage: 

The <AutomateForm> Component takes 3 main props: 
- `data`: defines the form schema, expected to be written by non-developers
- `renderMap`: a mapping of field types to (pure) React components that provides the presentation (but not the functionality) for the various fields
- `validatorMap`: a mapping of validation types to validator function 

There are 2 other props related to submitting the form: 
- `triggerSubmit` which can be used to trigger validations and submission of the form 
- `submit` callback function which is called with the formData if the form passes all validations





