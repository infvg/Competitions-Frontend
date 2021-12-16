import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import CompForm from '../components/CompForm';
import '../css/create.css';
import Header from './headerBar'

function Create(){

  const handleSubmit = (e) => {
      e.preventDefault();
     const data = new FormData(e.target);

     let comp = {teams : []};
     let team = {students: []}
     let student = {}
     data.forEach((d,i) => {
      if(i.startsWith("comp")){
        comp[i.split("comp")[1]] = d;
      }else if(i.startsWith("team")){
        if(team["students"].length > 0){
          comp["teams"].push(team);
          team = {students: []}
        }
          if(i === "teamisWinner"){
            team[i.split("team")[1]] = true;
          }else{
          team[i.split("team")[1]] = d;
          }
      }else  if(i.startsWith("student")){
        if(team["isWinner"]===undefined)
          team["isWinner"] = false;

        if(student["major"] !== undefined){
          team["students"].push(student);
          student = {}
        }
          student[i.split("student")[1]] = d;
      
      }
     })
     team["students"].push(student)
     comp["teams"].push(team)
     axios.post("http://localhost:8080/competitions/",comp).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    window.location.href = "/";
  };
  
    return(
        <div id = 'create'>
                    <Header />
                    <div>
                        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }}noValidateautoComplete="off" onSubmit={handleSubmit}> 
      <div>
      <Grid container spacing={5}>
          <Grid item xs={9}>
        <CompForm />
        </Grid>
          <Grid item xs={3}>
        <Button type="submit"> Submit</Button>
        </Grid>
        </Grid>
        </div>
        </Box>
                    </div>
         </div>

            
        
    );  
}
export default Create;