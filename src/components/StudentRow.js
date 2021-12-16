import React from 'react';
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function StudentRow(props) {
    const { row } = props;
    let isWinner = row.isWinner;
  
    return (
      
      <React.Fragment>
                    <TableBody>
                      {row.students.map((student) => (
  
                        <TableRow key={student.name}>
                          <TableCell component="th" scope="row">
                            {student.name}
                          </TableCell>
                          <TableCell>{student.stId}</TableCell>
                          <TableCell align="right">{student.major}</TableCell>
                          {isWinner? <TableCell onClick={e => {
                            email(row.students,props.comp,student.name)
                          }}>Winner</TableCell> : (<TableCell align="right"></TableCell> )}
                        </TableRow>
                      ))}
                    </TableBody>
      </React.Fragment>
    );
}

function email(students, competition, dear) {
    window.location = "mailto:" + getemails(students) + "?subject=Congratulations%20on%20achieving%20a%20win%20in%20"+competition+"&body=Dear%20"+dear+"%2C%0D%0A%0D%0AConguratulations%20on%20your%20achievement%20in%20"+competition+".%20This%20achievement%20is%20deeply%20appreciated%20by%20the%20unversity%20and%20we%20will%20announce%20it%20in%20the%20approbrite%20medias.%0D%0A%0D%0AIn%20case%20you%20have%20Photos%20you%20want%20to%20share%20with%20the%20news%20post%2C%20reply%20to%20this%20email%20with%20the%20photos.%0D%0A%0D%0ARegards%20and%20Congrats%2C%0D%0AKFUPM%20News%20Team%0D%0A";
}

function getemails(students) {
    let emails = [];
      students.forEach(student => {
        emails.push("s" + student.stId + "@kfupm.edu.sa")
      });
      return emails.join(",");
  }


StudentRow.propTypes = {
row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isWinner: PropTypes.bool,
    students: PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string.isRequired,
        stId: PropTypes.string.isRequired,
        major: PropTypes.string.isRequired
    })
    )
})
};

export default StudentRow;