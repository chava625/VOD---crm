export const auth = async() => {
    if(!localStorage["token"]){
      return window.location.href = "login.html"
    }
    try{
      let myData = await axios.get("/users/auth",{
        headers: {
          "x-auth-token": localStorage["token"],
        }
      })
      return myData.data
    }
    catch(err){
      alert("Token invalid or expired please try login again");
      localStorage.removeItem("token");
      return window.location.href = "login.html"
    }   
  }