import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import List from './List';
import sinon from 'sinon';
import Box from '../Box/Box';

let students;
describe("List", () =>{
  beforeEach(() => {
    students = [
      {id:3, text:"bob", css:"selected"},
      {id:4, text:"sam", css:"empty"},
      {id:5, text:"sue", css:"selected"}
    ];
  });
	it('should render without error', () => {
		const wrapper = shallow(<List />)
		expect(wrapper).to.be.ok;
	})

	it('should find component using its class name', () => {
		const wrapper = shallow(<List />);
		expect(wrapper.find(".list").length).to.equal(1);
		expect(wrapper).to.be.ok;
	})

	it('should get header from component', () => {
		const wrapper = shallow(<List header="Students" />);
        expect(wrapper.text()).to.equal('Students');
	})

   it('should render out 3 boxes', () => {
    const wrapper = mount(<List header="Students" items={students} />);
    expect(wrapper.find('.box').length).to.equal(3);
  });

  it('should display sam in the 2nd box', () => {
    const wrapper = mount(<List header="Students" items={students} />);
    console.log(wrapper.find(Box).at(1).find('div > div').html());
  });

   it('should call fn when 2nd box is clicked', () => {
    const stub = sinon.stub();
    const wrapper = mount(<List header="Students" items={students} click={stub}/>);
    wrapper.find(Box).at(1).find('div > div').simulate('click');
    expect(stub.callCount).to.equal(1);
  });

})