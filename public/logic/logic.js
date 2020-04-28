var todoList = {
	addTodo: async function(todoText) {
		try {
			// post is used to add a new entry at the end of your collection
			const newTodo = { todoText: todoText, completed: false };

			const res = await fetch('/todos', {
				method: 'POST',
				body: JSON.stringify(newTodo),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			});
			const data = await res.json();
		} catch (err) {
			console.log(err);
		}
	},
	changeTodo: async function(position, todoText) {
		fetch(`/todos/${position}`, {
			method: 'PATCH',
			body: JSON.stringify({ todoText: `${todoText}` }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((res) => res.json())
			.then((data) => console.log('Updating Todo.. results: \n', data))
			.then(view.displayTodos)
			.catch((err) => console.log(err));
	},

	deleteTodo: async function(position) {
		fetch(`/todos/${position}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((data) => console.log('Deleting Todo.. results: \n', data)) //.then(view.displayTodos)
			.then(view.displayTodos)
			.catch((err) => console.log(err));
	},

	toggleCompleted: async function(position) {
		let currentCompleted = null;

		await fetch(`/todos?id=${position}`)
			.then((res) => res.json())
			.then((data) => {
				// debugger
				currentCompleted = data[0].completed;
			})
			.catch((err) => console.log(err));

		await fetch(`/todos/${position}`, {
			method: 'PATCH',
			body: JSON.stringify({ completed: !currentCompleted }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((res) => res.json())
			.then((data) => console.log('Updating Todo.. results: \n', data))
			.then(view.displayTodos)
			.catch((err) => console.log(err));
	},

	makeCompletedAllTrueOrFalse: async function(position, newValue) {
		const response = await fetch(`/todos/${position}`, {
			method: 'PATCH',
			body: JSON.stringify({ completed: newValue }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		const json = await response.json();
		return json;

		// THE CODE BELOW WORKING AS WELL..

		// fetch(`/todos/${position}`, {
		//     method: 'PATCH',
		//     body: JSON.stringify({ completed: newValue }),
		//     headers: {
		//         "Content-type": "application/json; charset=UTF-8"
		//     }
		// })
		//     .then(res => res.json())
		//     .catch(err => console.log(err));
	},
	toggleAll: async function() {
		fetch('/todos', {
			method: 'GET'
		})
			.then((res) => res.json())
			.then(async (data) => {
				// console.log(data.length);
				// debugger
				if (data.every((obj) => obj.completed === true)) {
					for (const obj of data) {
						await todoList.makeCompletedAllTrueOrFalse(obj.id, false).catch((err) => console.log(err));
					}
					// data.forEach(async obj => await todoList.makeCompletedAllTrueOrFalse(obj.id, false));
				} else {
					for (const obj of data) {
						await todoList.makeCompletedAllTrueOrFalse(obj.id, true).catch((err) => console.log(err));
					}
					// data.forEach(async obj => await todoList.makeCompletedAllTrueOrFalse(obj.id, true));
				}
			})
			.then(view.displayTodos)
			.catch((err) => console.log(err));
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.getElementById('userInterface');
		todosUl.innerHTML = '';

		fetch('/todos', {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				for (let todo of data) {
					var todoLi = document.createElement('li');
					var todoTextWithCompletion = '';

					if (todo.completed === true) {
						todoTextWithCompletion = '(x) ' + todo.todoText;
					} else {
						todoTextWithCompletion = '( ) ' + todo.todoText;
					}

					todoLi.id = todo.id;
					todoLi.textContent = todoTextWithCompletion;
					todoLi.appendChild(view.createDeleteButton());
					todosUl.appendChild(todoLi);
				}
			})
			.catch((err) => console.log(err));
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	}
};
