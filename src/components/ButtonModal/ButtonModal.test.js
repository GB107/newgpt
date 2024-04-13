import React from 'react';
import { shallow } from 'enzyme';
import Button from './ButtonModal';

describe('Button component', () => {
  it('renders button correctly', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Button onClick={mockOnClick}>Submit</Button>);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').prop('onClick')).toEqual(mockOnClick);
    expect(wrapper.find('button').text()).toEqual('Submit');
  });

  it('executes onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Button onClick={mockOnClick}>Submit</Button>);
    wrapper.find('button').simulate('click');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
