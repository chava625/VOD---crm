$(()=>{
    init()
});

const init = () => {
    $('#id_form').on('submit', (e) =>{
        e.preventDefault();
        let dataBody = {
            user: $('#id_user').val(),
            email: $('#id_email').val(),
            pass: $('#id_pass').val() 
        }
        console.log(dataBody);
        axios({
            method: 'POST',
            url: '/users/add/',
            data: dataBody,
            headers: {
                'Content-Type': 'application/json',
                // 'x-auth-token': localStorage['token']
            }, 
        })
        .then(myData =>{
            alert('User added');
            window.location.href = 'myMovies.html'
        })
        .catch( err => console.log(err))
    })
}