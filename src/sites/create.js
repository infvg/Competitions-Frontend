import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import '../css/create.css';
import Header from './headerBar'

function CompForm(props) {


  return (

      <Container>
          <div key="dopqjkwpd">
              <TextField required
                  name="name"
                  label="Competition Name"
                  variant="filled"
                  defaultValue={props.data === undefined ? "" : props.data.name}

              />
              <TextField required
                  name="link"
                  label="Competition Link"
                  variant="filled"
                  defaultValue={props.data === undefined ? "" : props.data.link}

              />
              <TextField required
                  name="date"
                  label="Competition Date"
                  variant="filled"
                  defaultValue={props.data === undefined ? "" : props.data.date}
                  type="date"
              />
              {getFromCompetition(props.data)}
          </div>

      </Container>

  );

}
function getFromCompetition(props) {
  if (props === undefined)
      return <TeamForm data={[[{}, <StudentForm data={[{ name: "", major: "", stId: "" },]} />]]} />;

  let comp = []
  console.log(props.teams.array)
  props.teams.forEach(team => {
      let students = [];

      props.teams.forEach(student => {
          students.push({ name: student.name, major: student.major, stId: student.stId })
      })
      comp.push([{ name: team.name, winner: team.iswinner }, <StudentForm data={students} />])
  })

  return <TeamForm data={comp} />
}

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
    
      const retrieve = () => teams

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
              <FormControlLabel control={<Checkbox/>} value={inputField[0].winner}label="Winner" />
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
    
    console.log(props.data)
    let op = [];
    props.data.forEach((element) => {
        element.key = ++counter;
        op.push(element);

    });
    const [students, setStudents] = useState(op);
    
    const retrieve = () => students

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
        setStudents([...students, { key:++counter,  name: '', major: '', stId:null}])
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
  const [top, setTop] = useState([]);
  const getData = () => {
    setTop([{"name":"AIoT Hackathon with stc","link":"https://ultrahack.org/aiot-hackathon-stc","id":"A2QWDQWD","date":"2021-10-11T21:00:00.000+00:00","teams":[{"name":"Team 1","isWinner":"TRUE","students":[{"name":"Bassel Alqahtani","major":"CS","stId":"222243860"},{"name":"Naif Essam","major":"SWE","stId":"222246560"},{"name":"Majed Ahmad","major":"COE","stId":"222219260"},{"name":"Saleh Mohammed","major":"COE","stId":"222267500"}],"winner":true}]},{"name":"CyberuHub","link":"https://twitter.com/CyberhubSa","id":"WDWD1","date":"2021-10-01T21:00:00.000+00:00","teams":[{"name":"","students":[{"name":"Ahmad Mohammed","major":"CS","stId":"222253860"},{"name":"Abdullah Ali","major":"EE","stId":"222256560"},{"name":"Abdulaziz fawwaz","major":"MIS","stId":"222279260"},{"name":"Faris Ahmad","major":"SWE","stId":"222256700"}],"winner":false}]},{"name":"second","link":"https://ultrahack.org/aiot-hackathon-stc","id":"A2QWDQWD","date":"2021-10-11T21:00:00.000+00:00","teams":[{"name":"Team 1","isWinner":"TRUE","students":[{"name":"Bassel Alqahtani","major":"CS","stId":"222243860"}],"winner":true},{"name":"Team 2","isWinner":"FALSE","students":[{"name":"Bassel Alqahtanddi","major":"CS","stId":"222243860"}]}]}]);
    /*const result = await axios.get("http://localhost:8080/competitions/").then(response => {
    console.log(response.data);
    setTop(response.data);
  }).catch(error => this.setState({error,isLoading: false}));
  */
}
  const handleSubmit = (data,e) => {
      console.log(data)

      axios.get("http://localhost:8080/do","te").then(response => {
        console.log(response.data);
  });
  }
    return(
        <div id = 'create'>
                    <Header />
                    <div>
                        <Box component="form"sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }}noValidateautoComplete="off"> 
      <div>
        <form onSubmit={handleSubmit}>
      <Grid container spacing={5}>
          <Grid item xs={9}>
        <CompForm data={{"name":"AIoT Hackathon with stc","link":"https://ultrahack.org/aiot-hackathon-stc","id":"A2QWDQWD","date":"2021-10-11T21:00:00.000+00:00","teams":[{"name":"Team 1","isWinner":"TRUE","students":[{"name":"Bassel Alqahtani","major":"CS","stId":"222243860"},{"name":"Naif Essam","major":"SWE","stId":"222246560"},{"name":"Majed Ahmad","major":"COE","stId":"222219260"},{"name":"Saleh Mohammed","major":"COE","stId":"222267500"}],"winner":true}]}}/>
        </Grid>
          <Grid item xs={3}>
        <Button type="submit"> Submit</Button>
        </Grid>
        </Grid>
        </form>
        </div>
        </Box>
                    </div>
         </div>

            
        
    );  
}
export default Create;