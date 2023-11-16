import { registration, setToken, setUserName, token } from "./Api.js";
import { renderLogin } from "./loginPage.js";
import { getRenderComments } from "./main.js";

export const renderReg = () => {
    const appElement = document.getElementById("app");

    const regHtml = `
    <div class="container">
        <div class="add-form">
            <h3 class="login-name">Форма регистрации</h3>
            <input id="name-input" type="text" class="add-form-name" placeholder="Введите имя"/>
            <input id="login-input" type="text" class="add-form-name add-form-name-login" placeholder="Введите логин"/>
            <input id="password-input" type="password" class="add-form-text add-form-text-login" placeholder="Введите пароль" rows="4"></input>
          <div class="add-form-row add-form-row-login">
            <button id="register-button" class="add-form-button add-form-button-login">Зарегистрироваться</button>
          </div>
          <div class="enter-form-text">
            <div id="autorization" class="login-link" href="login.html">Войти</div>
          </div>
        </div>
    </div>`;

    appElement.innerHTML = regHtml;

    const autoLink = document.getElementById("autorization");
    autoLink.addEventListener("click", () => {
        renderLogin();
    });

    const nameInput = document.querySelector(".add-form-name");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.querySelector(".add-form-text");

    const regButtonElement = document.getElementById("register-button");

    regButtonElement.addEventListener("click", () => {
        registration({
            name: nameInput.value,
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
        .then((responseData) => {
            //console.log(token);
            setToken(responseData.user.token);
            setUserName(responseData.user.name);
            //console.log(userName);
        })
        .then(() => {
            renderComments({ getRenderComments });

        })
    });
};