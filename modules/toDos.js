/* eslint-disable import/no-mutable-exports */
const submit = document.querySelector('.add-btn');
const tasksDiv = document.querySelector('.tasks');
export const taskInput = document.querySelector('.add-task input');

let editId;
let isEditTask = false;
let tasks = JSON.parse(localStorage.getItem('task-list'));

const addElemToPage = () => {
  let div = '';
  if (tasks) {
    tasks.forEach((task) => {
      let isCompleted;
      if (task.completed === true) {
        isCompleted = 'checked';
      } else {
        isCompleted = '';
      }
      div += `
      <div class='task' data-id='task.id'>        
        <input id="${task.index}" class='checkbox' type="checkbox" onclick='updateStatus(this)'>
        <p id='${task.index}'class='text ${isCompleted}' contenteditable="false">${task.descripton}</p>
        <button type="button"  id="${task.index}" class='edit' >
        <span onclick='editTask(${task.index - 1}, "${task.descripton}")' class="material-symbols-outlined">edit</span>
        </button>
        <button type="button"  id="${task.index}" class='del' onclick='del(${task.index})' >
        <span class='material-symbols-outlined del'>delete</span>
        </button>
        </div>
      `;
    });
  }
  tasksDiv.innerHTML = div;
};
addElemToPage();

// ====== Add Task Function =======
submit.addEventListener('click', () => {
  const userTask = taskInput.value;
  if (!isEditTask) {
    if (!tasks) {
      tasks = [];
    }
    const task = {
      index: tasks.length + 1,
      descripton: userTask,
      completed: false,
    };
    tasks.push(task);
  } else {
    isEditTask = false;
    tasks[editId].descripton = userTask;
  }
  taskInput.value = '';
  taskInput.focus();
  localStorage.setItem('task-list', JSON.stringify(tasks));
  addElemToPage();
});

// ====== Add Task Function with Enter Key =======
taskInput.addEventListener('keyup', (e) => {
  const userTask = taskInput.value;
  if (e.key === 'Enter' && userTask) {
    if (!isEditTask) {
      if (!tasks) {
        tasks = [];
      }
      const task = {
        index: tasks.length + 1,
        descripton: userTask,
        completed: false,
      };
      tasks.push(task);
    } else {
      isEditTask = false;
      tasks[editId].descripton = userTask;
    }
    taskInput.value = '';
    localStorage.setItem('task-list', JSON.stringify(tasks));
    addElemToPage();
  }
});

// ======Edit Function=======
window.editTask = (taskId, taskDescripton) => {
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskDescripton;
  taskInput.focus();
};

// ======Delete Function=======
window.del = (id) => {
  tasks = tasks.filter((task) => task.index !== id);
  tasks.forEach((e, i) => {
    e.index = i + 1;
  });
  localStorage.setItem('task-list', JSON.stringify(tasks));
  addElemToPage();
};

export { tasks };