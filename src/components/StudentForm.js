import { Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function StudentForm(props) {
    
    let op = [];
    props.data.forEach((element) => {
        element.key = uuidv4();
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
        setStudents([...students, { key:uuidv4(),  studentname: '', studentmajor: '', studentstId:null}])
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
                name="studentstId"
                variant="filled"
                type="number"
                value={inputField.studentstId}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
              <TextField required
                label="Name"
                name="studentname"
                variant="filled"
                value={inputField.studentname}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
                <TextField required
                label="Major"
                name="studentmajor"
                variant="filled"
                value={inputField.studentmajor}
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

  export default StudentForm