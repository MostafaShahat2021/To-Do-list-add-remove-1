import { tasks } from './toDos.js';

// ======Checked Function=======
window.updateStatus = (selectedTask) => {
  const taskName = selectedTask.nextElementSibling;
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    tasks[selectedTask.id - 1].completed = true;
  } else {
    taskName.classList.remove('checked');
    tasks[selectedTask.id - 1].completed = false;
  }
  localStorage.setItem('task-list', JSON.stringify(tasks));
};

// ======Clear Completed Function=======
const clearCompletedBtn = document.querySelector('.clear');

clearCompletedBtn.addEventListener('click', () => {
  const completed = tasks.filter((task) => !task.completed);
  completed.forEach((e, i) => {
    e.index = i + 1;
  });
  localStorage.setItem('task-list', JSON.stringify(completed));
  window.location.reload();
});