import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import GymImage from "../assets/images/gym1.jpg";
import Gym2Image from "../assets/images/wp2639541-gym-wallpaper-hd.jpg";
function Home() {
  return (
    <>
      <Navbar></Navbar>

      <Box
        sx={{
          margin: "5px",

          opacity: "0.9",
        }}
      >
        <img src={Gym2Image} alt="GymImage" width="100%" />
      </Box>
    </>
  );
}

export default Home;
