// Variable Good 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
//load event
loadEventListner();

//load ALL EVENTS 
function loadEventListner(){
    //LOAD DOM 
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);//calling function add task
    //REmove task
    taskList.addEventListener('click' , removeTask);
    //Clear All Taskks
    clearBtn.addEventListener('click' , clearAllTasks);
    // Filter LIst
    filter.addEventListener('keyup',filterTask);
}
//Get tasks from Local storage and display
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Create a li list item 
        const li = document.createElement('li');
        //Add Class
        li.className = 'collection-item';
        //create text node and append to li
        // Create New Link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon HTML
        link.innerHTML = '<i class="fa fa-times"></i>';

        ///Append link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}

//ADD TASKS FUNCTON
function addTask(e){
    if (taskInput.value === '') {
        alert('Add a Task First'); 
    }else{

    //Create a li list item 
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
        
    // Create New Link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon HTML
    link.innerHTML = '<i class="fa fa-times"></i>';

    ///Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    
    // Save data to the Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear Input after add a task
    taskInput.value='';
    }   
    //Prevent default Form behaviour
    e.preventDefault();
}

//Store Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// REMOVE TASK 
function removeTask(e){

    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        
        //  REmove from local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}
//remove from local storagr

function removeTaskFromLocalStorage(taskitem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskitem.textContent === task){
            tasks.splice(index , 1);
        }
    });

    localStorage.setItem('tasks' , JSON.stringify(tasks));
}
//Clear all tasks
function clearAllTasks(){
    taskList.innerHTML='';    
    
    // Clear task from  local storage
    clearAllFromLocalStorage();
}
///clear all local storag
function clearAllFromLocalStorage(){
    localStorage.clear();
}
//Filter Task
function filterTask(e){
    const text = e.target.value.toLowerCase(); // it will take whatever we type in filter list 
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
