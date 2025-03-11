// Action List:
actionListOpened = false;
// 1. Edit
editBtn = document.querySelector(".editBtn")
sumbitEditBtn = document.getElementById("submitEditBtn")
// 2. Erase
eraseBtn = document.getElementById("eraseBtn")
eraseConfirmBtn = document.getElementById("confirmErase")
eraseCancelBtn = document.getElementById("cancelErase")
// 3. Activate
activateBtn = document.getElementById("activateBtn");

// Adding
addBtn = document.getElementById("menuBtn")
addNameIn = document.getElementById("addNameIn");
addStatSel = document.getElementById("addStatSel");
addExpIn = document.getElementById("addExpIn");
sumbitAddBtn = document.getElementById("submitAddBtn")

// Edit modal fields
editNameIn = document.getElementById("editNameIn");
editStatSel = document.getElementById("editStatSel");
editExpIn = document.getElementById("editExpIn");
currentId = 0;

// --------------------------------

// 1. ACTION: Erasing
eraseConfirmBtn.addEventListener("click", ()=>{
    document.getElementById("eraseAlert").style.display = "none";
})

eraseCancelBtn.addEventListener("click", ()=>{
    document.getElementById("eraseAlert").style.display = "none";
})

eraseBtn.addEventListener("click", function (){
    document.getElementById("eraseAlert").style.display = "block";
})

// MENU: Adding
addBtn.addEventListener("click", function (){
    document.getElementById("addModal").style.display = "block";
})

sumbitAddBtn.addEventListener("click", function (){
    document.getElementById("addModal").style.display = "none";
})

// 2. ACTION: Editing
editBtn.addEventListener("click", function (){
    document.getElementById("editModal").style.display = "block";
    fillEditFields();
})

sumbitEditBtn.addEventListener("click", function (){
    document.getElementById("editModal").style.display = "none";
    sumbitEdit();
})

// 3. ACTION: Activate
activateBtn.addEventListener("click", function (){
    currentStatus = document.getElementById("active" + currentId);
    if (currentStatus.innerHTML == "TAK") {
        currentStatus.innerHTML = "NIE";
    }
    else{
        currentStatus.innerHTML = "TAK";
    }
})

// ACTION LIST
const actionBtns = document.getElementsByClassName("actionBtn");
Array.from(actionBtns).forEach((element) => {
    element.addEventListener("click", (event) => {
        const popup = document.getElementById("actionsBox");
        if (actionListOpened) {
            popup.style.display = "none";
            actionListOpened = false;
        }
        else {
            currentId = element.innerHTML;
            const x = event.clientX; // Współrzędna X kliknięcia
            const y = event.clientY; // Współrzędna Y kliknięcia
    
            popup.style.left = `${x}px`;
            popup.style.top = `${y}px`;
            popup.style.display = "block"; // Wyświetlenie popupu    
            actionListOpened = true;
        }
    });
});


const actionOptionBtns = document.getElementsByClassName("actionOptionBtn");
Array.from(actionOptionBtns).forEach((element) => {
    element.addEventListener("click", ()=> {
        if (actionListOpened) {
            const popup = document.getElementById("actionsBox");
            popup.style.display = "none";
            actionListOpened = false;
        }
    })
})


function fillEditFields(){
    editNameIn.value = document.getElementById("name" + currentId).innerHTML;
    editStatSel.value = document.getElementById("stat" + currentId).innerHTML;
    editExpIn.value = parseInt(document.getElementById("exp" + currentId).innerHTML);
}

function sumbitEdit(){
    document.getElementById("name" + currentId).innerHTML = editNameIn.value;
    document.getElementById("stat" + currentId).innerHTML = editStatSel.value;
    document.getElementById("exp" + currentId).innerHTML = editExpIn.value;
}