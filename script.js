// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData } from "./storage.js";

const userForm = document.querySelector("#userForm");
const userSelect = document.querySelector("#userSelect");
const inputTitle = document.querySelector("#title");
const inputDescription = document.querySelector("#description");
const inputURL = document.querySelector("#URL");
const bookmarksContainer = document.querySelector("#bookmarksContainer");
const deleteAllBookmarks = document.querySelector("#deleteAll");
const selectUserMessage = document.querySelector("#selectUserMessage");
const usersArray = getUserIds();
let activeUser;

window.onload = function () {};

function renderOptions(users) {
  users.forEach((user) => {
    const option = document.createElement("option");
    option.textContent = `User ${user}`;
    option.value = `user ${user}`;
    userSelect.appendChild(option);
  });
}
renderOptions(usersArray);

userSelect.addEventListener(`change`, (e) => {
  activeUser = e.currentTarget.value;
  if (!activeUser || activeUser === `selectUsers`) {
    console.log(`exit`);
    selectUserMessage.textContent = "Please select user!";
    return;
  }
  renderUserData(activeUser);
});

function renderUserData(userValue) {
  const userData = getData(userValue);
  if (!userData) {
    selectUserMessage.textContent = "This user hasn't added any book yet";
    return;
  }
  userData.forEach((bookMark) => {
    const HTML = `<a href="${bookMark.URL}" target="_blank">${bookMark.title}</a>
    <p>${bookMark.description}</p>
    <p>${bookMark.date}</p>`;
    bookmarksContainer.insertAdjacentHTML(`afterbegin`, HTML);
  });
}
