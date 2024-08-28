import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import Navbar from "../components/Navbar";
import UserDrawer from "../components/UserDrawer";
import WorkoutsList from "../components/WorkoutsList";
import { getSelfInfo } from "../utils/ApiCalls";
interface TokenPayload {
  user_id: string;
  iat: number;
  exp: number;
}
function UserPage() {
  const token = sessionStorage.getItem("token") || "";
  const decodedToken = decodeToken<TokenPayload>(token);
  const [user, setUser] = useState();

  const GetSelfInfo = async () => {
    await getSelfInfo(token, decodedToken?.user_id).then((res) => {
      setUser(res.data);
    });
  };
  useEffect(() => {
    GetSelfInfo();
  }, []);
  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="column"
      sx={{ bgcolor: "#f7f5f0" }}
    >
      <Navbar />
      <Box>
        <UserDrawer />
        <Box
          display="flex"
          flexGrow="2"
          position="relative"
          justifyContent="center"
          alignItems="center"
        >
          <WorkoutsList />
        </Box>
      </Box>
    </Box>
  );
}

export default UserPage;
