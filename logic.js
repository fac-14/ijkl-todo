// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
  // todoFunctions.generateId() will give you a unique id
  // You do not need to understand the implementation of this function.
  generateId: (function() {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),

  //cloneArrayOfObjects will create a copy of the todos array
  //changes to the new array don't affect the original
  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo) {
      return JSON.parse(JSON.stringify(todo));
    });
  },

  addTodo: function(todos, newTodo) {
    var newInput = [
      {
        id: todoFunctions.generateId(),
        description: newTodo,
        done: false
      }
    ];
    return newInput.concat(todoFunctions.cloneArrayOfObjects(todos));
  },

  deleteTodo: function(todos, idToDelete) {
    var newArr = todos.filter(element => element.id !== idToDelete);
    return newArr;
  },

  markTodo: function(todos, idToMark) {
    return todos.map(function(item) {
      if (item.id === idToMark) {
        item.done = item.done ? false : true;
      }
      return item;
    });
  },

  sortTodos: function(todos) {
    var done = todos.filter(function(x) {
      return x.done;
    });
    var undone = todos.filter(function(x) {
      return !x.done;
    });
    return undone.concat(done);
  },

  editTodo: function(todos, newTodoText, idToEdit) {
    return todos.map(function(item) {
      if (item.id === idToEdit) {
        item.description = newTodoText;
      }
      return item;
    });
  }
};

// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details:
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== "undefined") {
  module.exports = todoFunctions;
}
