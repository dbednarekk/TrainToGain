import { Box } from "@mui/material";
import GymImage from "../assets/images/bgimage.jpg";
import Navbar from "../components/Navbar";
function Home() {
  return (
    <Box height="100vh" width="100vw" display="flex" flexDirection="column">
      <Navbar />
      <Box
        sx={{
          opacity: "0.8",
          backgroundImage: `url(${GymImage})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%",
        }}
      ></Box>
    </Box>
  );
}

export default Home;
