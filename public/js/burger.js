

console.log(document.querySelector("#nav_btn"));
const btn = document.querySelector("#nav_btn");

$(btn).on("click", () =>{
    let theNav = document.querySelector("#asideNAv");
     console.log(theNav);
      
     if (theNav.style.display != "block") {
        $(theNav).slideToggle(300);
        theNav.style.display = "block";
        theNav.className = "d-block d-md-flex open";
        document.querySelector("#nav_btn").innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
    
    
      }
      else {
        theNav.style.display = "none"
        theNav.className = "d-none"
        document.querySelector("#nav_btn").innerHTML = `<i class="fa fa-bars" aria-hidden="true"></i>`
      }
  
})