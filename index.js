//---------------Firebase--------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKMQ9ATQVJhUKCE823Ie5Kane9TAU87qU",
  authDomain: "topjsbooklibrary.firebaseapp.com",
  projectId: "topjsbooklibrary",
  storageBucket: "topjsbooklibrary.appspot.com",
  messagingSenderId: "682267677776",
  appId: "1:682267677776:web:c44f3f78a2560985d92d55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

function signIn() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then((result) => {
    const inOutBtn = document.getElementById("signInBtn");
    inOutBtn.textContent = "Sign Out";
    loginRender();
    const loginUserDiv = document.getElementById("login-user-div");
    const userWelcomeMsg = document.createElement("p");
    userWelcomeMsg.textContent = "Hello " + auth.currentUser.displayName;
    const userInstruction = document.createElement("p");
    userInstruction.textContent = "Click on the add button to populate the library";
    loginUserDiv.appendChild(userWelcomeMsg);
    loginUserDiv.appendChild(userInstruction);
  });
}

function loginRender() {
  //Generate the buttons
  const addBookBtn = document.createElement("button");
  addBookBtn.setAttribute("type", "button");
  addBookBtn.classList.add("btn");
  addBookBtn.classList.add("btn-success")
  addBookBtn.classList.add("mt-2");
  addBookBtn.textContent = "Add Book";
  //Rendering the user information
  const newSec = document.createElement("section");
  const newDiv = document.createElement("div");
  newSec.appendChild(newDiv);
  newSec.appendChild(addBookBtn);
  newSec.classList.add("text-center");
  newSec.classList.add("text-light");
  newDiv.classList.add("container-fluid");
  newDiv.classList.add("bg-secondary");
  newDiv.setAttribute("id", "login-user-div");
  newDiv.classList.add("mt-1");
  
  document.body.appendChild(newSec);
}


function writeUserData(userId, bookName, author, numPage, status) {
  set(ref(database, 'users/' + userId), {
    bookName: bookName,
    author: author,
    numPage : numPage,
    status: status
  });
}


function readUserData() {
  currentBook.author = String(document.getElementById("authorinput").value);
  currentBook.title = String(document.getElementById("titleinput").value);
  currentBook.numPages = String(document.getElementById("pageinput").value);
  if(document.getElementById("readstatus").checked) {
    currentBook.status = "read";
  }
  // console.dir(currentBook);
  writeUserData(auth.currentUser.userId, currentBook.title, currentBook.author, currentBook.numPages, currentBook.status);
  console.log("Preceeds after the write function.");
}


function RenderCard() {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const bookName = document.createElement("h5");
  bookName.classList.add("card-title");
  bookName.innerText = String(document.getElementById("titleinput").value);

  const listGroup = document.createElement("ul");
  listGroup.classList.add("list-group", "list-group-flush");

  const authorName = document.createElement("li");
  authorName.classList.add("list-group-item");
  authorName.innerText = String(document.getElementById("authorinput").value);

  const pageNumber = document.createElement("li");
  pageNumber.classList.add("list-group-item");
  pageNumber.innerText = String(document.getElementById("pageinput").value);

  const readStatus = document.createElement("li");
  readStatus.classList.add("list-group-item");
  if(document.getElementById("readstatus").checked) {
    readStatus.innerHTML = "read";
  } else {
    readStatus.innerText = "not read";
  }

  listGroup.append(authorName, pageNumber, readStatus);
  cardBody.append(bookName);
  card.append(cardBody, listGroup);
  document.getElementById("cardRenderArea").appendChild(card);
}

class Book {
  constructor(author, title, numPages, status) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.status = status;
  }
}


document.getElementById("signInBtn").addEventListener("click", signIn);

// document.getElementById("submitBtn").addEventListener("mouseover", readUserData);
document.getElementById("submitBtn").addEventListener("click", RenderCard);

let currentBook = new Book();
