/*
  FILE: src/api/validateAnswerApi.js
  WHAT THIS FILE CARRIES:
  - BACKEND CONNECTION: POST request to  {REACT_APP_API_URL}/v1/questions/validate-answer
  - Sends { id: questionId, answer: {id, value} }
  - Backend replies { status: 1 } for correct answer, { status: 0 } for wrong answer.
  - Flow: setLoading(true) -> call API -> handleResponse(data) or handleError(msg) -> setLoading(false)
*/
import axios from "axios"

async function validateAnswerApi(questionId, answer, handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = process.env.REACT_APP_API_URL
    const endpoint = "/v1/questions/validate-answer";
    const url = `${baseUrl}${endpoint}`

    const requestBody = {
      id: questionId,
      answer
    }

    // send POST request to backend using axios
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    handleResponse(response.data)
  } catch (error) {
    handleError(error.response?.data?.message || "unknown error occured")
  } finally {
    setLoading(false)
  }
}

export default validateAnswerApi;
