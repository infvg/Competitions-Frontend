import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import '../css/create.css';
import Header from './headerBar'
import CompForm from '../components/CompForm'

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
                name="name"
                value={inputField[0].name}
                onChange={event => handleChangeInput(inputField[0].key, event)}
              />
              <FormControlLabel control={<Checkbox/>} label="Winner" />
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


function StudentForm(props) {
    
    let op = [];
    props.data.forEach((element) => {
        element.key = ++counter;
        op.push(element);

    });
    const [students, setStudents] = useState(op);

    const studentName = useRef()
    const major= useRef()
    const stId = useRef()
    
    const retrieve = () => 
    [studentName.current.value, major.current.value, stId.current.value]
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
        setStudents([...students, { key:++counter,  firstName: '', lastName: '', stId:null}])
      }
    
      const handleRemoveFields = key => {
        const values  = [...students];
        values.splice(values.findIndex(value => value.key === key), 1);
        setStudents(values);
      }
    
    return (
        <Container>
          { students.map((inputField,i) => (
            <div name={inputField.key}>
              <TextField required
                label="Student ID"
                name="stId"
                variant="outlined"
                type="number"
                value={inputField.stId}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
              <TextField required
                label="Name"
                name="name"
                variant="outlined"
                value={inputField.name}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
                <TextField required
                label="Major"
                name="major"
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
      <Grid container spacing={5}>
          <Grid item xs={9}>
        <CompForm />
        </Grid>
          <Grid item xs={3}>
        <Button> Submit</Button>
        </Grid>
        </Grid>
        </div>
        </Box>
                    </div>
         </div>

            
        
    );  
}
export default Create;