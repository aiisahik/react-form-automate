import FieldCheckbox from './FieldCheckbox';
import FieldInput from './FieldInput';
import FieldSelect from './FieldSelect';
import FieldValidationMessages from './FieldValidationMessages';

const FieldRenderMap = {
    'input': FieldInput,
    'checkbox': FieldCheckbox,
    'select': FieldSelect,
    'validationMessages': FieldValidationMessages,
};

export {
    FieldRenderMap,
    FieldCheckbox,
    FieldInput,
    FieldSelect,
    FieldValidationMessages,
};