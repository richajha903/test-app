import axios from "axios"

async function validateAnswerApi(questionId, answer, handleResponse, handleError, setLoading){
    setLoading(true);
    try{
     
        const baseUrl = process.env.REACT_APP_API_URL
        const endpoint = "/v1/questions/validate-answer";
        const url  = `${baseUrl}${endpoint}`

        const requestBody ={
            id: questionId,
            answer
        }
         
        //we send post req to backend using axios
        const response = await axios.post(url, requestBody, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        handleResponse(response.data)

    }catch(error){
      handleError(error.response?.data?.message || "unknown error occured")
    }
    finally{
        setLoading(false)
    }
}

export default validateAnswerApi;