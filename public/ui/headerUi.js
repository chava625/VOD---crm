$(() => {
    createHeader();
  })
  
  
  const createHeader = () => {
    fetch("ui/headerUi.html")
    .then(resp => resp.text())
    .then(data => {
      $("body").prepend(data)
      ifLogin()
    })
  }

  const ifLogin = () =>{
    if(localStorage['token']){
      let outBtn = $("<button id='btnOut' class='btn btn-sm'>Log out</button>");
      $("header .logIn").html(outBtn);
      $(outBtn).on("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html"
      })
    }
  }