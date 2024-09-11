import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IWorkoutCardProps } from "../interfaces/ApiInterface";
import ContainedButton from "./CustomButton";
import WorkoutCardWorkoutContent from "./WorkoutCardWorkoutContent";
type Sets = {
  [key: string]: number;
};

function WorkoutDetailsRow(props: any) {
  const { name, count, picture } = props.props;

  return (
    <TableRow>
      <TableCell>
        {
          <Avatar
            src={picture ? picture : "/invalid-image.jpg"}
            alt={name.toUpperCase()}
            sx={{
              width: { sm: 80, xs: 40 },
              height: { sm: 80, xs: 40 },
            }}
          />
        }
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          {name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          {count}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

function WorkoutCard(props: IWorkoutCardProps) {
  const { workout, user } = props;
  console.log(workout);
  // Group exercises by name and calculate the number of sets
  const sets = workout.details.reduce((p: Sets, c) => {
    const name = c.exercise;
    if (!Object.prototype.hasOwnProperty.call(p, name)) {
      p[name] = 0;
    }
    p[name]++;
    return p;
  }, {});

  // Extend the sets object with the picture of the exercise
  const setsExtended = Object.keys(sets).map((k) => {
    return {
      name: k,
      count: sets[k],
      picture: workout.exercises.filter((e: any) => e.name === k)[0].picture,
    };
  });

  return (
    <Card
      sx={{
        maxWidth: { sm: 800, xs: 350 },
        minWidth: { sm: 700, xs: 350 },
        minHeight: { sm: 700, xs: 350 },
        borderRadius: 2,
      }}
    >
      <CardHeader
        sx={{
          m: 2,
          "& .MuiCardHeader-avatar": {
            pr: 2,
          },
        }}
        avatar={
          <Avatar
            sx={{
              width: { sm: 64, xs: 32 },
              height: { sm: 64, xs: 32 },
            }}
            src={
              user.user_details.picture
                ? user.user_details.picture
                : "/invalid-image.jpg"
            }
            alt={user.login.toUpperCase()}
          />
        }
        title={user.login}
        subheader={workout.createdAt}
      />
      <CardContent sx={{ m: 2 }}>
        <WorkoutCardWorkoutContent workout={workout} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="subtitle1" color="textSecondary">
                  NAME
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color="textSecondary">
                  SETS
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {setsExtended.slice(0, 3).map((exercise) => (
              <WorkoutDetailsRow key={exercise.name} props={exercise} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        {setsExtended.length > 3 ? (
          <ContainedButton
            startIcon={<KeyboardArrowDownIcon />}
            variant="outlined"
            text={`See ${setsExtended.length - 3} more exercises`}
            href={`/user/workout/${workout.id}`}
          />
        ) : (
          <ContainedButton
            startIcon={<KeyboardArrowDownIcon />}
            variant="outlined"
            text="See details"
            href={`/user/workout/${workout.id}`}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default WorkoutCard;
