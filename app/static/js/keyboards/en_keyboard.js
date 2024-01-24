let keyboard_table = document.getElementById("keyboard_table");
let keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["<img src=\"static/images/backspace.svg\" class='backspace-svg'>",
        "Z", "X", "C", "V", "B", "N", "M", "ENTER"]
];
keyboard.forEach((line) => {
    let keyboard_line = document.createElement("div");
    keyboard_line.className = "keyboard-line";
    line.forEach((char) => {
        let button = document.createElement("button");
        if (char.length == 1) {
            button.id = `button_${char.toLowerCase()}`
            button.onclick = () => pressKeyboardButton(char)
        } else {
            button.className = "keyboard-line-button--long_text"
            if (char == "ENTER") { button.onclick = () => pressEnterButton() }
            else { button.onclick = () => pressBackspaceButton() }
        }
        button.innerHTML = char;
        keyboard_line.append(button);
    })
    keyboard_table.append(keyboard_line);
})