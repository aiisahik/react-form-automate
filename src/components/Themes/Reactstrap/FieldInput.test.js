import React from 'react';
import renderer from 'react-test-renderer';
import { FieldInput } from '.';

test('Field renders standard input', () => {
    const fieldData = {
        type: 'input',
        fieldName: 'username',
        label: 'Email',
        validations: {}
    };
    const component = renderer.create(
        <FieldInput
            {...fieldData}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});