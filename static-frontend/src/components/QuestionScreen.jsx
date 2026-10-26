/*
  FILE: src/components/QuestionScreen.jsx
  WHAT THIS FILE CARRIES:
  - Question screen layout: logo, progress bar, question card with number,
    question text, 4 option buttons and a Next button.
  - STATIC VERSION: uses one hardcoded sample question. Clicking an option does
    nothing (no answer validation). Next button just opens the Result screen.
*/
import React from 'react'
import Card from "./ui/Card"
import Button from "./ui/Button"
import ProgressBar from "./ui/ProgressBar"
import QuizLogo from "./ui/QuizLogo"
import NextArrow from "../assets/chevron-left-rounded.svg"

// hardcoded sample data (in dynamic version this comes from the backend)
const sampleQuestion = {
  question: 'Which planet is known as the "Red Planet"?',
  options: [
    { id: 1, value: "Earth" },
    { id: 2, value: "Mars" },
    { id: 3, value: "Venus" },
    { id: 4, value: "Jupiter" }
  ]
}

function NextArrowIcon() {
  return <img src={NextArrow} alt='Next Question' />
}

const QuestionScreen = ({ showResultScreen }) => {
  return (
    <section className='question-section'>
      <QuizLogo />
      <ProgressBar />
      <div className='question-content'>
        <Card className="question-card">
          <div className='question-number'>1/30</div>

          <p className='question-text'>{sampleQuestion.question}</p>

          <div className='question-options'>
            {sampleQuestion.options.map((option) => (
              <button className="option not-answered" key={option.id}>
                {option.value}
                <span className='unattempted-radio' />
              </button>
            ))}
          </div>

          <Button icon={<NextArrowIcon />} iconPosition="right" onClick={showResultScreen}>
            Next
          </Button>
        </Card>
      </div>
    </section>
  )
}

export default QuestionScreen
