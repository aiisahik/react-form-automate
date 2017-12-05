import React from 'react';
import AutomateForm from './AutomateForm';
import renderer from 'react-test-renderer';
import signupForm from '../../data/signupForm';
import { ValidatorMap } from '../../services/validators';
import { FieldRenderMap } from '../Fields';

test('Renders signup form', () => {
    const component = renderer.create(
        <AutomateForm
            data={signupForm}
            renderMap={FieldRenderMap}
            validatorMap={ValidatorMap}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // // manually trigger the callback
    // tree.props.onMouseEnter();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();

    // // manually trigger the callback
    // tree.props.onMouseLeave();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});