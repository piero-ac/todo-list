const PList = function () {
    const collection = []; // collection of [todo, priority]

    this.add = function (element) {
        if (this.size === 0) {
            collection.push(element);
        } else {
            if (!this.exists(element)) {
                let added = false;
                for (let i = 0; i < collection.length; i++) {
                    if (element[1] < collection[i][1]) {
                        collection.splice(i, 0, element);
                        added = true;
                        break;
                    }
                }

                if (!added) {
                    collection.push(element);
                }
            } else {
                console.log("Element already exists");
            }

        }
    }
    // remove 
    this.remove = function (text, urgency) {
        for (let i = 0; i < collection.length; i++) {
            if (text === collection[i][0] && urgency === collection[i][1]) {
                collection.splice(i, 1);
                break;
            }
        }
    }

    // exists
    this.exists = function (element) {
        const text = element[0];
        const urgency = element[1];
        for (let i = 0; i < collection.length; i++) {
            if (text === collection[i][0] && urgency === collection[i][1]) {
                return true;
            }
        }

        return false;
    }

    // size
    this.size = function () {
        return collection.length;
    }

    // retrive PL
    this.print = function () {
        return collection;
    }
}

const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todo");
const todoUrgency = document.querySelector("#todoUrgency");
const todoList = document.querySelector("#todoList");
const todoPL = new PList();

todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', removeTodo);

function addTodo(e) {
    e.preventDefault();
    // const newToDoItem = createToDoItem(todoInput.value, todoUrgency.value);
    // todoList.append(newToDoItem);

    // add the ToDo Item information to the Priority List
    todoPL.add([todoInput.value, parseInt(todoUrgency.value)]);

    // reset the input value
    todoInput.value = '';

    // build the to do list for display, first check if the values being inserted don't already exist
    if (!todoPL.exists([todoInput.value, parseInt(todoUrgency.value)])) {
        buildToDoList();
    }

    // console.log(todoPL.print());

}

function createToDoItem(value, urgency) {
    const newLI = document.createElement('li');

    urgency = (urgency == 1) ? 'High' : (urgency == 2) ? 'Medium' : 'Low';
    newLI.append(document.createTextNode(`${value} ${urgency}`));

    const deleteBtn = document.createElement('button');
    deleteBtn.append(document.createTextNode('X'));
    deleteBtn.classList.add('btn', 'delete');

    newLI.append(deleteBtn);
    return newLI;
}

function removeTodo(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            const li = e.target.parentElement; // get the li we want to remove
            const liText = li.textContent; // get its text content
            // console.log(`liText ${liText}`);
            const buttonText = li.firstElementChild.textContent; // get the button content
            // console.log(`buttonText ${buttonText}`);
            const liTextWithoutButtonText = liText.replace(buttonText, ''); // get the text content before the button content
            // console.log(`liTextWithoutButtonText ${liTextWithoutButtonText}`);
            const liTextParts = liTextWithoutButtonText.split(/(High|Medium|Low)/); // get the text content before the priority level
            // console.log(liTextParts);
            const todoText = liTextParts[0].trim(); // store the todo text 
            const priority = liTextParts[1]; // store the priority text
            const number = (priority === 'High') ? 1 : (priority === 'Medium') ? 2 : 3; // find the number associated with the priority level

            // console.log(todoText, priority);
            todoList.removeChild(li); // remove the li element
            todoPL.remove(todoText, number);
            // console.log(todoPL.print());
        }
    }
}

function buildToDoList() {
    todoList.innerHTML = '';
    const todoPList = todoPL.print();
    for (let i = 0; i < todoPL.size(); i++) {
        const newToDoItem = createToDoItem(todoPList[i][0], todoPList[i][1]);
        todoList.append(newToDoItem);
    }
}

// TEST
// const myPL = new PList();
// myPL.add(['bb', 1]);
// myPL.add(['cc', 2]);
// myPL.add(['dd', 1]);
// console.log(myPL.size());
// console.log(myPL.print());
// myPL.remove('dd', 1);
// console.log(myPL.size());
// console.log(myPL.print());
// myPL.add(['dd', 1]);
// console.log(myPL.size());
// console.log(myPL.print());
// myPL.add(['dd', 1]);