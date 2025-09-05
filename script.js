'use strict';

// storing, saving and getting the information with local storage
const registerForm = document.querySelector('#register-form');
const msg = document.querySelector('#register-msg');
const USERS_KEY = 'todo.users';

//use
const readUsers = function () {
  // throw falsy values
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

//store
const saveUsers = function (users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

//register form event
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.querySelector('#reg-username').value.trim();
  const name = document.querySelector('#reg-name').value.trim();
  const password = document.querySelector('#reg-password').value;
  const users = readUsers();
  const exists = users.some(
    u => u.username.toLowerCase() === username.toLowerCase()
  );

  //check if it has already taken(exists===true)
  if (exists) {
    msg.textContent = 'Username is already taken.';
    return;
  }

  // if it hasn't taken, let's add it to users!
  users.push({ username, name, password });

  // save and store the user
  saveUsers(users);

  //after storing we send a message to user that can log now!
  msg.textContent = 'Account created. You can log in now.';

  //back all things to the default
  registerForm.reset();
});

const loginForm = document.querySelector('#login-form');
const loginMsg = document.querySelector('#login-msg');
const SESSION_KEY = 'todo.session';

// inform other pages that user logged in
const saveSession = function (users) {
  localStorage.setItem(SESSION_KEY, users.username);
};

//login form event
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value;

  //read the username and password
  const users = readUsers();

  // check if we have stored it
  const user = users.find(
    u =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password
  );

  // if we didn't find the user in storage(user === false)
  if (!user) {
    loginMsg.textContent = 'Invalid username or password.';
    return;
  }

  // let dashboard know that the user logged in
  saveSession(user);

  //let's go to the dashboard page!
  window.location.href = 'dashboard.html';
});
