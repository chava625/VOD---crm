$(()=>{
    init()
});

const init = () =>{
    $('#id_form').on('submit', (e)=>{
        e.preventDefault();
        let dataBody = {
           email: $('#id_email').val(),
           pass: $('#id_pass').val()
        }
        axios({
            method: 'POST',
            url: '/users/login/',
            data: dataBody  
        })
        .then(myData =>{
            localStorage.setItem('token', myData.data.token)
            window.location.href = 'myInfo.html'
        })
        .catch(err => console.log(err));
    })
}