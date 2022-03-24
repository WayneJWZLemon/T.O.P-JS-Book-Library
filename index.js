//---------------Firebase--------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

  //Creating input fields for the user to submit information about the book
  
  document.body.appendChild(newSec);
}


function writeUserData(userId, bookName, author, numPage, status) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
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
    currentBook.status = "readed";
  }
  // console.dir(currentBook);
  writeUserData(auth.currentUser.userId, currentBook.title, currentBook.author, currentBook.numPages, currentBook.status);
  console.log("Preceeds after the write function.");
}




//----------------Book Library Functions----------------
let myLibrary = [];

class Book {
  constructor(author, title, numPages, status) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.status = status;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

document.getElementById("signInBtn").addEventListener("click", signIn);

document.getElementById("submitBtn").addEventListener("mouseover", readUserData);

let currentBook = new Book();

