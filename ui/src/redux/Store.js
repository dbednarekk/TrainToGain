import { configureStore } from "@reduxjs/toolkit";
import ExerciseSliceReducer from "./ExerciseSlice";
import UserSliceReducer from "./UserSlice";
export default configureStore({
  reducer: {
    userSlices: UserSliceReducer,
    exerciseSlices: ExerciseSliceReducer
  },
});
