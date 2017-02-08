import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import axios from 'axios';
import nock from 'nock';
import sinon from 'sinon';
import httpAdapter from 'axios/lib/adapters/http';

import Klass from './Klass';
let wrapper;
axios.defaults.adapter = httpAdapter;
describe('Create Class', () => {
    beforeEach(() => {
        wrapper = mount(<Klass />);
        nock.disableNetConnect();
    })

    afterEach(() => {
        nock.cleanAll();
		nock.enableNetConnect();
    })

    it('should render without error', () => {
        expect(wrapper).to.be.ok;
    })

    it('should find component using its class name', () => {
        expect(wrapper.find(".klass").length).to.equal(1);
    })

    it('should call preventDefault when button clicked', () => {
        const stub = sinon.stub();
        wrapper.find('button').simulate('click', {preventDefault: stub});
        expect(stub.callCount).to.equal(1);
    })

    it('should show error when name is less than 5 characters', () => {
        wrapper.find('#name').get(0).value = "bob";
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal('Name too short');
    })

     it('should show error when Semester is less than todays date', () => {
        wrapper.find('#name').get(0).value = "bobbobb";
        wrapper.find('#semester').get(0).value = "01/02/2018";
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Date should be less than today's date");
    })

     it('should show error when Credits is less than 0', () => {
        wrapper.find('#name').get(0).value = "bobbobb";
        wrapper.find('#semester').get(0).value = "01/02/2016";
        wrapper.find('#credit').get(0).value = -1;
        wrapper.find('#fee').get(0).value = -1;
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal('Field cannot be less than zero');
    })

      it('should show error when none is selected', () => {
        wrapper.find('#name').get(0).value = "bobbobb";
        wrapper.find('#semester').get(0).value = "01/02/2016";
        wrapper.find('#credit').get(0).value = 9;
        wrapper.find('#fee').get(0).value = 0;
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Please select the dropdown value");
    })

    	it('should create a klass', (done) => {
		nock('http://fakehost.com')
			.post('/klasses', { "name": "bobbobb","semester": "2016-01-01","credits": 9,"department": "SCIENCE","fee": 0 })
			.reply(200, {"id":100,"name": "bobbobb","semester": "2016-01-01","credits": 9,"department": "SCIENCE","fee": 0 });
		const stub = sinon.stub();
		wrapper = mount(<Klass created={stub} host="http://fakehost.com"/>);
        wrapper.find('#name').get(0).value = "bobbobb";
        wrapper.find('#semester').get(0).value = "2016-01-01";
        wrapper.find('#credit').get(0).value = 9;
        wrapper.find('#fee').get(0).value = 0;
        wrapper.find("select").get(0).value="SCIENCE";
        wrapper.find('button').simulate('click');
		
		setTimeout(() => {
			try{
			expect(stub.callCount).to.equal(1);
			expect(stub.getCall(0).args[0]).to.deep.equal({"id":100,"name": "bobbobb","semester": "2016-01-01","credits": 9,"department": "SCIENCE","fee": 0 });
			wrapper.find('#name').get(0).value = '';
            wrapper.find('#semester').get(0).value = '';
            wrapper.find('#credit').get(0).value = '';
            wrapper.find('#fee').get(0).value = '';
            wrapper.find("#department").get(0).select='';
			done();
			}catch(e){
				done.fail(e);
			}
		},1000)
  });	
})