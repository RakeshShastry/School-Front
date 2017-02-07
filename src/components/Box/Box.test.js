import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import Box from './Box';
import sinon from 'sinon';

describe("Box", () =>{
	it('should render without error', () => {
		const wrapper = shallow(<Box />)
		expect(wrapper).to.be.ok;
	})

	it('should find component using its class name', () => {
		const wrapper = shallow(<Box />);
		expect(wrapper.find(".box").length).to.equal(1);
		expect(wrapper).to.be.ok;
	})

	it('should get text from component', () => {
		const wrapper = shallow(<Box text="alice@gmail.com" />);
		expect(wrapper.text()).to.equal('alice@gmail.com');
	})

    it('should get the css class from component', () => {
		const wrapper = shallow(<Box css="selected" />);
        const html = wrapper.html();
        expect(html).to.equal('<div class="box"><div class="selected"></div></div>');
        expect(wrapper.find('.box > div').get(0).props.className).to.equal('selected')
	})

    it('should get the primary key (id) from component', () => {
		const wrapper = shallow(<Box id="3" />);
        const html = wrapper.html();
        expect(html).to.equal('<div class="box"><div data-id="3"></div></div>');
	})

    it('should render out full component', () => {
		const wrapper = shallow(<Box id="3" css="selected" text="bob@gmail.com" />);
        const html = wrapper.html();
        expect(html).to.equal('<div class="box"><div class="selected" data-id="3">bob@gmail.com</div></div>');
	})

    it('should call the  parents function when clicked', () => {
		const stub = sinon.stub();
        const wrapper = mount(<Box click={stub} />)
        wrapper.find(".box > div").simulate('click');
        expect(stub.callCount).to.equal(1);
	})

	// it('should get the html form component', () => {
	// 	const wrapper = shallow(<Sum />);
	// 	expect(wrapper.html()).to.equal('<div class="sum"><h1>Sum</h1><input type="number" class="a"/><button class="btn btn-primary btn-sm">+</button><input type="number" class="b"/><span></span></div>');
	// })
	
	// it('should call add function when + button is clicked', () => {
	// 	const wrapper = shallow(<Sum />);
	// 	const instance = wrapper.instance();

	// 	const add = sinon.stub(instance, 'add');
	// 	instance.forceUpdate();
	// 	wrapper.update();

	// 	wrapper.find('button').simulate('click');
	// 		wrapper.find('button').simulate('click');
	// 	expect(add.callCount).to.equal(2);
	// })	
	// it('should sum up 2 numbers and display result', () => {
	// 	const wrapper = mount(<Sum />);
	// 	wrapper.find("input.a").get(0).value = 3;
	// 	wrapper.find("input.b").get(0).value = 2;
	// 	wrapper.find('button').simulate('click');
	// 	expect(wrapper.state('sum')).to.equal(5);
	// 	expect(wrapper.text()).to.equal("Sum+5");
	// })
})