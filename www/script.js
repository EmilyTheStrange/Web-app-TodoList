// Code goes here

var todoList = {
  todos: [],
/* Needed for console version  
displayTodos: function(){
    // chech if TODO list is empty
    if (this.todos.length === 0){
      console.log("No TODOs.");
    } 
    // if not empty print todos and if completed
    else {
      console.log("My TODOs:");
      for (var i = 0; i < this.todos.length; i++){
        var todo = this.todos[i].todoText;
        var completed = this.todos[i].completed;
        // check if completed is true 
        if (completed === true){
          // completed print with (X)
          console.log("(X)", todo);
        }
        else {
          // uncompleted print with ( )
          console.log("( )", todo);
        }
      }
    }
  }, */
  addTodo: function(todoText){
    this.todos.push(
      // create object containig TodoItem and if completed 
      {
        todoText: todoText, 
        completed: false
      }
      );
  },
  changeTodo: function(position, todoText){
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  // if everything is true, make everything false
  toggleAll: function(){
      var totalTodos = this.todos.length;
      var completedTodos = 0;
    // get number of completedTodos
    this.todos.forEach(function(todo){
        if (todo.completed === true){
            completedTodos++;
        }
    });
      
    if (completedTodos === totalTodos){
      // make everything false
      this.todos.forEach(function(todo){
         todo.completed = false; 
      });  
    }
    else {
        // make everything false
        this.todos.forEach(function(todo) {
           todo.completed = true; 
        });
    }
  }
};

/*
// get access to displaytodos button
var displayTodosButton = document.getElementById("displayTodosButton");
var toggleAllButton = document.getElementById("toggleAllButton");
// run displayTodos method when someone clicks display todos button
displayTodosButton.addEventListener("click", function(){
  todoList.displayTodos();
});
// toggleAll method when someone clicks toggle all button
toggleAllButton.addEventListener("click", function(){
  todoList.toggleAll();
});
*/

var handlers = {
  /* For display all button (if needed)
  displayTodos: function() {
    todoList.displayTodos();
  },*/
  addTodo: function(){
    var addTodoInputText = document.getElementById("addTodoInputText");
    todoList.addTodo(addTodoInputText.value);
    addTodoInputText.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPosition = document.getElementById("changeTodoPosition");
    var changeTodoInput = document.getElementById("changeTodoInput");
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoInput.value);
    changeTodoPosition.value = "";
    changeTodoInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPosition = document.getElementById("toggleCompletedPosition");
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition.value = "";
    view.displayTodos();
  },
   toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
  
};

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";      
    todoList.todos.forEach(function(todo, position){
          var todosLi = document.createElement("li");
          //display todo with completion
          var todoTextWithCompl = "";
          if (todo.completed === true){
              todoTextWithCompl = "(X)" + todo.todoText;
          }
          else {
              todoTextWithCompl = "( )" + todo.todoText;   
          }
          todosLi.id = position;
          todosLi.textContent = todoTextWithCompl;
          todosLi.appendChild(this.createDeleteButton());
          // display todoText on the list
          todosUl.appendChild(todosLi);
      }, this);
  }, 
  
    createDeleteButton: function(){
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },
    setUpEventListeners: function(){
        var todoUl = document.querySelector("ul");
        todoUl.addEventListener("click", function(event){
        console.log(event.target.parentNode.id);

        var elementClicked = event.target;
        if (elementClicked.className === "deleteButton"){
            handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
    });
    
    }
};

view.setUpEventListeners();

