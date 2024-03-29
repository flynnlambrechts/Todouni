import React from "react";
import {
    ListItem,
    ListItemText,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { deleteTask } from "../../helpers";

function TaskListItem(props) {
    // props: {subjectId, data: {name, hour, minute, ampm, recurring, selectedDays: [], week?, duration?}}
    const data = props.data;
    return (
        <ListItem
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
            secondaryAction={
                <IconButton>
                    <DeleteIcon onClick={() => deleteTask(props.subjectId, data.name)}></DeleteIcon>
                </IconButton>
            }>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={5}>
                    <ListItemText>{data.name}</ListItemText>
                </Grid>
                <Grid xs={3}>
                    {/* <Divider orientation="vertical" flexItem /> */}
                    <ListItemText>
                        {data.hour}:{data.minute ? data.minute.padStart(2, "0") : "00"} {data.ampm}
                    </ListItemText>
                </Grid>
                <Grid xs={2}>
                    <ListItemText>
                        {data.recurring ? "Recurs" : "Week " + data.week}
                    </ListItemText>
                </Grid>
                <Grid xs={1}>
                        {data.selectedDays.map((day) => (
                            <ToggleButton fullWidth color="primary" key={day} value={day}>
                                {day}
                            </ToggleButton>
                        ))}
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default TaskListItem;
