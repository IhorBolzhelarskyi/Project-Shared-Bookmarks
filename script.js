// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

const userForm = document.querySelector("#userForm");
const userSelect = document.querySelector("#userSelect");
const inputTitle = document.querySelector("#title");
const inputDescription = document.querySelector("#description");
const inputURL = document.querySelector("#URL");
const bookmarksContainer = document.querySelector("#bookmarksContainer");
const deleteAllBookmarks = document.querySelector("#deleteAll");
const selectUserMessage = document.querySelector("#selectUserMessage");
const usersArray = getUserIds();
let activeUser = null;

window.onload = function () {};

function renderOptions(users) {
  users.forEach((user) => {
    const option = document.createElement("option");
    option.textContent = `User ${user}`;
    option.value = user;
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
  bookmarksContainer.innerHTML = "";
  const userData = getData(userValue);
  if (!userData || userData.length === 0) {
    selectUserMessage.textContent = "This user hasn't added any bookmarks yet.";
    bookmarksContainer.innerHTML = "";
    return;
  }
  selectUserMessage.textContent = "";
  const sortedData = userData.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  sortedData.forEach((bookmark) => {
    const formattedDate = new Date(bookmark.createdAt).toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const HTML = `
  <a href="${bookmark.URL}" target="_blank">${bookmark.title}</a>
  <p>${bookmark.description}</p>
  <p>${formattedDate}</p>
`;
    bookmarksContainer.insertAdjacentHTML(`beforeend`, HTML);
  });
}

function urlValidator(url) {
  const pattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(:[0-9]{1,5})?(\/.*)?$/i;
  return pattern.test(url);
}

userForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const title = inputTitle.value.trim();
  const description = inputDescription.value.trim();
  const URL = inputURL.value.trim();

  if (!activeUser || activeUser === `selectUsers`) {
    alert("Please select a user first.");
    return;
  } else if (!urlValidator(URL)) {
    alert("URL is not valid");
    return;
  }

  const newBookmark = {
    title,
    description,
    URL,
    createdAt: new Date().toISOString(),
  };

  const bookMarks = getData(activeUser) || [];
  bookMarks.push(newBookmark);
  setData(activeUser, bookMarks);
  userForm.reset();
  renderUserData(activeUser);
});

deleteAllBookmarks.addEventListener(`click`, () => {
  clearData(activeUser);
  renderUserData(activeUser);
});
