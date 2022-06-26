$(()=>{
    init();
});

const init = () => {
    $('#id_form').on('submit', (e) =>{
        e.preventDefault();
        let resMovCode =   $('#id_code').val().split("https://www.youtube.com/watch?v=");
        console.log(resMovCode[1]);
        let dataBody = {
            title: $('#id_title').val(),
            movieCode: resMovCode[1],
            info: $('#id_info').val(),
            category: $('#id_cat').val() 
        }
        axios({
            method:'POST',
            url: '/movies/add/',
            data: dataBody,
            headers: {
                'x-auth-token': localStorage['token']
            }
        })
        .then(myData =>{
            console.log(myData);
            window.location.href = 'myMovies.html'
        })
        .catch( err =>{
            alert(err)
             console.log(err)
        })
    })
}