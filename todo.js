var editId = "";
var countOfAllTasks = 0;
var countOfActiveTasks = 0;
let allTaskBlocks = []; 

/* 
   This variable is used to know which tab (ALL | ACTIVE | COMPLETED) is currently open.
   1 is for ALL(default)
   2 is for ACTIVE
   3 is for COMPLETED.
*/
var tab = 1;

// This function will be called when "Add" button is clicked.
function onAddTask()
{
    // Fetch the task name from textfield.
    let textField = document.getElementById("task");
    let newTask = textField.value;
    let newTaskString = String(newTask);
    
    let valid = true;

    // If the task length is zero, then task is invalid    
    let length = newTaskString.length;
    if(length == 0)
        valid = false;
    
    // Check if the task name contains atleast 1 character which is NOT equal to space (' ')
    let nonSpace = false;
    for(let ch = 0; ch < length; ++ch)
        if(newTaskString.charAt(ch) != ' ')
            {
            nonSpace = true;
            break;
            }
    
    valid = nonSpace;
        
    // If task is NOT valid, display an alert.
    if(valid == false)  
        {
        alert("Task is INVALID !! \n Please add a valid task");
        return;
        }
        
    // Make the textfield empty again.
    textField.value = "";
        
    // If "Add" button is clicked to change the existing task, then call changeTaskName().
    if(editId.length > 0)
        {
        changeTaskName(newTaskString);
        editId = "";
        return;
        }    
        
    // Increment the number of active tasks.
    countOfActiveTasks += 1;
    
    //Increment the number of all tasks.
    countOfAllTasks += 1;
    
    if(countOfAllTasks > 0)
        {
        // Display the updated number of remaining tasks if there is atleast 1 task.
        let para = document.getElementById("remaining");
        para.innerHTML = String(countOfActiveTasks) + " tasks remaining";
        }
    else
        {
        // Display nothing if there is no task.
        let para = document.getElementById("remaining");
        para.innerHTML = "";  
        }   
        
    // Create a new ID.
    let newID = String(Math.floor(Math.random() * 1000_000_000));
        
    // Create a new Checkbox for task.
    let newCheckBox = document.createElement("input"); 
    newCheckBox.setAttribute("type", "checkbox");
    newCheckBox.setAttribute("id", newID + "-checkbox");
    newCheckBox.setAttribute("onchange", "onCheckBoxStateChange(this)");
    
    // Create a new Checkmark
    let newCheckmark = document.createElement("span");
    newCheckmark.setAttribute("class", "checkmark");
    newCheckmark.setAttribute("id", newID + "-checkmark");
    
    // Create a new Label for checkbox
    let newLabel = document.createElement("label");
    newLabel.setAttribute("class", "container");
    newLabel.setAttribute("id", newID + "-label");
    newLabel.innerHTML = newTaskString;
    
    // Add Checkbox and Checkmark to the Label
    newLabel.appendChild(newCheckBox);
    newLabel.appendChild(newCheckmark);
  
    // Create a new Edit button
    let newEditButton = document.createElement("button");
    newEditButton.setAttribute("type", "button");
    newEditButton.setAttribute("class", "edit_button");
    newEditButton.setAttribute("id", newID + "-edit");
    newEditButton.setAttribute("onclick", "onEditTask(this)");
    newEditButton.innerHTML = "Edit"; 
        
    // Create a new Delete button
    let newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute("type", "button");
    newDeleteButton.setAttribute("class", "delete_button");
    newDeleteButton.setAttribute("id", newID + "-delete");
    newDeleteButton.setAttribute("onclick", "onDeleteTask(this)");
    newDeleteButton.innerHTML = "Delete";
    
    // Create a new Button group.
    let newButtonGroup = document.createElement("div");
    newButtonGroup.setAttribute("class", "button_group");
    
    // Add Edit and Delete buttons to Button group.
    newButtonGroup.appendChild(newEditButton);
    newButtonGroup.appendChild(newDeleteButton);
    
    // Create a new Task Block. A task block contains everything related to a task like checkbox, label, edit and delete button.
    let newTaskBlock = document.createElement("div");
    newTaskBlock.setAttribute("class", "new-task");
    newTaskBlock.setAttribute("id", newID);
    
    // Add Label to the Task Block.
    newTaskBlock.appendChild(newLabel);
    
    // Add Button group to the Task Block.
    newTaskBlock.appendChild(newButtonGroup);
    
    // Add Task Block to its parent.
    (document.getElementById("new_div2")).appendChild(newTaskBlock);
    
    // Add Task Block to the blocks array.
    allTaskBlocks.push(newTaskBlock);
    
    // If COMPLETED tab is current open, then do not display the new task because new task is incompleted by default.
    if(tab == 3)
        newTaskBlock.style["display"] = "none";
}

