import React,{Component} from 'react';
import classes from './App.css';
//import Radium ,{StyleRoot} from 'radium';

import Person from './Person/person';

class App extends Component {
    state = {
        persons: [
          { id:'asd1',name: 'Max', age: 28 },
          { id:'dfd1', name: 'Manu', age: 29 },
          { id:'jkh1',name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value',
        showPersons : false
        
      }
      
    togglePersonHandler= ()=>{
       const isShow = this.state.showPersons;
       this.setState({showPersons: !isShow});
    }

    nameChangedHandler =(event, id)=>{
      const personIndex = this.state.persons.findIndex(p =>{
        return p.personid === id;
      });
      const person = {...this.state.persons[personIndex]};
      //alternate oporache
      //const person = Object.assign({}, this.state.persons[personIndex]);
      person.name = event.target.value;
      const persons = [...this.state.persons];
      persons[personIndex] = person;
      this.setState({ persons : persons })
    }


    deletePersonHandler = (personIndex)=>{
     // const persons = this.state.persons; //one approch
     //const persons = this.state.persons.slice();
     const persons = [...this.state.persons];
     console.log(persons);     
      persons.splice(personIndex,1);
      console.log('after splice call', persons);
      this.setState({persons: persons});
    }

    render(){
      let persons = null;  
      let btnClass = '';    
      if(this.state.showPersons){
        persons = (
          <div>
          {this.state.persons.map((person , index) => {
            return <Person
            click= {()=> this.deletePersonHandler(index)}
              name= {person.name}
              age= {person.age}
              key = {person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
             />
          })
          }
          </div> 
        );  
        btnClass = classes.Red;          
      }

      const assignedclasses = [];
      if(this.state.persons.length <= 2){
        assignedclasses.push( classes.red );
      }
      if(this.state.persons.length <= 1){
        assignedclasses.push( classes.bold );
      }
      // if(this.state.persons.length == 0){        
      //   this.setState({buttonDisabled : true});
      // }
    return (      
        <div className= {classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedclasses.join(' ')}>This is really working!</p>
        <button 
        className = {btnClass}         
          onClick={this.togglePersonHandler}>Toggle Person</button>
          {persons}
        </div>      
     );

//   return React.createElement('div',null,
//    React.createElement('h1',null,'Does this Workk')); 
  }
}

export default App;
