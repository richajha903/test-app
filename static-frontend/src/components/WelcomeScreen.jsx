/*
  FILE: src/components/WelcomeScreen.jsx
  WHAT THIS FILE CARRIES:
  - First screen of the quiz: logo, "Are You Ready?" card, rules list and Start button.
  - STATIC VERSION: Start button just switches to the Question screen.
    It does NOT fetch questions from the backend.
*/
import React from 'react'
import QuizLogo from "./ui/QuizLogo"
import Card from "./ui/Card"
import Button from "./ui/Button"

import QuestionBubble from "../assets/question-bubble.png"
import GreenCheckMark from "../assets/check-circle-green.svg"

const WelcomeScreen = ({ showQuestionScreen }) => {
  return (
    <section className='welcome-section'>
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className='welcome-card-content-top'>
          <img src={QuestionBubble} width={172} alt="Question bubble" />
          <h2>Are You Ready?</h2>
          <h3>Let's see how many questions you can answer:</h3>
        </div>
        <ul className='welcome-card-list'>
          <li className='list-item'>
            <img src={GreenCheckMark} alt="" />
            There are 30 Questions
          </li>
          <li className='list-item'>
            <img src={GreenCheckMark} alt="" />
            You need to pick 1 ans
          </li>
        </ul>
        <Button size="large" onClick={showQuestionScreen}>
          I’m Ready - Start the Quiz
        </Button>
      </Card>
    </section>
  )
}

export default WelcomeScreen
