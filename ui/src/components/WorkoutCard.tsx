import { Card, CardContent, Typography } from "@mui/material";

function WorkoutCard() {
  return (
    <Card
      sx={{
        minWidth: 200,
        minHeight: 400,
      }}
    >
      <CardContent>
        <Typography>test</Typography>
      </CardContent>
    </Card>
  );
}

export default WorkoutCard;
