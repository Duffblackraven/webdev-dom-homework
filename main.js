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
  renderComms(commEl, commentsArr, textEl);
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
