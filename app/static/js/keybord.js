let currentLine = 0;
let currentCell = 0;

function pressKeybordButton(value) {
    if (currentCell < 5) {
        let cell = document.getElementById(`line_${currentLine}_cell_${currentCell}`);
        cell.innerHTML = value;
        ++currentCell;
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
        //
    } else {
        //
    }
}

function pressBackspaceButton() {

}