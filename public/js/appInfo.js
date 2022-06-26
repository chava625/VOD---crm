import { auth } from "../services/auth.js";

let userId;

$(() => {
    init();
  })
  
  const init = async () => {
    let data = await auth();
    if(data.status == 'ok'){
      try{
        let resp = await axios.get('/users/single/',{
          headers: {
              'x-auth-token': localStorage['token']
          }
      })
        userId = resp.data._id;

        $('#id_user').val(resp.data.user),
        $('#id_email').val(resp.data.email)
      } catch(err) {
        console.log(err);
      }
    }
    declareViewEvents()
  }

  const declareViewEvents = () => {
    $("#id_form").on("submit",(e) => {
      e.preventDefault();
      editInfo()
    })
  };

  const editInfo = () =>{
    let dataBody = {
      id: userId,
      user: $('#id_user').val(),
      email: $('#id_email').val()
    }
    axios({
      method: 'PUT',
      url: "/users/edit/",
      data: dataBody
    })
    .then(myData =>{
      alert('Edit User')
      location.reload()
      .catch(err =>{
        if(err.response.data.code){
          alert("Email already in system, try another or log in")
         }
         else if(err.response.data[0].context.key == "email"){
          alert("Email not valid, enter anothe one")
         }
         else{
           alert("There is a problem try again!")
         }
      })
    })

  }