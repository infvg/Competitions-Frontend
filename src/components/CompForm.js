import { Container, TextField } from "@mui/material";
import StudentForm from "./StudentForm";
import TeamForm from "./TeamForm";
import { v4 as uuidv4 } from 'uuid';

function CompForm(props) {


    return (
  
        <Container>
            <div key={props.data === undefined ? "QDWIJQWOID" : props.data.id}>
                <TextField required
                    name="compname"
                    label="Competition Name"
                    variant="filled"
                    defaultValue={props.data === undefined ? "" : props.data.name}
  
                />
                <TextField required
                    name="complink"
                    label="Competition Link"
                    variant="filled"
                    defaultValue={props.data === undefined ? "" : props.data.link}
  
                />
                <TextField required
                    name="compdate"
                    label="Competition Date"
                    variant="filled"
                    defaultValue={props.data === undefined ? "" : props.data.date}
                    type="date"
                />
                <TextField
                    name="compid"
                    type="hidden"
                    defaultValue={props.data === undefined ? uuidv4().substring(0,30) : props.data.id}
  
                />
                {getFromCompetition(props.data)}
            </div>
  
        </Container>
  
    );
  
  }
  function getFromCompetition(props) {
    if (props === undefined)
        return <TeamForm data={[[{}, <StudentForm data={[{ studentname: "", studentmajor: "", studentstId: "" },]} />]]} />;
    

    let comp = []
    props.teams.forEach(team => {
        let students = [];
        console.log(team.name)

        team.students.forEach(student => {
            students.push({ studentname: student.name, studentmajor: student.major, studentstId: student.stId })
        })
        comp.push([{ teamname: team.name, teamwinner: team.winner }, <StudentForm data={students} />])
    })
  
    return <TeamForm data={comp} />
  }



  export default CompForm;