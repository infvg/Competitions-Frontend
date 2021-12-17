import { Button, Checkbox, Container, TextField } from "@mui/material";
import { useState } from "react";
import StudentForm from "./StudentForm";

let counter = 1;
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
            if(event.target.name === "teamwinner")
                i[event.target.name] = event.target.checked
                else
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setTeams(newInputFields);
      }
    
    const handleAddFields = () => {
        setTeams([...teams, [{key:++counter},<StudentForm data={[{studentname: "", studentmajor: "", studentstId: ""},]} />]])
        
      }
    
      const handleRemoveFields = key => {
        const values  = [...teams];
        values.splice(values.findIndex(value => {
          console.log(value[0])
          return value[0].key === key}), 1);
        setTeams(values);
      }
      
    return (
        <Container>
          { teams.map((inputField,i) => (
            <div key={inputField.key}>
              <TextField required
                label="Team Name"
                variant="filled"
                name="teamname"
                value={inputField[0].teamname}
                onChange={event => handleChangeInput(inputField[0].key, event)}
              />
                              <Checkbox
                              checked={inputField[0].teamwinner}
                              onChange={event => handleChangeInput(inputField[0].teamname)}
                              name = "teamwinner"
                              inputProps={{ 'aria-label': 'controlled' }}
                               />

               <Button disabled={teams.length === 1} onClick={() => handleRemoveFields(inputField[0].key)}>
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

export default TeamForm