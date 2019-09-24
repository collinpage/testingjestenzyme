import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * 
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props  - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
}

test('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test('counter start at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

// organize test by functions
describe('Increment', () => {
  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  });

  test('clicking increment button increments counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });
    
    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
  });
});

describe('Decrement', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });

  test('clicking decrement button decrements counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });

  test('error does not show when not needed', () => {
    const wrapper = setup();
    const error = findByTestAttr(wrapper, 'decrement-error');
    expect(error.length).toBeFalsy();
  });

  // using a describe here so I can use a "beforeEach" for shared setup
  describe('counter is 0 and decrement is clicked', () => {

    // scoping wrapper to the describe, so it can be used in beforeEach and the tests
    let wrapper;

    beforeEach(() => {
      // no need to set counter value here; default value of 0 is good
      wrapper = setup();

      // find button and click
      const button = findByTestAttr(wrapper, 'decrement-button');
      button.simulate('click');
      wrapper.update();
    });
    test('error shows', () => {
      // check if the error message is displayed
      const error = findByTestAttr(wrapper, 'decrement-error');
      expect(error.length).toBe(1);
    });

    test('counter still display 0', () => {
      const counterDisplay = findByTestAttr(wrapper, 'counter-display');
      expect(counterDisplay.text()).toContain(0);
    });

    test('clicking increment clears the error', () => {
      // find and click increment button
      const button = findByTestAttr(wrapper, 'increment-button');
      button.simulate('click');
      wrapper.update();

      const error = findByTestAttr(wrapper, 'decrement-error');
      expect(error.length).toBeFalsy();
    });
  });
});

