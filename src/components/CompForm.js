import { Container, TextField } from "@mui/material";
import { TeamForm, StudentForm } from "../sites/create"
 function CompForm(props) {
    return (

        <Container>
            <div>
                <TextField required
                    name="name"
                    label="Competition Name"
                    variant="filled"
                    value={props.data === undefined ? "" : props.data.name}

                />
                <TextField required
                    name="link"
                    label="Competition Link"
                    variant="filled"
                    value={props.data === undefined ? "" : props.data.link}

                />
                <TextField required
                    name="date"
                    label="Competition Date"
                    variant="filled"
                    value={props.data === undefined ? "" : props.data.date}
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
    props.teams.array.forEach(team => {
        let students = [];

        props.teams.array.forEach(student => {
            students.push({ name: student.name, major: student.major, stId: student.stId })
        })
        comp.push([{ name: team.name, winner: team.iswinner }, <StudentForm data={students} />])
    })

    return <TeamForm data={comp} />
}

export default CompForm;