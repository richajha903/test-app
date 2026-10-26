/*
  FILE: src/utils/handleError.js
  WHAT THIS FILE CARRIES:
  - One common error handler used by all API calls.
  - Logs the error in the console and shows it to the user with alert().
*/
function handleError(error) {
  console.error(error)
  alert(error)
}

export default handleError;
