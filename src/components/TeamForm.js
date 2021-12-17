import { Button, Checkbox, Container, TextField } from "@mui/material";
import { keys } from "@mui/system";
import React, { useState } from "react";
import StudentForm from "./StudentForm";
import { v4 as uuidv4 } from 'uuid';

function TeamForm(props){
    const [teams, setTeams] = useState([...props.data]);
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
        const qwe= uuidv4()
        setTeams([...teams, [{key:qwe},<StudentForm data={[{studentname: "", studentmajor: "", studentstId: ""},]}/>]])
        
      }
    
      const handleRemoveFields = key => {
        setTeams(teams.filter((item) => item[0].key !== key));
    }

    return (
        <Container>
          { teams.map((inputField,i) => (
            <div key={inputField.key}>
              <TextField required
                label="Team Name"
                variant="filled"
                defaultValue={inputField[0].teamname}
                name="teamname"
                onChange={event => handleChangeInput(inputField[0].key, event)}
              />
                              <Checkbox
                              defaultChecked={inputField[0].teamwinner}
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