// This function will be called when checkbox is clicked.
function onCheckBoxStateChange( checkbox )
{
    // Get the parent label from checkbox.
    let label = checkbox.parentElement;
    
    // Get the parent task block from label.
    let taskBlock = label.parentElement;
    
    // Checkbox is checked when the task is completed.
    if(checkbox.checked)
        {
        // Decrement the number of active tasks by 1.
        countOfActiveTasks -= 1;
        
        // If ACTIVE is the current tab, do not display the completed tasks.
        if(tab == 2)
            taskBlock.style["display"] = "none";
        
        // Strike-through the task with a maroon color line.
        label.style["text-decoration"] = "line-through";
        label.style["text-decoration-color"] = "maroon";
        
        }
    else
        {
        // Increment the number of active tasks by 1.
        countOfActiveTasks += 1;
        
        // If COMPLETED is the current tab, do not display the incompleted tasks.
        if(tab == 3)
            taskBlock.style["display"] = "none";
        
        // Remove the strike-through line.
        label.style["text-decoration"] = "initial";
        }
        
    // Display the updated number of remaining tasks.
    let para = document.getElementById("remaining");
    para.innerHTML = String(countOfActiveTasks) + " tasks remaining";    
}

// This function will be called when "Delete" button is clicked.
function onDeleteTask( deleteButton )
{    
    // Get the parent button group of the delete button.
    let buttonGroup = deleteButton.parentElement;
    
    // Get the parent task block of the button group.
    let taskBlock = buttonGroup.parentElement;
    
    // Get the task block ID from it.
    let taskBlockId = taskBlock.getAttribute("id");
    
    // If the task, which is being deleted, is same task, which is being edited.
    if(taskBlockId == editId)
        {
        editId = "";
        let textField = document.getElementById("task");
        textField.value = "";
        }    
    
    // Create the checkbox ID.
    let checkBoxId = taskBlockId + "-checkbox";
    
    // Get the checkbox from its ID.
    let checkBox = document.getElementById(checkBoxId); 
    
    // If an active task is being deleted, decrement the number of active tasks.
    if(checkBox.checked == false)
        countOfActiveTasks -= 1;
        
    // Decrement the number of all tasks.
    countOfAllTasks -= 1;    
    
    if(countOfAllTasks > 0)
        {
        // Display the updated number of remaining tasks if there is atleast 1 task.
        let para = document.getElementById("remaining");
        para.innerHTML = String(countOfActiveTasks) + " tasks remaining";   
        }
     else
        {
        // Display nothing if there is no task.
        let para = document.getElementById("remaining");
        para.innerHTML = "";  
        }   
    
    // Remove task block from its Parent.
    (document.getElementById("new_div2")).removeChild(taskBlock);
    
    // Remove task block from the blocks array.
    allTaskBlocks = allTaskBlocks.filter(item => (item.getAttribute("id")) !== taskBlockId);
}

// This function will be called when "Edit" button is clicked.
function onEditTask( editButton )
{
    // Get the parent button group of the edit button.
    let buttonGroup = editButton.parentElement;
    
    // Get the parent task block of the button group.
    let taskBlock = buttonGroup.parentElement;
    
    // Set the editId equal to the ID of current task block which is being edited.
    editId = taskBlock.getAttribute("id");
    
    // Get the label from the task block.
    let label = taskBlock.firstChild;
    
    // Get the innerHTML content of label.
    let innerHTMLContent = String(label.innerHTML);
    
    // Get the task name from the innerHTML content.
    let firstIndex = innerHTMLContent.indexOf("<");
    let task = innerHTMLContent.substring(0, firstIndex);
    
    // Display the task name in the textfield for editing.
    let textField = document.getElementById("task");
    textField.value = task;
}

