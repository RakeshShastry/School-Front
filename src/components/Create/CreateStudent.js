import React from 'react';
import './CreateStudent.css'
export default class CreateStudent extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.create = this.create.bind(this);
    }
    create(){
        console.log("***Create Clicked***")
    }
    render(){
        return(
            <div className="create-student">
             <form>
                <label>Email Address</label>
                <input ref={n => this.email == n} type="email" />
                <button onClick={this.create}>Create</button>
             </form>
            </div>
        )
    }
}