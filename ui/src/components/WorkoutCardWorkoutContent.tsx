import {
  Divider,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { IWorkoutObject } from "../interfaces/ApiInterface";
function CalculateVolume(exercises: any) {
  let volume = 0;
  exercises.forEach((exercise: any) => {
    volume += exercise.number_of_reps * exercise.weight;
  });
  return volume;
}
function WorkoutCardWorkoutContent(workoutObj: IWorkoutObject) {
  const workout = workoutObj.workout;
  return (
    <>
      <Typography variant="h5" sx={{ pb: 2 }}>
        {workout.name}
      </Typography>
      <Typography variant="body1" sx={{ pb: 1, fontStyle: "italic" }}>
        {workout.description}
      </Typography>
      <Table
        size="small"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
          maxWidth: "200px",
          borderBottom: "none",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 0 }}>
              <Typography variant="caption" color="textSecondary">
                Duration
              </Typography>
            </TableCell>
            <TableCell sx={{ pl: 0 }}>
              <Typography variant="caption" color="textSecondary">
                Volume
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ pl: 0 }}>
              <Typography variant="body2">{workout.duration}</Typography>
            </TableCell>
            <TableCell sx={{ pl: 0 }}>
              <Typography variant="body2">
                {CalculateVolume(workout.details)} kg
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Divider sx={{ pt: 2 }} />
    </>
  );
}

export default WorkoutCardWorkoutContent;
