const levels = [
    {
        question: "¿En donde fue nuestro primer beso?",
        options: ["Cine", "Carro", "En la casa"],
        correct: 1,
        success: "💖 Aun recuerdo esa noche... que lindo"
    },
    {
        question: "¿Cuál fue nuestro primer viaje juntos?",
        options: ["Playa", "Pueblo", "Lago de Yojoa"],
        correct: 0,
        success: " Nuestra primer salida a la playa 💘 Ya tenemos que ir de nuevo."
    },
    {
        question: "¿Que pelicula vimos en nuestra primer ida al cine?",
        options: ["Wicked", "Moana", "Intensamente 2"],
        correct: 2,
        success: "❤️ Despues de la pelicula fue nuestro primer beso 🫢"
    },
    {
        question: "¿En que ocasión te di el primer ramo de flores?",
        options: ["Aniversario", "Cumpleaños", "Graduación"],
        correct: 2,
        success: " Siempre lo recuerdas"
    },
    {
        question: "¿Donde cenamos en nuestro aniversario?",
        options: ["Fuego Lento", "La Casca", "Clementinas"],
        correct: 1,
        success: "Ya pronto lo celebramos de nuevo 🥰"
    },
    {
        question: "¿En donde te pedi que fueras mi novia?",
        options: ["En el carro", "En el restaurante", "En el cine"],
        correct: 0,
        success: "💍 Fue en el carro despues de una cena tu y yo en la casca, aun recuerdo aquel ramo con la rosa blanca"
    }
];

let currentLevel = 0;
let lastAnswerCorrect = false;

/* 🎧 AUDIO */
const bgMusic = document.getElementById("bgMusic");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

/* 🖥️ SCREENS */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s =>
        s.classList.remove("active")
    );
    document.getElementById(id).classList.add("active");
}

/* ▶️ START */
function startGame() {
    currentLevel = 0;

    bgMusic.volume = 0.4;
    bgMusic.play();

    showScreen("gameScreen");
    loadLevel();
}

/* 🎯 LOAD LEVEL */
function loadLevel() {
    const level = levels[currentLevel];

    document.getElementById("levelText").innerText =
        `LEVEL ${currentLevel + 1}`;

    document.getElementById("questionText").innerText =
        level.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    level.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

/* ✅ / ❌ CHECK */
function checkAnswer(selected) {
    const level = levels[currentLevel];

    if (selected === level.correct) {
        lastAnswerCorrect = true;
        correctSound.currentTime = 0;
        correctSound.play();

        document.getElementById("popupTitle").innerText =
            "Correctooo 🎉";
        document.getElementById("popupMessage").innerText =
            level.success;
    } else {
        lastAnswerCorrect = false;
        wrongSound.currentTime = 0;
        wrongSound.play();

        document.getElementById("popupTitle").innerText =
            "Icorrecto 💔";
        document.getElementById("popupMessage").innerText =
            "No pasa nada 💕 Intenta de nuevo";
    }

    showScreen("popupScreen");
}

/* ➡️ NEXT */
function nextLevel() {
    if (lastAnswerCorrect) {
        currentLevel++;

        if (currentLevel >= levels.length) {
            bgMusic.pause();
            winSound.play();
            showScreen("winScreen");
        } else {
            showScreen("gameScreen");
            loadLevel();
        }
    } else {
        showScreen("gameScreen");
        loadLevel();
    }
}

/* 💬 WHATSAPP */
function sendWhatsApp() {
    const accept = document.getElementById("accept").value;
    const restaurant = document.getElementById("restaurant").value;
    const comment = document.getElementById("comment").value;

    const msg = `
💖 VALENTIN GAME 💖
Acepta la cita: ${accept}
Lugar: ${restaurant}
Mensaje: ${comment}
`;

   window.open(
    `https://wa.me/50497744055?text=${encodeURIComponent(msg)}`,
    "_blank"
);

}
