changeNickBtn = document.getElementById('changeNickBtn');
changePasswordBtn = document.getElementById('changePasswordBtn');
removeAccountBtn = document.getElementById('removeAccountBtn');

nickIn = document.getElementById('nickIn');
currentPassIn = document.getElementById('currentPassIn');
newPassIn = document.getElementById('newPassIn');
newPass2In = document.getElementById('newPass2In');
removeAccountIn = document.getElementById('removeAccountIn');


nickIn.addEventListener("input", function() {
    if (nickIn.value.length < 3){
        nickIn.classList.remove('success-highlight')
        nickIn.classList.add("error-highlight");
    }
    else {
        nickIn.classList.remove('error-highlight')
        nickIn.classList.add("success-highlight");
    }
})

changePasswordBtn.addEventListener("click", function() {
    if (currentPassIn.value == ""){
        currentPassIn.classList.add("error-highlight");
    } else {
        currentPassIn.classList.remove("error-highlight");
    }
    if (newPassIn.value == ""){
        newPassIn.classList.add("error-highlight");
    } else {
        newPassIn.classList.remove("error-highlight");
    }
    if (newPass2In.value == ""){
        newPass2In.classList.add("error-highlight");
    } else {
        newPass2In.classList.remove("error-highlight");
    }
})

removeAccountIn.addEventListener("input", function() {
    if (removeAccountIn.value == ""){
        removeAccountIn.classList.add("error-highlight");
    } else {
        removeAccountIn.classList.remove("error-highlight");
    }
    
})

removeAccountBtn.addEventListener("click", function() {
    if (removeAccountIn.value == ""){
        removeAccountIn.classList.add("error-highlight");
    }
})