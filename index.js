//---------------Firebase--------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

function loginRender() {
  //Rendering the user information
  const newSec = document.createElement("section");
  const newDiv = document.createElement("div");
  newSec.appendChild(newDiv);
  newSec.classList.add("text-center");
  newSec.classList.add("text-dark");
  newDiv.classList.add("container-fluid", "alert", "alert-success");
  newDiv.setAttribute("id", "login-user-div");
  newDiv.classList.add("mt-1");
  document.body.insertBefore(newSec, document.getElementById("inputGroup"));
}

function signIn() {
  const inOutBtn = document.getElementById("signInBtn");
  if (inOutBtn.innerText === "Sign-In with Google") {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      inOutBtn.textContent = "Sign Out";
      loginRender();
      const loginUserDiv = document.getElementById("login-user-div");
      const userWelcomeMsg = document.createElement("p");
      userWelcomeMsg.textContent = "Hello " + auth.currentUser.displayName;
      loginUserDiv.appendChild(userWelcomeMsg);
    });
  }
  else {
    auth.signOut();
    inOutBtn.textContent = "Sign-In with Google";
  }
}

function writeUserData(userId, bookName, author, numPage, status) {
  set(ref(database, "users/" + userId), {
    bookName: bookName,
    author: author,
    numPage: numPage,
    status: status,
  });
}

function readUserData() {
  let currentBook = new Book();
  currentBook.author = String(document.getElementById("authorinput").value);
  currentBook.title = String(document.getElementById("titleinput").value);
  currentBook.numPages = String(document.getElementById("pageinput").value);
  if (document.getElementById("readstatus").checked) {
    currentBook.status = "read";
  } else {
    currentBook.status = "not read";
  }
  if(auth.currentUser !== null) {
    writeUserData(
      auth.currentUser.uid,
      currentBook.title,
      currentBook.author,
      currentBook.numPages,
      currentBook.status
    );
  } else {
    saveLocally();
  }
}

function RenderCard() {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const bookName = document.createElement("p");
  bookName.classList.add("card-title", "fw-semibold", "text-dark");
  bookName.innerText = "BOOK TITLE: " + String(document.getElementById("titleinput").value);

  const listGroup = document.createElement("ul");
  listGroup.classList.add("list-group", "list-group-flush");

  const authorName = document.createElement("li");
  authorName.classList.add("list-group-item", "text-dark", "bg-danger");
  authorName.style = "--bs-bg-opacity: .5;";
  authorName.innerText = "AUTHOR: " + String(document.getElementById("authorinput").value);

  const pageNumber = document.createElement("li");
  pageNumber.classList.add("list-group-item", "text-dark", "bg-warning");
  pageNumber.style = "--bs-bg-opacity: .5;";
  pageNumber.innerText = "# OF PAGES: " + String(document.getElementById("pageinput").value);

  const readStatus = document.createElement("li");
  readStatus.classList.add("list-group-item", "text-dark", "bg-info");
  readStatus.style = "--bs-bg-opacity: .5;";
  if (document.getElementById("readstatus").checked) {
    readStatus.innerHTML = "STATUS: read";
  } else {
    readStatus.innerText = "STATUS: not read";
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

function saveLocally() {
  let currentBook = new Book();
  currentBook.author = String(document.getElementById("authorinput").value);
  currentBook.title = String(document.getElementById("titleinput").value);
  currentBook.numPages = String(document.getElementById("pageinput").value);
  if (document.getElementById("readstatus").checked) {
    currentBook.status = "read";
  } else {
    currentBook.status = "not read";
  }
  localStorage.setItem(currentBook.title+currentBook.author, JSON.stringify(currentBook));
  $(document).ready(function() {
      $("body").append("<div class='alert alert-success centerInPage'>Saved to local storage.</div>")
      $(".centerInPage").fadeOut(3000, function() {
        $(this).remove();
      })
  });
}


document.getElementById("signInBtn").addEventListener("click", signIn);
document.getElementById("submitBtn").addEventListener("click", RenderCard);
document.getElementById("submitBtn").addEventListener("click", readUserData);