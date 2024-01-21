let keybord_table = document.getElementById("keybord-table");
let keybord = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["<img src=\"static/images/backspace.svg\" class='backspace-svg'>",
        "Z", "X", "C", "V", "B", "N", "M", "ENTER"]
];
keybord.forEach((line) => {
    let keybord_line = document.createElement("div");
    keybord_line.className = "keybord__line";
    line.forEach((char) => {
        let button = document.createElement("button");
        if (char.length == 1) {
            button.id = `button_${char.toLowerCase()}`
            button.onclick = () => pressKeybordButton(char)
        } else {
            button.className = "keybord__line-button--long-text"
            if (char == "ENTER") { button.onclick = () => pressEnterButton() }
            else { button.onclick = () => pressBackspaceButton() }
        }
        button.innerHTML = char;
        keybord_line.append(button);
    })
    keybord_table.append(keybord_line);
})