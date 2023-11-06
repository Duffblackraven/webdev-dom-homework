const commEl = document.getElementById("addComm");
    const buttonEl = document.getElementById("addButton");
    const nameEl = document.getElementById("addName");
    const textEl = document.getElementById("addText");
    const loaderEl = document.getElementById("pageLoader");


    let comments = [];

    const getApi = () => {
      commEl.classList.add("hidden");
      loaderEl.classList.remove("hidden");

    return fetch("https://wedev-api.sky.pro/api/v1/tatiana-ret/comments",)

    .then((response) => {
    if (response.status === 500) {
      throw new Error('Ошибка на сервере')
    }
      return response.json();
    })
    .then((responseData) => {
        console.log (responseData)
        arrayComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString(),
          comment: comment.text,
          like: comment.likes,
          isLiked: false
        };
      });
      comments = arrayComments;
      renderComments();
      //console.log(arrayComments);
    })
    .then(() => {
    commEl.classList.remove("hidden");
    loaderEl.classList.add("hidden");
    })
    .catch((error)=> {
    if (error.message === 'Failed to fetch') {
      alert ('Ошибка интернет соединения, попробуйте позже')
    } else {
      alert (error.message);
    }
  })
};
  getApi();


const replyToComment = () => {

  const newComms = document.querySelectorAll('.comment');

    for (const newComm of newComms) {

      newComm.addEventListener ('click', () => {
      textEl.value = `${newComm.dataset.text} ${newComm.dataset.username}`
      });
    }
  }

  const initEventListener = () => {
      const likesButton = document.querySelectorAll('.like-button');

      for (const likeButtonEl of likesButton) {

        likeButtonEl.addEventListener ('click', (event) => {
          event.stopPropagation();
        const index = likeButtonEl.dataset.index;

          if (comments[index].isLiked === false) {
            comments[index].isLiked = true;
            comments[index].like++;
          } else {
            comments[index].isLiked = false;
            comments[index].like--;
          }
          //console.log(comments[index].isLiked)
          renderComments();
          replyToComment();
        });
      }
    };

    const deleteCommentButton = () => {
      const deleteComments = document.querySelectorAll('.delete-comment');

      for (const deleteComment of deleteComments) {
        deleteComment.addEventListener("click", (event) => {
          event.stopPropagation();

          const index = deleteComment.dataset.index;
          comments.splice(index, 1);
          renderComments();
        });
      }
    };


      const renderComments = () => {
        const htmlLikes = comments.map((user, i) => {
          return `<li class="comment"data-text="${user.comment}" data-username="${user.name}">
          <div class="comment-header">
            <div class="comment-name">${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${user.comment}
            </div>
          </div>
          <div class="comment-footer">
            <button data-index="${i}" class="delete-comment">Удалить</button>
            <div class="likes">
              <span class="likes-counter">${user.like}</span>
              <button data-index="${i}" class="like-button ${user.isLiked ? "-active-like" : ""}"></button>
            </div>
          </div>
        </li>`
      }).join('');

      
      commEl.innerHTML = htmlLikes;
      //console.log(htmlLikes)

      deleteCommentButton();
      replyToComment();
      initEventListener();
    }
    renderComments();


  buttonEl.addEventListener("click", () => {

    let currentDate = new Date();

      let date = currentDate.getDate();
      let year = currentDate.getFullYear().toString().slice(-2);
      let month = currentDate.getMonth();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();

      if (date < 10) {
        date = '0' + date
      }
      if (month < 10) {
        month = '0' + month
      }
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      const newDate = date + '.' + month + '.' + year + ' ' + hours + ':' + minutes;

    nameEl.classList.remove('error');

      if (nameEl.value === "") {
      nameEl.classList.add('error');
      return;
    };

    textEl.classList.remove('error');

      if (textEl.value === "") {
      textEl.classList.add('error');
     return;
    }

    buttonEl.disabled = true;
    buttonEl.textContent = "Добавляем..."

   fetch("https://wedev-api.sky.pro/api/v1/tatiana-ret/comments", {

    method: "POST",
    body: JSON.stringify({
      name: nameEl.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      text: textEl.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      forceError: true
    })
  })
  .then((response) => {
    console.log(response.status);
    if (!response.ok) {
      if (response.status === 400) {
      throw new Error('Ошибка ввода');
    } 
    if (response.status === 500) {
      throw new Error('Ошибка на сервере');
    }
    else {
      //alert ('Доступ к тайнам человечества закрыт, попробуйте позже');
      throw new Error ('Доступ к тайнам человечества закрыт, попробуйте позже');
      }
    }
  })
  .then(() => {
    return getApi();
    nameEl.value = '';
    textEl.value = '';
  })
  .catch((error)=> {
    if (error.message === 'Failed to fetch') {
      alert ('Ошибка интернет соединения, попробуйте позже')
    } 
    if (error.message === 'Ошибка ввода') {
      alert ('Ошибка колличества символов в имени/комментарии... Пожалуйста, введите не менее 3х символов')
    } 
    if (error.message === 'Ошибка на сервере') {
      alert ('Ошибка на сервере, возвращайтесь позже')
    }
  })
  .finally(() => {
    buttonEl.disabled = false;
    buttonEl.textContent = "Написать";
  })
});