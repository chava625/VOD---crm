import { auth } from "../services/auth.js";
import { createMovie } from "./movies/movieManager.js";

$(() => {
  init();
});

const init = async () => {
  let dataAuth = await auth();
  try {
    let resp = await axios.get("/movies/ofUser", {
      headers: {
        "x-auth-token": localStorage["token"],
      },
    });
    // console.log(resp.data.length);
    if(resp.data.length > 0){
      createMovie(resp.data);
      $.supermodal();
    } else {
      $('.tbl').html('<h2>You have no movies you need to <a href="/addMovie.html">Upload</a></h2>')
    }
    // console.log(resp.data);
  } catch (err) {
    console.error(err);
  }
};
