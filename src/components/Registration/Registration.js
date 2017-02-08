import React from 'react';
import CreateStudent from '../Create/CreateStudent';
import Klass from '../Klass/Klass';
import './Registration.css';
import axios from 'axios';
import List from '../List/List'
export default class Registration extends React.Component{
   constructor(props){
    super(props);
    this.state = {students:[],klasses:[]};
    this.getKlasses=this.getKlasses.bind(this);
  }
  getKlasses(e){
  e.preventDefault();
   const id=e.target.getAttribute("data-id");
   var klasses=[];
    this.setState(this.state.students.map(m =>{
      if(m.id==id && m.css=="empty"){
        m.css="selected";
        axios.get("http://localhost:9000/students/" + id + "/klasses")
          .then(resList => {
            console.log(resList.data);
            resList.data.map(c => this.state.klasses.filter(k => k.id == c.id).css="selected");
          })
      }
      else{
        m.css="empty";
      }
    }));
  }
componentDidMount(){
   axios.get("http://localhost:9000/students").then(resp => {
    let students=[];
    resp.data.map((e,i)=>{var obj = {}; obj.id=e.id; obj.text=e.email; obj.css="empty";students.push(obj);})
    this.setState({students:students})
  })
  axios.get("http://localhost:9000/klasses").then(resp => {
    let klasses=[];
    resp.data.map((e,i)=>{var obj = {};obj.id=e.id;obj.text=e.name; obj.css="empty", klasses.push(obj)});
    this.setState({klasses:klasses})
  })
 }
   render(){
    return(
    <div className="registration">
        <div className="row">
          <div className="col-xs-6">
            <CreateStudent host="http://localhost:9000" created={()=>{}} />
          </div>
          <div className="col-xs-6">
            <Klass host="http://localhost:9000" created={()=>{}}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
             <List header="Students" items={this.state.students} click={this.getKlasses} />
          </div>
          <div className="col-xs-6">
            <List header="Klasses" items={this.state.klasses} />
          </div>
        </div>
      </div>
  );
  }
}
