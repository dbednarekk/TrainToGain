import { Box, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import Navbar from "../components/Navbar";
import UserDrawer from "../components/UserDrawer";
import WorkoutCard from "../components/WorkoutCard";
import { IUser, IWorkoutList, TokenPayload } from "../interfaces/ApiInterface";
import { get, getSelfInfo } from "../utils/ApiCalls";

function WorkoutListPage() {
  const token = sessionStorage.getItem("token") || "";
  const decodedToken = decodeToken<TokenPayload>(token);
  const [user, setUser] = useState<IUser>();
  const [workouts, setWorkouts] = useState<IWorkoutList>();

  const GetSelfInfo = async () => {
    await getSelfInfo(token, decodedToken?.user_id).then((res) => {
      setUser(res.data);
    });
    await get("training/workouts/self", token).then((res) => {
      setWorkouts(res.data);
    });
  };
  useEffect(() => {
    GetSelfInfo();
  }, []);
  return (
    <Box sx={{ bgcolor: "#f7f5f0" }}>
      <Navbar />
      <Box display="flex">
        <UserDrawer />

        <Grid2
          container
          flexDirection="column"
          spacing={8}
          flexGrow={4}
          justifyContent="center"
          alignItems="center"
          sx={{
            mt: 2,
          }}
        >
          {workouts?.results.length !== 0 ? (
            workouts?.results.map((workout) => (
              <Grid2 key={workout.name}>
                <WorkoutCard workout={workout} user={user!} />
              </Grid2>
            ))
          ) : (
            <Typography variant="h1" height="90vh">
              No workouts found
            </Typography>
          )}
        </Grid2>
      </Box>
    </Box>
  );
}

export default WorkoutListPage;
