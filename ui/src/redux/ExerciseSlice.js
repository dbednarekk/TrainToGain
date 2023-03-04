import {createSlice} from '@reduxjs/toolkit'


export const ExerciseSlice = createSlice({
    name:"ExerciseSlice",
    initialState:{
        exercise:{
            id: '',
            name: '',
            description: '',
            muscle_type: '',
            picture: ''
        }
    },
    reducers:{
        setExerciseSlice: (state, action) =>{
            state.exercise = action.payload

        },
    }
})

export const {setExerciseSlice} = ExerciseSlice.actions
export const selectExercise = (state) => state.exerciseSlices.exercise
export default ExerciseSlice.reducer