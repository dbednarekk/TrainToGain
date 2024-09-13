import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import theme from "../components/Theme";
import UserDrawer from "../components/UserDrawer";
import WorkoutCardWorkoutContent from "../components/WorkoutCardWorkoutContent";
import { IWorkout, IWorkoutDetails } from "../interfaces/ApiInterface";
import { get } from "../utils/ApiCalls";

function ExerciseDetailsRow({
  name,
  picture,
  exercise,
}: {
  name: string;
  picture: string;
  exercise: Array<IWorkoutDetails>;
}) {
  console.log(exercise);
  const description = exercise.find((ex) => ex.exercise === name)?.description;
  return (
    <Table
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: "70px", pt: 6 }}>
            <Avatar
              sx={{
                width: { sm: 64, xs: 32 },
                height: { sm: 64, xs: 32 },
              }}
              src={picture}
              alt={name.toUpperCase()}
            />
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ pt: 2 }}>
              {name}
            </Typography>
            <Typography variant="subtitle1">{description}</Typography>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              SETS
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              WEIGHT
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              REPS
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {exercise.map((ex, index) => (
          <TableRow
            key={index}
            sx={{
              "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <TableCell align="center" size="small">
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {index + 1}
              </Typography>
            </TableCell>
            <TableCell align="center" size="small">
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {ex.weight} kg
              </Typography>
            </TableCell>
            <TableCell align="center" size="small">
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {ex.number_of_reps}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
function WorkoutDetailsPage() {
  const { id } = useParams();
  const token = sessionStorage.getItem("token") || "";
  const [workout, setWorkout] = useState<IWorkout>();
  const getWorkoutInfo = async () => {
    await get(`training/workout/${id}`, token)
      .then((res) => {
        setWorkout(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  };
  useEffect(() => {
    getWorkoutInfo();
  }, []);
  const groupedExercises =
    workout &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.groupBy(
      workout!.details,
      ({ exercise }: { exercise: string }) => exercise
    );

  return (
    <Box sx={{ bgcolor: "#f7f5f0" }}>
      <Navbar />
      <Box display="flex" justifyContent="center">
        <UserDrawer />
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
            title={workout?.createdBy}
            subheader={workout?.createdAt}
          />
          <CardContent>
            {workout && <WorkoutCardWorkoutContent workout={workout} />}
            {groupedExercises &&
              Object.keys(groupedExercises).map((exercise) => (
                <ExerciseDetailsRow
                  key={exercise}
                  name={exercise}
                  picture={
                    workout.exercises.find((ex) => ex.name === exercise)
                      ?.picture || "invalid-image.jpg"
                  }
                  exercise={groupedExercises[exercise]}
                />
              ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default WorkoutDetailsPage;
