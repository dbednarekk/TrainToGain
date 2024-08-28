import { Card, CardContent, Typography } from "@mui/material";

function WorkoutCard() {
  return (
    <Card
      sx={{
        minWidth: { sm: 200, xs: 100 },
        minHeight: { sm: 700, xs: 350 },
      }}
    >
      <CardContent>
        <Typography>test</Typography>
      </CardContent>
    </Card>
  );
}

export default WorkoutCard;
