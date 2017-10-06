import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Home from 'components/Home'

describe('<Home />', () => {
  it('should render single <h2>', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper.find('h2')).to.have.length(1)
  })
})
