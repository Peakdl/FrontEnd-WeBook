const newTodoForm = document.getElementById('newTodoForm');
const newTodoTitle = document.getElementById('newTodoTitle');
const todoList = document.getElementById('todoList');

newTodoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = newTodoTitle.value;
    try {
        const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            },
            body: JSON.stringify({ title })
        });

        const newTodo = await response.json();
        displayTodos(); 
        newTodoTitle.value = ''; 
    } catch (error) {
        console.error('Error adding todo', error);
    }
});

async function displayTodos() {
    try {
        const response = await fetch('http://localhost:3000/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            },
        });
        const todos = await response.json();
        
        todoList.innerHTML = '';
        
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function() { deleteTodo(todo.id); };
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = function() { editTodo(todo.id); };

            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching todos', error);
    }
}

async function deleteTodo(todoId) {
    try {
        const response = await fetch(`http://localhost:3000/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        displayTodos(); 
    } catch (error) {
        console.error('Error deleting todo', error);
    }
}

async function editTodo(todoId) {
    const newTitle = prompt("Edit your todo"); 
    if (newTitle) {
        try {
            const response = await fetch(`http://localhost:3000/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ title: newTitle })
            });
            displayTodos(); 
        } catch (error) {
            console.error('Error editing todo', error);
        }
    }
}


//token تسجيل حروج وحذف 
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('token'); 
    window.location.href = '/Html/login.html'; 
});
displayTodos();
