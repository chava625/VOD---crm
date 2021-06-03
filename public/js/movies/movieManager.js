import MovieItem from "./movieClass.js";

export const createMovie = (_ar) =>{
    _ar.forEach((item, i) => {
        let createMovies = new MovieItem('#id_parent', item, i)
        createMovies.render()
    });
}