// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");
  //var editTodoItem = document.getElementById("edit"); // is this necessary?
  var editing = false;

  var state = [
    { id: -3, description: "first todo", done: false },
    { id: -2, description: "second todo", done: false },
    { id: -1, description: "third todo", done: false }
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  // todo parameter is one object within state.
  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");

    // add class if marked
    if (todo.done) {
      todoNode.classList.add("marked");
    }

    // add markTodo button
    var markButtonNode = document.createElement("button");
    markButtonNode.classList.add("mark-btn");
    markButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markButtonNode);

    // add span holding description
    var todoSpanNode = document.createElement("span");
    todoSpanNode.textContent = todo.description;

    // add listening event to start edit
    todoSpanNode.addEventListener("click", function(event) {
      // var editInput = document.createElement("input"); // create input element
      // editInput.value = todoText; // set input value to current todo text
      // // set correct attributes for input element
      // editInput.setAttribute("id", "edit");
      // editInput.setAttribute("type", "text");
      // editInput.setAttribute("autocomplete", "off");
      // editInput.setAttribute("maxlength", "100");
      // editInput.required = true;
      //editInputContainer.appendChild(editInput); // make input element child node of form
      editing = true; // edit in progress
      var todoText = todoSpanNode.textContent;
      var editInputContainer = document.createElement("form"); // create form element
      editInputContainer.innerHTML =
        '<input id="edit" type="text" maxlength="100" autocomplete="off" value="' +
        todoText +
        '" required/>';
      todoNode.replaceChild(editInputContainer, todoSpanNode); // replace original span with form
      // event listener to submitting edited text
      editInputContainer.addEventListener("submit", function(event) {
        // upon pressing enter
        event.preventDefault(); // don't reload
        editing = false; // no longer editing
        todoText = event.target[0].value; // save new text in variable
        var newState = todoFunctions.editTodo(state, todoText, todo.id); // save new text to object array
        update(newState);
        //todoSpanNode.textContent = todoText; // add new todo text to original span node
        //todoNode.replaceChild(todoSpanNode, editInputContainer); // replace form/input node with span node containing new text
        // while (activeElement)
      });

      // deselect edit upon click elsewhere
      // document.addEventListener("click", function(event) {
      // var _isEditing = false;
      // function isEditing() {
      //   return _isEditing;
      // }
      // function setEditing(val) {
      //   if (arguments.length < 1) {
      //     val = true;
      //   }
      //   if (!_isEditing && val) {
      //     _isEditing = val;
      //     console.log("what's happening?");
      //     todoText = editInputContainer.firstChild.value;
      //     var newState = todoFunctions.editTodo(state, todoText, todo.id);
      //     update(newState);
      //   }
      //   _isEditing = val;
      // }
      // var ready = isEditing();
      // setEditing();
      // setEditing(false);
      // console.log(todoNode.firstChild.nextSibling);
      // console.log("event target: ", event.target);
      // if (
      //   editing &&
      //   !event.target.isEqualNode(todoNode.firstChild.nextSibling) &&
      //   !event.target.isEqualNode(todoSpanNode)
      // ) {
      //   console.log("clicking exception not working");
      //   editing = false;
      //   todoText = editInputContainer.firstChild.value;
      //   var newState = todoFunctions.editTodo(state, todoText, todo.id);
      //   update(newState);
      //   todoSpanNode.textContent = todoText;
      //   todoNode.replaceChild(todoSpanNode, editInputContainer); // some weird error, haven't fixed yet
      // }
      // });
    });
    todoNode.appendChild(todoSpanNode);

    // this adds the delete button
    // define content variables
    var sureContent = "sure?";
    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.classList.add("del-btn");
    deleteButtonNode.addEventListener("click", function(event) {
      // on click - change event listener, change copy
      var parentClassList = deleteButtonNode.parentNode.classList;
      if (parentClassList.contains("delete")) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      } else {
        // todo: style button as needed
        deleteButtonNode.textContent = sureContent;
        deleteButtonNode.parentNode.classList.add("delete");
        window.setTimeout(function() {
          deleteButtonNode.parentNode.classList.remove("delete");
          deleteButtonNode.textContent = "";
        }, 4000);
      }
    });
    todoNode.appendChild(deleteButtonNode);

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      event.preventDefault();
      var description = event.target[0].value; // event.target ....
      event.target[0].value = ""; // wipe the form value
      // console.log(description);
      var newState = todoFunctions.addTodo(state, description); // ?? change this!
      update(newState);
    });
  }

  var update = function(newState) {
    state = todoFunctions.sortTodos(newState); // sorts todos before rendering
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
