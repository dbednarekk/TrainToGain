export interface TokenPayload {
  user_id: string;
  iat: number;
  exp: number;
}

export interface IUser {
  login: string;
  email: string;
  user_details: {
    first_name: string;
    last_name: string;
    age: number;
    height: number;
    weight: number;
    picture: string;
  };
}
export interface IUserObject {
  user: IUser;
}
export interface IWorkout {
  id: string;
  createdBy: string;
  name: string;
  description: string;
  duration: string;
  createdAt: string;
  details: Array<IWorkoutDetails>;
  exercises: Array<IExercise>;
}
export interface IWorkoutObject {
  workout: IWorkout;
}
export interface IWorkoutList {
  count: number;
  next: string;
  previous: string;
  results: IWorkout[];
}

export interface IWorkoutCardProps {
  workout: IWorkout;
  user: IUser;
}
export interface IWorkoutDetails {
  id: string;
  workout: string;
  exercise: string;
  number_of_reps: number;
  weight: number;
}
export interface IExercise {
  id: string;
  name: string;
  picture: string;
  description: string;
  muscle_type: string;
}
