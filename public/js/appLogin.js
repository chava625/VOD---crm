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
        console.log(dataBody);
        axios({
            method: 'POST',
            url: 'http://localhost:3000/users/login/',
            data: dataBody  
        })
        .then(myData =>{
            console.log(myData.data);
            localStorage.setItem('token', myData.data.token)
            window.location.href = 'myInfo.html'
        })
        .catch(err => console.log(err));
    })
}