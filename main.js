import { getFetchApi, postFetchApi } from "./Api.js";
import { getCorrectDate } from "./GetDate.js";
import { renderComms } from "./RenderComms.js";

const commEl = document.getElementById("addComm");
const buttonEl = document.getElementById("addButton");
const nameEl = document.getElementById("addName");
const textEl = document.getElementById("addText");
const loaderEl = document.getElementById("pageLoader");


let commentsArr = [];

const getApi = () => {
  commEl.classList.add("hidden");
  loaderEl.classList.remove("hidden");

getFetchApi()
.then((responseData) => {
    console.log (responseData)
    const arrayComments = responseData.comments.map((comment) => {
    return {
      name: comment.author.name,
      date: getCorrectDate(comment.date),
      comment: comment.text,
      like: comment.likes,
      isLiked: false
    };
  });
  commentsArr = arrayComments;
  renderComms({commEl, commentsArr, replyToComment, initEventListener, deleteCommentButton});
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
    };
    const initEventListener = () => {
        const likesButton = document.querySelectorAll('.like-button');
      
        for (const likeButtonEl of likesButton) {
      
          likeButtonEl.addEventListener ('click', (event) => {
            event.stopPropagation();
          const index = likeButtonEl.dataset.index;
      
            if (commentsArr[index].isLiked === false) {
              commentsArr[index].isLiked = true;
              commentsArr[index].like++;
            } else {
              commentsArr[index].isLiked = false;
              commentsArr[index].like--;
            }
            //console.log(commentsArr[index].isLiked)
            renderComms({commEl, commentsArr, replyToComment, initEventListener, deleteCommentButton});
          });
        }
      };
      const deleteCommentButton = () => {
        const deleteComments = document.querySelectorAll('.delete-comment');
      
        for (const deleteComment of deleteComments) {
          deleteComment.addEventListener("click", (event) => {
            event.stopPropagation();
      
            const index = deleteComment.dataset.index;
            commentsArr.splice(index, 1);
            renderComms({commEl, commentsArr, replyToComment, initEventListener, deleteCommentButton});
          });
        }
      };
renderComms({commEl, commentsArr, replyToComment, initEventListener, deleteCommentButton});

buttonEl.addEventListener("click", () => {

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

postFetchApi(nameEl, textEl)
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
