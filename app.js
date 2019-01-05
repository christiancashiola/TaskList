const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks = getTasksFromLocalStorage();
  console.log(tasks);
  
  tasks.forEach(task => {
    appendTask(task);
  });
}

function getTasksFromLocalStorage() {
  if (localStorage.getItem('tasks') === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem('tasks'));
  }
}

function appendTask(task) {
  taskValue = task || taskInput.value
  const li = document.createElement('li');
  const link = document.createElement('a');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskValue));
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fas fa-times"></i>'

  li.appendChild(link);
  taskList.appendChild(li);
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    appendTask();
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
  }

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let task = getTasksFromLocalStorage();


  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  localStorage.clear();
  
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}