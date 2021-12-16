import { Box, Button, Grid } from "@mui/material";
import CompForm from "../components/CompForm";
import Header from "./headerBar";

function Modify() {

    const handleSubmit = () => {
        
    }
    return (
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
export default Modify