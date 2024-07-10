Cypress.on("uncaught:exception", (error, runnable)=>{
   // Only ignore specific exceptions if necessary
  if (error.message.includes("specific known issue")) {
    return false;
  }
  // Otherwise, let the test fail
  return true;
})