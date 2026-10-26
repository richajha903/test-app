import Logo from "../../assets/quiz-logo.svg"
import React from 'react'

const QuizLogo = ({size ="small"}) => {

    const allSizes ={
        small: 168,
        large: 306
    }
  return (
    <img src={Logo} alt="Quiz logo" width={allSizes[size]}>
      
    </img>
  )
}

export default QuizLogo


// size= small => width 168
//size = large => width 306