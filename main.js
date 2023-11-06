import { getFetchApi, postFetchApi } from "./Api.js";
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
      date: new Date(comment.date).toLocaleString(),
      comment: comment.text,
      like: comment.likes,
      isLiked: false
    };
  });
  commentsArr = arrayComments;
  renderComms(commEl, commentsArr)
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
