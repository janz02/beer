import React from 'react';
import MomentDisplay from './MomentDisplay';
import { shallow } from 'enzyme';
import moment from 'moment';



describe('MomentDisplay positive cases', () => {

  it('Rendering moment, will format it properly', () => {
    
    // Arrange
    const date: moment.Moment = moment("20111031", "YYYYMMDD");

    // Act
    const wrapper = shallow(<MomentDisplay date={date}/>);

    // Assert
    const text = wrapper.text();
    expect(text).toEqual('2011.10.31');
  });


  it('Empty parameter return nothing', () => {
    
    // Arrange

    // Act
    const wrapper = shallow(<MomentDisplay/>);

    // Assert
    expect(wrapper.text()).toEqual('');
    expect(wrapper).toMatchObject({});
  });

})