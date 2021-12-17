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
    let curteam = 0;
    let curstudent = 0;
    data.forEach((d,i) => {
     if(i.startsWith("comp")){
       comp[i.split("comp")[1]] = d;
     }else if(i.startsWith("team")){
       if(i === "teamname" &&  comp.teams[curteam] !== undefined){
        curteam++;
       }
         if(i === "teamwinner"){
           comp.teams[curteam][i.split("team")[1]] = true;
           curstudent = 0;
         }else{
          comp.teams.push({students:[]});
          comp.teams[curteam][i.split("team")[1]] = d;
         }
     }else  if(i.startsWith("student")){
       
       if(comp.teams[curteam]["winner"]===undefined){
         
          comp.teams[curteam]["winner"] = false;
          curstudent = 0;
        }
        if(i.startsWith("studentstId")){
          comp.teams[curteam]["students"].push({});
        }
        comp.teams[curteam]["students"][curstudent][i.split("student")[1]] = d;
       if(i === "studentmajor"){
         curstudent++;
       }
         
     
     }
    })

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