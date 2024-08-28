import { Grid } from "@mui/material";
import WorkoutCard from "./WorkoutCard";

function WorkoutsList() {
  const test = [1, 2, 3, 4, 5];
  return (
    <Grid
      spacing={2}
      sx={{
        mt: 2,
      }}
    >
      {test.map((item) => (
        <Grid>
          <WorkoutCard key={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default WorkoutsList;
