sumbitBtn = document.getElementById("submitBtn")
editBtn = document.getElementById("menuBtn")
calendarBtn = document.getElementById("calendarBtn")
avatarImg = document.getElementById("profileImg")

placeholderTxt = "[brak]";

classes = [
    { name: "Wojownik" },
    { name: "Mag" },
    { name: "Bard"}
]

species = [
    { name: "Człowiek" },
    { name: "Elf" },
    { name: "Pół-Elf"}
]

playerData = {
    name: "",
    species: "",
    class: "",
    charColor: "#eeeeee",
    advantages: "",
    disadvantages: ""
}


// ZCZYTANIE DANYCH DLA UŻYTKOWIKA
document.addEventListener("DOMContentLoaded", function() {

    fetch('./php/update_profile.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd sieci: ' + response.status);
        }
        return response.json();
    }).then(data => {
        if (data.error) {
        console.error('Błąd z PHP:', data.error);
        } else {
        console.log('Dane gracza:', data);
        // możesz teraz np. wyświetlić dane na stronie
        playerData.name = data.nickname;
        playerData.species = data.species;
        playerData.class = data.class;
        playerData.advantages = data.advantages;
        playerData.disadvantages = data.disadvantages;
        updatePlayerData();
        }
    }).catch(error => {
        console.error('Błąd podczas fetch:', error);
    });
});

function updateAvatar(){
    //const file = fileInput.files[0];
    //const img = new Image();
    //img.src = URL.createObjectURL(file);
    //avatarImg.src = img;
}

function updatePlayerData(){
    updatePlayerDataHelp("playerName", playerData.name);
    updatePlayerDataHelp("playerSpecies", playerData.species);
    updatePlayerDataHelp("playerAdv", playerData.advantages);
    updatePlayerDataHelp("playerDis", playerData.disadvantages);
    
    if (playerData.charColor != null)
        document.getElementById("page").style.backgroundColor = playerData.charColor;
    else
    document.getElementById("page").style.backgroundColor = "#eeeeee";
}

function updatePlayerDataHelp(id, value){
    if (value == null)
        document.getElementById(id).innerHTML = placeholderTxt;
    else
        document.getElementById(id).innerHTML = value;
}

// Funkcja dostosowująca kolor nagłówka do tła tak, żeby był widoczny
function changeHeaderColor(backgroundColor) {
    // Konwertuj kolor z formatu #RRGGBB na wartości RGB
    const r = parseInt(backgroundColor.slice(1, 3), 16); // Czerwony
    const g = parseInt(backgroundColor.slice(3, 5), 16); // Zielony
    const b = parseInt(backgroundColor.slice(5, 7), 16); // Niebieski

    // Oblicz względną jasność (luminancję)
    // Wzór: 0.2126*R + 0.7152*G + 0.0722*B (wartości muszą być w zakresie [0, 1])
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Wybierz kolor tekstu na podstawie jasności tła
    const textColor = luminance > 0.5 ? '#000000' : '#ffffff'; // Jasne tło -> ciemny tekst, ciemne tło -> jasny tekst

    // Ustaw styl elementu
    document.getElementById("playerNameHeader").style.color = textColor;
}

sumbitBtn.addEventListener("click", function (){
    playerData.name = document.getElementById("nameIn").value;
    playerData.class = document.getElementById("classSel").value;
    playerData.species = document.getElementById("speciesSel").value;
    playerData.charColor = document.getElementById("colorIn").value;
    changeHeaderColor(playerData.charColor);
    updateAvatar();
    playerData.advantages = document.getElementById("advantagesArea").value;
    playerData.disadvantages = document.getElementById("disadvantagesArea").value;
    updatePlayerData();
    document.getElementById("editModal").style.display = "none";
})

editBtn.addEventListener("click", function (){
    document.getElementById("editModal").style.display = "block";
    classes.forEach(element => {
        const node = document.createElement("option");
        node.innerHTML = element.name;
        document.getElementById("classSel").appendChild(node);
    });
    
    species.forEach(element => {
        const node = document.createElement("option");
        node.innerHTML = element.name;
        document.getElementById("speciesSel").appendChild(node);
    });  
})

calendarBtn.addEventListener("click", () =>
{
    window.open("../calendarPage/index.html", "_self");
})