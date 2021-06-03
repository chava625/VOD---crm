class MovieItem {
  constructor(
    _parent,
    { _id, title, img, movieCode, info, category, likes },
    _index
  ) {
    this.parent = _parent;
    this._id = _id;
    this.title = title;
    this.img = img;
    this.movieCode = movieCode;
    this.info = info;
    this.category = category;
    this.likes = likes;
    this.index = _index + 1;
  }
  render() {
    let newTr = $("<tr></tr>");
    $(this.parent).append(newTr);
    $(newTr).append(`
        <td>${this.index}</td>
        <td>${this.title}</td>
        <td class="p-1"><img src="https://i.ytimg.com/vi/${this.movieCode}/hqdefault.jpg" alt="" width="76px"></td>
        <td>${this.movieCode}</td>
        <td>${this.info}</td>
        <td>${this.category}</td>
        `);
        // <td>${this.likes.length}</td>

    let delBtn = $(
      '<td class="p-1"> <button id="delBtn" title="Delete" class="btn btn-sm mt-1"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>'
    );
    $(newTr).append(delBtn);
    $(delBtn).on("click", () => {
      let r = confirm("You're sure you want to delete the " + this.title + "?");
      if (r) {
        del(this._id);
      }
    });

    let editBtn = $(
      '<td class="p-1"><button data-modal="modal-edit-movie" title="Edit" id="editBtn" class=" btn btn-sm mt-1 p-1"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>'
    );
    $(newTr).append(editBtn);

    $(editBtn).on("click", () => {
      // console.log(this);
      const modalId = '#modal_modal-edit-movie';
      $(`${modalId} #id_title`).val(this.title),
        $(`${modalId} #id_movieCode`).val(this.movieCode),
        $(`${modalId} #id_info`).val(this.info),
        $(`${modalId} #id_category`).val(this.category),
        $(`${modalId} #id_movieId`).val(this._id);
        $(`${modalId} #id_edit`).on('click',(event)=>{
          event.preventDefault();
          edit()
        });
    });
  }
}
const del = (_id) => {
  axios({
    method: "DELETE",
    url: "http://localhost:3000/movies/delete/" + _id,
    headers: {
      "x-auth-token": localStorage["token"],
    },
  })
    .then((myData) => {
      // alert('Movie Deleted')
      location.reload();
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const edit = () => {
  const modalId = '#modal_modal-edit-movie';
  let dataBody = {
    title:$(`${modalId} #id_title`).val(),
    movieCode:$(`${modalId} #id_movieCode`).val(),
    info:$(`${modalId} #id_info`).val(),
    category:$(`${modalId} #id_category`).val(),
    id:$(`${modalId} #id_movieId`).val(),
  }
  axios({
    method: 'PUT',
    url: "http://localhost:3000/movies/edit/",
    headers: {
      "x-auth-token": localStorage["token"],
    },
    data: dataBody
  })
  .then(myData =>{
    alert('Edit Movie')
    location.reload()
    .catch(err =>{
      res.status(401).json(err)
    })
  })
};

export default MovieItem;
