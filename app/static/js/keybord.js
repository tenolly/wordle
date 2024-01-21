let currentLine = 0;
let currentCell = 0;

function pressKeybordButton(value) {
    if (currentCell < 5) {
        let cell = document.getElementById(`line_${currentLine}_cell_${currentCell}`);
        cell.innerHTML = value;
        ++currentCell;
    }
}

function pressBackspaceButton() {
    if (currentCell > 0) {
        --currentCell;
        let cell = document.getElementById(`line_${currentLine}_cell_${currentCell}`);
        cell.innerHTML = "";
    }
}

async function pressEnterButton() {
    if (currentCell != 5) {
        alert("Not enough letters");
        return;
    }

    const response = await fetch(window.location.href.replace("game", "check_word"), {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(
            { "word": [...Array(5).keys()].map((num) => document.getElementById(`line_${currentLine}_cell_${num}`).innerText).join("") }
        )
    });

    if (response.ok) {
        const result = await response.json();
        if (result["succses"]) {
            for (i = 0; i < result["word"].length; ++i) {
                let savedI = i;
                let savedCurrentLine = currentLine;
                setTimeout(() => {
                    let cell = document.getElementById(`line_${savedCurrentLine}_cell_${savedI}`);
                    cell.parentElement.classList.add(`cell--state-${result["result"][savedI].toLowerCase()}--animation`);
                }, 150 * i);
                setTimeout(() => {
                    let key = document.getElementById(`button_${result["word"][savedI].toLowerCase()}`);
                    if (key.className != "cell--state-g--color") {
                        key.className = `cell--state-${result["result"][savedI].toLowerCase()}--color`;
                    }
                }, 400 + 150 * i);
            };
            ++currentLine;
            currentCell = 0;
        } else {
            let line = document.getElementById(`line_${currentLine}`)
            line.classList.add("trembling-animation")
            setTimeout(() => {line.classList.remove("trembling-animation")}, 300);
        }
    } else {
        alert("Server error");
    }
}