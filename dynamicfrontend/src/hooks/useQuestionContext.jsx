/*
  FILE: src/hooks/useQuestionContext.jsx
  WHAT THIS FILE CARRIES:
  - Small custom hook: useQuestionContext() = useContext(QuestionContext).
  - Any component calls it to read quiz data/actions from QuestionProvider.
*/
import { useContext } from "react";
import QuestionContext from "../store/QuestionContext";

function useQuestionContext() {
  return useContext(QuestionContext);
}

export default useQuestionContext
