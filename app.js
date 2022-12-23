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
const todoListDiv = document.querySelector('#todoListDiv');
const todoPL = new PList();

todoForm.addEventListener('submit', addTodo);
todoListDiv.addEventListener('click', removeToDoItem);


function addTodo(e) {
    e.preventDefault();
    // const newToDoItem = createToDoItem(todoInput.value, todoUrgency.value);
    // todoList.append(newToDoItem);

    // build the to do list for display, first check if the values being inserted don't already exist
    const todoInpuValue = todoInput.value.trim();
    const todoUrgencyValue = parseInt(todoUrgency.value);

    if (!todoPL.exists([todoInpuValue, todoUrgencyValue])) {

        // add the ToDo Item information to the Priority List
        todoPL.add([todoInpuValue, todoUrgencyValue]);

        // reset the input value
        todoInput.value = '';

        buildToDoListDiv(); // rebuild the todo list information based on priority
    } else {
        todoInput.value = '';
    }

    // console.log(todoPL.print());

}

function createToDoListItem(todoText, todoUrgency) {

    // create the div holding the todo's information
    const listItemDiv = document.createElement('div');
    listItemDiv.classList.add('listItem');

    // create the paragraph containing the todo's text
    const itemText = document.createElement('p');
    itemText.classList.add('itemText');
    itemText.innerText = todoText;

    // create the paragraph containing the todo's urgency
    todoUrgency = (todoUrgency == 1) ? 'High' : (todoUrgency == 2) ? 'Medium' : 'Low';

    const span = document.createElement('span');
    span.classList.add('priorityBox');
    span.innerText = todoUrgency;

    const itemPriority = document.createElement('p');
    itemPriority.classList.add('itemPriority', todoUrgency);

    itemPriority.append(span);

    // create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.append(document.createTextNode('X'));
    deleteBtn.classList.add('delete');

    // append the elements to do listItemDiv
    listItemDiv.append(itemText, itemPriority, deleteBtn);

    return listItemDiv;
}

function removeToDoItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            // get the listItemDiv we want to delete
            const listItemDiv = e.target.parentElement;
            // console.log(listItemDiv);

            // // get the todo's text and item urgency
            const listItemDivChildren = listItemDiv.children;
            const itemText = listItemDivChildren[0].innerText;
            let itemPriority = listItemDivChildren[1].innerText;
            itemPriority = (itemPriority === 'High') ? 1 : (itemPriority === 'Medium') ? 2 : 3;

            // remove the listItemDiv from the todoListDiv
            todoListDiv.removeChild(listItemDiv);

            // remove the todo information from the priority list
            todoPL.remove(itemText, itemPriority);
            // console.log(todoPL.print());
        }
    }
}

function buildToDoListDiv() {
    todoListDiv.innerHTML = '';
    const todoPList = todoPL.print();
    for (let i = 0; i < todoPList.length; i++) {
        const newToDoItem = createToDoListItem(todoPList[i][0], todoPList[i][1]);
        todoListDiv.append(newToDoItem);
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