/*
  FILE: src/components/Main.jsx
  WHAT THIS FILE CARRIES:
  - Screen switcher: shows Welcome, Question or Result screen.
  - STATIC VERSION: only a simple useState to move between screens so every
    screen can be viewed.
*/
import React, { useState } from 'react'
import WelcomeScreen from './WelcomeScreen'
import QuestionScreen from './QuestionScreen'
import ResultScreen from './ResultScreen'

const Main = () => {
  const [viewScreen, setViewScreen] = useState("welcome")

  const showQuestionScreen = () => setViewScreen("question")
  const showResultScreen = () => setViewScreen("result")

  return (
    <div>
      {viewScreen === "welcome" && <WelcomeScreen showQuestionScreen={showQuestionScreen} />}
      {viewScreen === "question" && <QuestionScreen showResultScreen={showResultScreen} />}
      {viewScreen === "result" && <ResultScreen showQuestionScreen={showQuestionScreen} />}
    </div>
  )
}

export default Main
