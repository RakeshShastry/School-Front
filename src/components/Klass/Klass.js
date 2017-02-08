import React from 'react';
import './Klass.css';
import axios from 'axios';
export default class Klass extends React.Component{
    constructor(props){
        super(props);
		this.state = {};
		this.create=this.create.bind(this);
    }
	create(e){
		e.preventDefault();
		this.setState({error:null});
		const name = this.name.value;
		const semester = this.semester.value;
		const credit = +this.credit.value;
		const fee = +this.fee.value;
		let department = this.department.value;
		if(name.length <= 5){
			this.setState({error:"Name too short"});
       		return;
		}
		if(new Date(semester)>new Date())
		{
			this.setState({error:"Date should be less than today's date"});
       		return;
		}
		if(credit < 0 || fee < 0){
			this.setState({error:"Field cannot be less than zero"});
       		return;
		}
		if(department.localeCompare("--Select--")==0){
			this.setState({error:"Please select the dropdown value"});
       		return;
		}
		const url = this.props.host + '/klasses';
		const payload = { "name": name,"semester": semester,"credits": credit,"department": department,"fee": fee }
		axios.post(url,payload)
		 .then(res =>{
			const klass = res.data;
			this.props.created(klass);
			this.name.value='';
			this.semester.value = '';
			this.credit.value = '';
			this.department.value = '';
			this.fee.value = '';
		 }).catch(e => console.log("hello execption",e));
		
	}
    render(){
        return(
            <div className="klass">
				<div className={this.state.error ? "error" : ""}>{this.state.error}</div>
              <h3>Create Klass</h3>
				<form>
					<table className="table">
						<tbody>
					<tr>
						<td><label>Name</label></td>
						<td><input id="name" type="text" ref={n=>this.name=n} placeholder="enter the name"/></td>
					</tr>
					<tr>
						<td><label>Semester</label></td>
						<td><input id="semester" type="date" ref={s=>this.semester=s } placeholder="enter the semester"/></td>
					</tr>
					<tr>
						<td><label>Credits</label></td>
						<td><input id="credit" type="number" ref={c=>this.credit=c} placeholder="enter the credits"/></td>
					</tr>
					<tr>
						<td><label>Department</label></td>
						<td>
						<select ref={d=>this.department=d} id="department" defaultValue="select">
							<option id="select">--Select--</option>
							<option id="SCIENCE">SCIENCE</option>
							<option id="ENGINEERING">ENGINEERING</option>
							<option id="LITERATURE">LITERATURE</option>
							<option id="PHILOSOPHY">PHILOSOPHY</option>
						</select>
						</td>
					</tr>
					<tr>
						<td><label>Fee</label></td>
						<td><input id="fee" type="number" ref={f=>this.fee=f} placeholder="enter the fee"/></td>
					</tr>
					<tr>
						<td><button onClick={this.create} className="btn btn-primary">Create</button></td>
					</tr>
					</tbody>
					</table>
				</form>
            </div>
        )
    }
}

