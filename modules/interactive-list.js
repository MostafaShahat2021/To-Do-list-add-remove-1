import { tasks } from './toDos.js';

// ======Checked Function=======
window.updateStatus = (selectedTask) => {
  // console.log(selectedTask);
  const taskName = selectedTask.nextElementSibling;
  // console.log(taskName);
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    // console.log(tasks[selectedTask.id].completed);
    tasks[selectedTask.id - 1].completed = true;
    // console.log(tasks[selectedTask.id].completed = true);
  } else {
    taskName.classList.remove('checked');
    tasks[selectedTask.id - 1].completed = false;
  }
  localStorage.setItem('task-list', JSON.stringify(tasks));
};

// ======Clear All Function=======
const clearBtn = document.querySelector('.clear');
// console.log(clearBtn);
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});
