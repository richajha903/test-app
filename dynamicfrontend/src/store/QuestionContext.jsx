/*
  FILE: src/store/QuestionContext.jsx
  WHAT THIS FILE CARRIES:
  - Creates an empty React Context named QuestionContext.
  - It is the "box" that will hold quiz data so any screen can read it
    without passing props down manually. The data itself is put in by QuestionProvider.
*/
import { createContext } from "react";

const QuestionContext = createContext();

export default QuestionContext
