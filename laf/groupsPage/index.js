// Action List:
actionListOpened = false;
// 1. Edit
editBtn = document.querySelector(".editBtn")
sumbitEditBtn = document.getElementById("submitEditBtn")
// 2. Erase
eraseBtn = document.getElementById("eraseBtn")
eraseConfirmBtn = document.getElementById("confirmErase")
eraseCancelBtn = document.getElementById("cancelErase")
// 3. Show players
showBtn = document.getElementById('showBtn');
showModal = document.getElementById('showModal');

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
    //console.log("siema");
})

/*submitAddBtn.addEventListener("click", function (){
    document.getElementById("addModal").style.display = "none";
})*/

// 2. ACTION: Editing
editBtn.addEventListener("click", function (){
    document.getElementById("editModal").style.display = "block";
    fillEditFields();
})

sumbitEditBtn.addEventListener("click", function (){
    document.getElementById("editModal").style.display = "none";
    sumbitEdit();
})

// 3. ACTION: Show players
showBtn.addEventListener("click", function (){
    showModal.style.display = "block";
})

// ACTION LIST
function ActionBtns() {
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
                //document.getElementById("editIdIn").value = currentId;
                //document.getElementById("deleteIdIn").value = currentId;
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

}
document.addEventListener("DOMContentLoaded", function() {
    ActionBtns();
});