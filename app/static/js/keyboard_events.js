const language = document.documentElement.lang;
const languages = {
    "en": {
        "alphabet": /^[A-Z]$/i,
        "win_label": "YOU WIN",
        "lose_label": "YOU LOSE"
    },
    "ru": {
        "alphabet": /^[А-Я]$/i,
        "win_label": "ПОБЕДА",
        "lose_label": "ПРОИГРЫШ"
    }
}

let is_playing = true;

let currentLine = 0;
let currentCell = 0;

function pressKeyboardButton(value) {
    if (currentCell < 5) {
        let cell = document.getElementById(`line_${currentLine}_cell_${currentCell}`);
        cell.parentElement.style = "box-shadow: 0 0 0 1px;"
        cell.innerHTML = value;
        ++currentCell;
    }
}

function pressBackspaceButton() {
    if (currentCell > 0) {
        --currentCell;
        let cell = document.getElementById(`line_${currentLine}_cell_${currentCell}`);
        cell.parentElement.style = "";
        cell.innerHTML = "";
    }
}

async function pressEnterButton() {
    if (currentCell != 5) {
        let line = document.getElementById(`line_${currentLine}`)
        line.classList.add("trembling--animation")
        setTimeout(() => {line.classList.remove("trembling--animation")}, 300);
        return;
    }

    const response = await fetch(window.location.href.replace("game", "check_word"), {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
            "lang": document.documentElement.lang,
            "word": [...Array(5).keys()].map((num) => document.getElementById(`line_${currentLine}_cell_${num}`).innerText).join("")
        })
    });

    if (response.ok) {
        const result = await response.json();
        if (result["success"]) {
            console.log(result);
            let is_win_game = true;
            for (i = 0; i < result["word"].length; ++i) {
                is_win_game = is_win_game && (result["result"][i].toLowerCase() == "g");
                
                let cell = document.getElementById(`line_${currentLine}_cell_${i}`);
                cell.parentElement.classList.add(`cell--state-${result["result"][i].toLowerCase()}--animation-${i + 1}`);
                let cell_result = document.getElementById(`line_${currentLine}_cell_${i}--result`);
                cell_result.parentElement.classList.add(`cell--state-${result["result"][i].toLowerCase()}--color-${i + 1}`);
                
                let key = document.getElementById(`button_${result["word"][i].toLowerCase()}`);
                if (!key.className.startsWith("cell--state-g--color")) {
                    key.className = `cell--state-${result["result"][i].toLowerCase()}--color-${i + 1}`;
                }
            };
            ++currentLine;
            currentCell = 0;

            if (is_win_game || currentLine == 6) {
                document.getElementById("page-content").classList.add("disappearance--animation");
                let modal_window = document.getElementById("result_modal_window");
                modal_window.hidden = false;
                modal_window.classList.add("slide_left--animation");

                let win_label = languages[language]["win_label"];
                let lose_label = languages[language]["lose_label"];
                document.getElementById("result_modal_window-title").innerText = is_win_game ? win_label : lose_label;
                is_playing = false;
            }
        } else {
            let line = document.getElementById(`line_${currentLine}`)
            line.classList.add("trembling--animation")
            setTimeout(() => {line.classList.remove("trembling--animation")}, 300);
        }
    } else {
        alert("Server error");
    }
}

addEventListener("keydown", (event) => {
    if (!is_playing) return;

    if (event.key == "Enter") {pressEnterButton()}
    else if (event.key == "Backspace") {pressBackspaceButton()}
    else if (languages[language]["alphabet"].test(event.key)) {pressKeyboardButton(event.key.toUpperCase())}
});