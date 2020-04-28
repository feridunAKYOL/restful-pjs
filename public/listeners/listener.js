let UI = new Handlers();

document.getElementById('addTodo').addEventListener('click', UI.addTodo);
document.getElementById('changeTodo').addEventListener('click', UI.changeTodo);
document.getElementById('toggleCompleted').addEventListener('click', UI.toggleCompleted);
document.getElementById('toggleAll').addEventListener('click', UI.toggleAll);
document.querySelector('#userInterface').addEventListener('click', UI.deleteTodo);
