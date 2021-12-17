import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TeamRow from "./TeamRow";
import StudentRow from "./StudentRow";
import { Table, TableHead } from "@mui/material";
function allStudents(props){
  let OverOne = false;
    props.teams.map(team => {
      if(team.students.length > 1)
        OverOne = true;

  });
    return OverOne;
}

function CompRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right"><a href ={row.link}>{row.link}</a></TableCell>
        <TableCell align="right">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              { allStudents(row) ?
              
              (<div>
                <Typography variant="h6" gutterBottom component="div">
                Teams
              </Typography>
                {row.teams.map((team) => (
                <TeamRow key={team.name} row={team} comp={row.name}/>
              ))}</div>) : (<div>
                <Typography variant="h6" gutterBottom component="div">
                Students
              </Typography>
              <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Student ID</TableCell>
                      <TableCell align="right">Major</TableCell>
                    </TableRow>
                  </TableHead>
                {row.teams.map((team) => (
                <StudentRow key={team.name} row={team} comp={row.name}/>
                
              ))}
              </Table>
              </div>)
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
CompRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        winner: PropTypes.bool,
        students: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            stId: PropTypes.string.isRequired,
            major: PropTypes.string.isRequired
          })
        )
      })
    ).isRequired
  }).isRequired
};

export default CompRow