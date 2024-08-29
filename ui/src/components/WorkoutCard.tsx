import { Card, CardContent, Typography } from "@mui/material";

interface WorkoutCardProps {
  title: string;
  description: string;
  exercises: string[];
  duration: string;
  createdBy: string;
}

function WorkoutCard(props: WorkoutCardProps) {
  return (
    <Card
      sx={{
        minWidth: { sm: 200, xs: 100 },
        minHeight: { sm: 700, xs: 350 },
      }}
    >
      <CardContent>
        <Typography>{props.title}</Typography>
        <Typography>{props.description}</Typography>
        <Typography>{props.duration}</Typography>
        <Typography>{props.createdBy}</Typography>
      </CardContent>
    </Card>
  );
}

export default WorkoutCard;
