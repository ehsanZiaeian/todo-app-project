'use strict';

const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');

// count the task situations
const cTotal = document.querySelector('#count-total');
const cDone = document.querySelector('#count-done');
const cLeft = document.querySelector('#count-left');

// calculating stats
const stats = function () {
  const total = list.querySelectorAll('li').length;
  const done = list.querySelectorAll('li.done').length;
  const left = total - done;
  cTotal.textContent = total;
  cDone.textContent = done;
  cLeft.textContent = left;
};

// create task item
const createItem = function (title) {
  // create list
  const li = document.createElement('li');

  //create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.dataset.action = 'toggle';

  // put the checkbox at the first
  li.prepend(checkbox);

  // create the text
  const text = document.createElement('span');
  text.textContent = title;

  // create delete button
  const del = document.createElement('button');
  del.type = 'button';
  del.textContent = 'Delete';
  del.dataset.action = 'delete';

  //put the text and delete forward the checkbox
  li.append(text, del);
  return li;
};

//submit new task
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // read the input and remove spaces and new lines
  const title = input.value.trim();

  // ignore empty input(execute when title has a falsy value)
  if (!title) {
    // the cursor back to the input
    input.focus();
    return;
  }
  const li = createItem(title);

  // add to unordered list
  list.appendChild(li);
  stats();
  input.value = '';
  input.focus();
});

// delete event
list.addEventListener('click', function (e) {
  if (e.target.dataset.action === 'delete') {
    // if it's nearest the li, remove it
    e.target.closest('li')?.remove();
    stats();
  }
});

// change the checkbox to checked
list.addEventListener('change', function (e) {
  if (e.target.dataset.action === 'toggle') {
    e.target.closest('li')?.classList.toggle('done', e.target.checked);
    stats();
  }
});

// clear the completed tasks
const clear = function () {
  document.querySelectorAll('li.done').forEach(li => {
    li.remove();
  });
  stats();
};

// clear event
const clearBtn = document.querySelector('#clear-done');
clearBtn.addEventListener('click', clear);
