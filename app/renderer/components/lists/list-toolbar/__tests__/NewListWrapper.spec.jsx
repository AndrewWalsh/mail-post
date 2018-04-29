import React from 'react';
import { shallow } from 'enzyme';

import NewListWrapper from '../NewListWrapper';
import NewList from '../NewList';

describe('NewListWrapper', () => {
  it('passes props to NewList', () => {
    const props = {
      MUTATION_IMPORT_CSV: () => {},
      nameOfList: 'test',
      listNameValue: 'value',
      disabled: false,
      data: {
        lists: [],
      },
      invalid: false,
      reset: () => {},
    };
    const wrapper = shallow(<NewListWrapper {...props} />);
    const wrappedNewList = wrapper.dive().find(NewList);
    expect(wrappedNewList.props()).toEqual(props);
  });
});
