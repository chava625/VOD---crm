$(()=>{
    init();
});

const init = () => {
    $('#id_form').on('submit', (e) =>{
        e.preventDefault();
        let dataBody = {
            title: $('#id_title').val(),
            movieCode: $('#id_code').val(),
            info: $('#id_info').val(),
            category: $('#id_cat').val() 
        }
        // console.log(dataBody);
        axios({
            method:'POST',
            url: 'http://localhost:3000/movies/add/',
            data: dataBody,
            headers: {
                'x-auth-token': localStorage['token']
            }
        })
        .then(myData =>{
            console.log(myData);
            window.location.href = 'myMovies.html'
        })
        .catch( err => console.log(err))
    })
}