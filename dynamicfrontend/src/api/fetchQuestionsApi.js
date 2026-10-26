/*
  FILE: src/api/fetchQuestionsApi.js
  WHAT THIS FILE CARRIES:
  - BACKEND CONNECTION: GET request to  {REACT_APP_API_URL}/v1/questions
  - Backend replies with { questions: [ {_id, question, options:[{id, value}]} ] }
  - Flow: setLoading(true) -> call API -> handleResponse(data) or handleError(msg) -> setLoading(false)
*/
import axios from "axios"

async function fetchQuestionsApi(handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = process.env.REACT_APP_API_URL
    const endpoint = "/v1/questions";
    const url = `${baseUrl}${endpoint}`

    const response = await axios.get(url)

    handleResponse(response.data)
  } catch (error) {
    handleError(error.response?.data?.message || "unknown error occured")
  } finally {
    setLoading(false)
  }
}

export default fetchQuestionsApi
