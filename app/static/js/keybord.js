let currentLine = 0;
let currentCell = 0;

function pressKeybordButton(value) {
    if (value.length == 1) {
        if (currentCell < 5) {
            let cell = document.getElementById(`line_${currentLine}_cell_${currentCell}`);
            cell.innerHTML = value;
            ++currentCell;
        }
    }
}
