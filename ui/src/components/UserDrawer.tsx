import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const userLinks = [
  {
    text: "Profile",
    href: "profile/",
    icon: SettingsAccessibilityIcon,
  },
  {
    text: "Exercises",
    href: "exercises/",
    icon: FitnessCenterIcon,
  },
  {
    text: "Workouts",
    href: "workouts/",
    icon: ChecklistIcon,
  },
  {
    text: "Routines",
    href: "routines/",
    icon: EventNoteIcon,
  },
  {
    text: "Statistics",
    href: "statistics/",
    icon: AutoGraphIcon,
  },
];
function UserDrawer() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: { sm: "200px", xs: "60px" },
        position: "sticky",
      }}
      PaperProps={{
        sx: { width: { sm: "200px", xs: "60px" } },
      }}
    >
      <List>
        {userLinks.map((link) => (
          <ListItem disablePadding key={link.text}>
            <ListItemButton
              onClick={() => navigate(link.href)}
              sx={{
                p: 2,
                pl: { sm: 3, xs: 2 },
              }}
            >
              <ListItemIcon sx={{ minWidth: "35px" }}>
                {link.icon && <link.icon />}
              </ListItemIcon>
              <ListItemText
                primary={link.text}
                sx={{ opacity: { sm: 1, xs: 0 } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default UserDrawer;
