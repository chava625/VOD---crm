$(() => {
  createMain();
})


const createMain = () => {
  fetch("ui/sideDisplay.html")
  .then(resp => resp.text())
  .then(data => {
    // console.log(data);
    $("main nav").append(data)
  })
}