import ShowMovie from "./showmovieClass.js"

export const createShowMovies = (_ar) =>{
    $('#id_parent').html('')
    _ar.forEach(item =>{
        let createSM = new ShowMovie('#id_parent', item)
        createSM.render()
    });
}