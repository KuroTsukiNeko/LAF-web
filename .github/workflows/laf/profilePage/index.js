sumbitBtn = document.getElementById("submitBtn")
editBtn = document.getElementById("menuBtn")
calendarBtn = document.getElementById("calendarBtn")
avatarImg = document.getElementById("profileImg")

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
    charColor: "#ffffff",
    advantages: "",
    disadvantages: ""
}

function updateAvatar(){
    //const file = fileInput.files[0];
    //const img = new Image();
    //img.src = URL.createObjectURL(file);
    //avatarImg.src = img;
}

function updatePlayerData(){
    document.getElementById("playerName").innerHTML = playerData.name;
    document.getElementById("playerClass").innerHTML = playerData.class;
    document.getElementById("playerSpecies").innerHTML = playerData.species;
    document.getElementById("page").style.backgroundColor = playerData.charColor;
    document.getElementById("playerAdv").innerHTML = playerData.advantages;
    document.getElementById("playerDis").innerHTML = playerData.disadvantages;
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