
class ShowMovie{
    constructor(_parent, {title, info, movieCode}){
        this.parent = _parent;
        this.title = title;
        this.info = info;
        this.movieCode = movieCode;
    }
    render(){
        let newDiv = $('<div class="animate__animated animate__backInDown box col-lg-5"></div>');
        $(this.parent).append(newDiv);
        $(newDiv).append(`
        <iframe width="100%" height="260" src="https://www.youtube.com/embed/${this.movieCode}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h2>${this.title}</h2>
        <p>${this.info}</p>
        `)
    }
}

export default ShowMovie;