import { Grid2 } from "@mui/material";
import WorkoutCard from "./WorkoutCard";

function WorkoutsList() {
  const test = [1, 2, 3, 4, 5];
  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      rowSpacing={8}
      sx={{
        mt: 2,
      }}
    >
      {test.map((item) => (
        <Grid2 size={8}>
          <WorkoutCard key={item} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default WorkoutsList;
