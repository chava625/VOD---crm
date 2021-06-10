import { createShowMovies } from './movies/showmovieManager.js';
import { auth } from "../services/auth.js";

$(() => {
  init()
  if(localStorage['token']){
  init();
  }
  else{
    window.location.href = 'login.html'
  }
});

const init = async() => {
  // $("#myM").on("click", () => {
  //   $('.navMov').toggleClass()
  //   $('.lineB').show()
    showMyMovies();
  // });
  // $("#allM").on("click", () => {
  //   $('.navMov').toggleClass()
  //   $('.lineB').show()
  //   showAllMovies();
  // });
  $('#id_select').on('change', ()=>{
    showMyMoviesCat()
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
    let data = resp.data;
    createShowMovies(data);
    } catch(err){
        console.error(err);
    }
}
const showMyMoviesCat = async() =>{
    let dataAuth = await auth()
    try{
        let resp = await axios.get('http://localhost:3000/movies/ofUser',{
        headers: {
            'x-auth-token': localStorage['token']
        }
    })
    let data = resp.data;
    let dataCat = data.filter(item =>{
      if($('#id_select').val() == 'all'){
        return item.category;
      }
      return item.category == $('#id_select').val();
    })
    console.log(dataCat);
    createShowMovies(dataCat);
    } catch(err){
        console.error(err);
    }
}
// const showAllMovies = () =>{
//     axios({
//         method: 'GET',
//         url: 'http://localhost:3000/movies/',
//     })
//     .then(resp =>{
//         createShowMovies(resp.data)
//     })
//     .catch( err => console.log(err))
// }
