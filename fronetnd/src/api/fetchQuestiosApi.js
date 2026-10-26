import axios from "axios"
async function fetchQuestionsApi(handleResponse, handleError, setLoading){
    setLoading(true);
    try{
     
        const baseUrl = process.env.REACT_APP_API_URL
        const endpoint = "/v1/questions";
        const url  = `${baseUrl}${endpoint}`
         
        const response = await axios.get(url)

        handleResponse(response.data)

    }catch(error){
      handleError(error.response?.data?.message || "unknown error occured")
    }
    finally{
        setLoading(false)
    }
}

export default fetchQuestionsApi