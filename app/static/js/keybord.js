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
            result["result"].forEach((state, index) => {
                let lineId = `line_${currentLine}_cell_${index}`
                setTimeout(() => {
                    let cell = document.getElementById(lineId);
                    cell.parentElement.classList.add(`cell--state-${state.toLowerCase()}`);
                }, 150 * index);
            });
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