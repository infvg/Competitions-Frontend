import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import '../css/create.css';
import Header from './headerBar'

let counter = 0;
function TeamForm(props){
    let op = [];
    props.data.forEach((element) => {
        element[0].key = ++counter;
        op.push(element);

    });
    const [teams, setTeams] = useState(op);
    const handleChangeInput = (key, event) => {
        const newInputFields = teams.map(i => {
          if(key === i[0].key) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setTeams(newInputFields);
      }
    
    const handleAddFields = () => {
        setTeams([...teams, [{key:++counter},<StudentForm data={[{name: "", major: "", stId: ""},]} />]])
      }
    
      const handleRemoveFields = key => {
        const values  = [...teams];
        values.splice(values.findIndex(value => value.key === key), 1);
        setTeams(values);
      }
    
    return (
        <Container>
          { teams.map((inputField,i) => (
            <div key={inputField[0].key}>
              <TextField required
                label="Team Name"
                variant="filled"
                value={inputField[0].name}
                onChange={event => handleChangeInput(inputField[0].key, event)}
              />
              <TextField
                label="Winner"
                variant="filled"
                value={inputField[0].winner}
                onChange={event => handleChangeInput(inputField[0].key, event)}
              />
              <Button disabled={teams.length === 1} onClick={() => handleRemoveFields(inputField.key)}>
                Remove
              </Button>
              {teams.length - 1 === i && (<Button onClick={handleAddFields}>
                Add
              </Button>)}

              <div>
                  {inputField[1]}
              </div>
            </div>
          )) }
      </Container>
    );
}

function Comp(props) {

    return(

        <Container>
        <div>
        <TextField required
                label="Competition Name"
                variant="filled"
                value={props.name}
               
              />
        <TeamForm data={[[{},<StudentForm data={[{name: "", major: "", stId: ""},]}/>]]}/>
        </div>

        </Container>
        
    );  

}
function getfromcompetition(props) {
    if(props.teams == undefined) 
        return <TeamForm data={[[{},<StudentForm data={[{name: "", major: "", stId: ""},]}/>]]}/>;
        
    let comp = {name:props.name,link:props.link,date:props.date}
    props.teams.array.forEach(team => {
        
    })

    return 
}
function StudentForm(props) {
    
    let op = [];
    props.data.forEach((element) => {
        element.key = ++counter;
        op.push(element);

    });
    const [students, setStudents] = useState(op);
    const handleChangeInput = (key, event) => {
        const newInputFields = students.map(i => {
          if(key === i.key) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setStudents(newInputFields);
      }
    
    const handleAddFields = () => {
        setStudents([...students, { key:++counter,  firstName: '', lastName: '', stId:1}])
      }
    
      const handleRemoveFields = key => {
        const values  = [...students];
        values.splice(values.findIndex(value => value.key === key), 1);
        setStudents(values);
      }
    
    return (
        <Container>
          { students.map((inputField,i) => (
            <div key={inputField.key}>
              <TextField required
                label="Student ID"
                variant="outlined"
                type="number"
                value={inputField.stId}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
              <TextField required
                label="Name"
                variant="outlined"
                value={inputField.name}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
                <TextField required
                label="Major"
                variant="outlined"
                value={inputField.major}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
              <Button disabled={students.length === 1} onClick={() => handleRemoveFields(inputField.key)}>
                Remove
              </Button>
              {students.length - 1 === i && (<Button onClick={handleAddFields}>
                Add
              </Button>)}
            </div>
          )) }
      </Container>
    );
  }

function Create(){
    return(
        <div id = 'create'>
                    <Header />
                    <div>
                        <Box component="form"sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }}noValidateautoComplete="off"> 
      <div>
        <TeamForm data={[[{},<StudentForm data={[{name: "", major: "", stId: ""},]}/>]]}/>
        </div>
        </Box>
                    </div>
         </div>

            
        
    );  
}
export default Create;