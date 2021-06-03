import { createShowMovies } from './movies/showmovieManager.js';
import { auth } from "../services/auth.js";

$(() => {
  if(localStorage['token']){
  init();
  }
  else{
    window.location.href = 'login.html'
  }
});

const init = async() => {
  $("#myM").on("click", () => {
    $('.navMov').toggleClass()
    $('.lineB').show()
    showMyMovies();
  });
  $("#allM").on("click", () => {
    $('.navMov').toggleClass()
    $('.lineB').show()
    showAllMovies();
  });
};

const showMyMovies = async() =>{
    let dataAuth = await auth()
    try{
        let resp = await axios.get('http://localhost:3000/movies/ofUser',{
        headers: {
            'x-auth-token': localStorage['token']
        }
    })
            console.log(resp.data);
            createShowMovies(resp.data)
    } catch(err){
        console.error(err);
    }
}

const showAllMovies = () =>{
    axios({
        method: 'GET',
        url: 'http://localhost:3000/movies/',
    })
    .then(myData =>{
        console.log(myData.data);
        createShowMovies(myData.data)

    })
    .catch( err => console.log(err))
}
