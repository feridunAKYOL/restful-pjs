class Handlers {
	addTodo() {
		let addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodos();
	}

	changeTodo() {
		let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		let changeTodoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
	}

	toggleCompleted() {
		let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput.value = '';
		view.displayTodos();
	}

	toggleAll() {
		todoList.toggleAll();
		view.displayTodos();
	}

	deleteTodo() {
		let elementClicked = event.target;
		if (elementClicked.className === 'deleteButton') {
			todoList.deleteTodo(parseInt(elementClicked.parentNode.id));
		}
	}
}
