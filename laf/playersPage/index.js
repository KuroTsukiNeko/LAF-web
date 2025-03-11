// Action List:
actionListOpened = false;
// 1. Edit
editBtn = document.querySelector(".editBtn")
sumbitEditBtn = document.getElementById("submitEditBtn")
// 2. Erase
eraseBtn = document.getElementById("eraseBtn")
eraseConfirmBtn = document.getElementById("confirmErase")
eraseCancelBtn = document.getElementById("cancelErase")
// 3. Profile
profileBtn = document.getElementById("profileBtn")

// Adding a player
addBtn = document.getElementById("menuBtn")
sumbitAddBtn = document.getElementById("submitAddBtn")

// --------------------------------

// 1. ACTION: Erasing a player
eraseConfirmBtn.addEventListener("click", ()=>{
    document.getElementById("eraseAlert").style.display = "none";
})

eraseCancelBtn.addEventListener("click", ()=>{
    document.getElementById("eraseAlert").style.display = "none";
})

eraseBtn.addEventListener("click", function (){
    document.getElementById("eraseAlert").style.display = "block";
})

// MENU: Adding a player
addBtn.addEventListener("click", function (){
    document.getElementById("addModal").style.display = "block";
})

sumbitAddBtn.addEventListener("click", function (){
    document.getElementById("addModal").style.display = "none";
})

// 2. ACTION: Editing a player
editBtn.addEventListener("click", function (){
    document.getElementById("editModal").style.display = "block";
})

sumbitEditBtn.addEventListener("click", function (){
    document.getElementById("editModal").style.display = "none";
})

// 3. ACTION: Showing player's profile
profileBtn.addEventListener("click", function (){
    window.open("../profilePage/index.html", "_self")
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