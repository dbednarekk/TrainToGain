import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import StraightenIcon from "@mui/icons-material/Straighten";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ChangePassword from "../components/ChangePassword";
import EditAccount from "../components/EditAccount";
import Navbar from "../components/Navbar";
import UserDrawer from "../components/UserDrawer";
import { IUser } from "../interfaces/ApiInterface";
import { getSelfInfo } from "../utils/ApiCalls";
interface TokenPayload {
  user_id: string;
  iat: number;
  exp: number;
}

function UserProfilePage() {
  const token = sessionStorage.getItem("token") || "";
  const decodedToken = decodeToken<TokenPayload>(token);
  const [user, setUser] = useState<IUser>();
  const [accountView, setAccountView] = useState(true);

  const [measurementsView, setMeasurementsView] = useState(false);
  const handleAccount = () => {
    setMeasurementsView(false);
    setAccountView(true);
  };
  const handleMeasurements = () => {
    setAccountView(false);
    setMeasurementsView(true);
  };
  const GetSelfInfo = async () => {
    await getSelfInfo(token, decodedToken?.user_id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.detail);
      });
  };
  useEffect(() => {
    GetSelfInfo();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ bgcolor: "#f7f5f0", height: "100vh" }}
    >
      <Navbar />
      <Box
        display="flex"
        sx={{
          height: { sm: "100vh", xs: "none" },
        }}
      >
        <UserDrawer />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          flexGrow={4}
        >
          <Paper
            elevation={2}
            square={false}
            sx={{
              width: { sm: 1000, xs: 350 },
              height: "100%",
              mt: 2,
            }}
          >
            <Box
              display="flex"
              sx={{
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: { sm: 200, xs: 60 },
                }}
              >
                <List>
                  <ListItem disablePadding divider>
                    <ListItemButton onClick={handleAccount}>
                      <ListItemIcon sx={{ minWidth: "35px" }}>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        <Typography variant="subtitle1">Account</Typography>
                      </ListItemText>
                      <ListItemIcon
                        sx={{
                          minWidth: "0px",
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        <KeyboardArrowRightIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding divider sx={{ pt: 1 }}>
                    <ListItemButton onClick={handleMeasurements}>
                      <ListItemIcon sx={{ minWidth: "35px" }}>
                        <StraightenIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        <Typography variant="subtitle1">
                          Measurements
                        </Typography>
                      </ListItemText>
                      <ListItemIcon
                        sx={{
                          minWidth: "0px",
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        <KeyboardArrowRightIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
              <Divider orientation="vertical" />
              <Box flexGrow={2}>
                {user && accountView && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Paper
                      square={false}
                      variant="outlined"
                      sx={{
                        display: "flex",
                        p: 2,
                        mt: 2,
                        width: { sm: 400, xs: 200 },
                      }}
                    >
                      <Avatar
                        src={user?.user_details.picture}
                        sx={{
                          width: { sm: 80, xs: 40 },
                          height: { sm: 80, xs: 40 },
                        }}
                      />
                      <Box
                        sx={{
                          ml: 2,
                          mt: 1,
                        }}
                      >
                        <Typography variant="h5">{user?.login}</Typography>
                        <Typography variant="subtitle1">
                          {user?.email}
                        </Typography>
                      </Box>
                    </Paper>
                    <EditAccount user={user!} />
                    <Box
                      sx={{
                        height: "100px",
                      }}
                    />
                    <ChangePassword />
                  </Box>
                )}
                {measurementsView && (
                  <Typography variant="h4">To be done.</Typography>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfilePage;
