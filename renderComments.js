import { postFetchApi, token, userName } from "./Api.js"
import { likeEventButton } from "./like.js";
import { renderLogin } from "./loginPage.js";
import { formatedDate, getRenderComments } from "./main.js";


export const renderComms = ({ comments }) => {
  const appElement = document.getElementById("app");
    const commentsHtml = comments
    .map((user, index) => {
      return `<li class="comment">
        <div class="comment-header">
          <div>${user.name}</div>
          <div>${user.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text" data-index="${index}">
            ${user.text}
          </div>
        </div>
        <div class="comment-footer">
        <!--<button data-index="${index}" class="delete-comment">Удалить</button>-->
          <div class="likes">
            <button class="like-button ${user.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            <span class="likes-counter">${user.likes}</span>
          </div>
        </div>
      </li>`;
    })
    .join('');

 //   const listHtml = `<ul id="ul" class="comments">
//    ${commentsHtml}</ul>`
//  appElement.innerHTML = listHtml;

    const appHtml = `
  <div class="container">
  ${token ? `
  <div id="loader-comment" class="loader-comment">Страница загружается...</div>
  <ul id="list" class="comments">${commentsHtml}</ul>
  <div id="add-loader-comment" class="add-loader-comment">Комментарий добавляется...</div>
  <div class="add-form" id="add-form">
    <input id="name-input" type="text" value="${userName}" readonly="readonly" class="add-form-name"  />
    <textarea id="text-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
    <div class="add-form-row">
      <button id="comment-button" class="add-form-button">Написать</button>
    </div>
  </div>` 
  : `
  <div id="loader-comment" class="loader-comment">Страница загружается...</div>
  <ul id="list" class="comments">${commentsHtml}</ul>
  <div id="add-loader-comment" class="add-loader-comment">Комментарий добавляется...</div>
  <div class="login-alert" id="login-alert">Чтобы добавить комментарий, <a id="authorization" href="#">авторизуйтесь</a></div>`} 
  </div>`;

  appElement.innerHTML = appHtml;

  const loaderComment = document.getElementById("loader-comment");
  loaderComment.style.display = 'none';

  const loginPageText = document.querySelector(".login-alert");

  const loginLink = document.getElementById("authorization");
 token ? `` : loginLink.addEventListener("click", () =>{

    renderLogin();
  })
  



  const addCommentButton = document.getElementById("comment-button");
  const nameInput = document.getElementById("name-input");
  const textInput = document.getElementById("text-input");
  const addLoaderComment = document.getElementById('add-loader-comment');



  document.getElementById("add-loader-comment").style.display = 'none';

  addCommentButton.addEventListener("click", () => {

    nameInput.classList.remove("error");
    console.log(nameInput.value);
    console.log(textInput.value);
    textInput.classList.remove("error");
    if (nameInput.value === "") {
      console.log(nameInput.value);
      console.log(textInput.value);
      nameInput.classList.add("error");
      return;
    }
    if (textInput.value === "") {
      console.log(nameInput.value);
      console.log(textInput.value);
      textInput.classList.add("error");
      return;
    }


  
    addLoaderComment.style.display = true;
    document.getElementById("add-loader-comment").style.display = 'block';
    
    
    const postTask = () => {
    postFetchApi({ 
      text: textInput.value,
      name: nameInput.value,
      date: formatedDate
     })
     .then(() => {
      return getRenderComments({ comments });
    })
    .then(() => {
      document.getElementById("add-form").style.display = 'flex';
      document.getElementById("add-loader-comment").style.display = 'none';

      nameInput.value = ""
      textInput.value = ""
    })
    .catch((error) => {
      document.getElementById("add-form").style.display = 'flex';
      document.getElementById("add-loader-comment").style.display = 'none';
        if (error.message === "Сервер сломался") {
          alert('Ошибка на сервере, возвращайтесь позже');
        }
        if (error.message === "Плохой запрос") {
          alert('Ошибка колличества символов в имени/комментарии... Пожалуйста, введите не менее 3х символов');
        }
        else {
          alert("Ошибка интернет соединения, попробуйте позже")
        }
        
        console.log(error);
      });
    }
    
    postTask();
    renderComms({ comments });  

  });

 
   
    const styleQuote = document.querySelector(".quote");
  const commentsElements = document.querySelectorAll(".comment-text");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      if (index !== null) {
        const comment = comments[index];
        textInput.value = `> ${comment.text} \n ${comment.name}.,`;
        renderComms({ comments, getRenderComments });
      comment.text.replace("<div class='quote'</div>");
      }
    });
  }

  likeEventButton ({ comments });
 
};