function changeTaskName( newTaskString )
{
    // Get the task block from editId.
    let taskBlock = document.getElementById(editId);

    // Create the checkbox ID, checkmark ID and label ID.
    let checkboxId = editId + "-checkbox";
    let checkmarkId = editId + "-checkmark";
    let labelId = editId + "-label";

    // Get the checkbox, checkmark and label from their IDs.
    let checkbox = document.getElementById(checkboxId);
    let checkmark = document.getElementById(checkmarkId);
    let label = document.getElementById(labelId);
    
    // Change the label's text.
    label.innerHTML = newTaskString;
    
    // Add the checkbox and checkmark back to the label.
    label.appendChild(checkbox);
    label.appendChild(checkmark);
}

// This function will be called when "All" tab is clicked.
function onAll()
{
    // Get the ALL, ACTIVE and COMPLETED tab from their IDs.
    let all = document.getElementById("all");
    let active = document.getElementById("active");
    let completed = document.getElementById("completed");
    
    // Change the class of all three tabs. This is done to reflect changes of the border of tabs.
    all.setAttribute("class", "Active");
    active.setAttribute("class", "a");
    completed.setAttribute("class", "a");

    for(let i = 0 ; i < allTaskBlocks.length; ++i)
        {
        // Get the current task block.
        let taskBlock = allTaskBlocks[i];
      
        taskBlock.style["display"] = "inline-block";
        }
    
    // Make the ALL tab as the current tab. 
    tab = 1;
}

// This function will be called when "All" tab is clicked.
function onActive()
{
    // Get the ALL, ACTIVE and COMPLETED tab from their IDs.
    let all = document.getElementById("all");
    let active = document.getElementById("active");
    let completed = document.getElementById("completed");
    
    // Change the class of all three tabs. This is done to reflect changes of the border of tabs.
    all.setAttribute("class", "a");
    active.setAttribute("class", "Active");
    completed.setAttribute("class", "a");

    for(let i = 0 ; i < allTaskBlocks.length; ++i)
        {
        // Get the current task block.
        let taskBlock = allTaskBlocks[i];
        
        // Get the ID of current task block.
        let taskBlockId = taskBlock.getAttribute("id");
        
        // Create the checkbox ID.
        let checkBoxId = taskBlockId + "-checkbox";
    
        // Get the checkbox from its ID.
        let checkBox = document.getElementById(checkBoxId); 
        
        // If task is completed, then do not display it.
        if(checkBox.checked)
            taskBlock.style["display"] = "none";
        else
            taskBlock.style["display"] = "inline-block";
        }
    
    // Make the ACTIVE tab as the current tab. 
    tab = 2;
}

// This function will be called when "All" tab is clicked.
function onCompleted()
{
    // Get the ALL, ACTIVE and COMPLETED tab from their IDs.
    let all = document.getElementById("all");
    let active = document.getElementById("active");
    let completed = document.getElementById("completed");
    
    // Change the class of all three tabs. This is done to reflect changes of the border of tabs.
    all.setAttribute("class", "a");
    active.setAttribute("class", "a");
    completed.setAttribute("class", "Active");
    
    for(let i = 0 ; i < allTaskBlocks.length; ++i)
        {
        // Get the current task block.
        let taskBlock = allTaskBlocks[i];
        
        // Get the ID of current task block.
        let taskBlockId = taskBlock.getAttribute("id");
        
        // Create the checkbox ID.
        let checkBoxId = taskBlockId + "-checkbox";
    
        // Get the checkbox from its ID.
        let checkBox = document.getElementById(checkBoxId); 
        
        // If task is completed, then do not display it.
        if(checkBox.checked == false)
            taskBlock.style["display"] = "none";
        else
            taskBlock.style["display"] = "inline-block";
        }
    
    // Make the COMPLETED tab as the current tab. 
    tab = 3;
}

