let title_div = document.getElementById("title-table");
["W", "O", "R", "D", "L", "E"].forEach((char) => {
    let div = document.createElement("div");
    div.className = "trembling-animation";
    div.innerHTML = char;
    title_div.append(div);
})

let answer_table = document.getElementById("answer-table");
for (i = 0; i < 6; ++i) {
    let div = document.createElement("div");
    div.className = "answer-table-line";
    div.innerHTML = [...Array(5).keys()].map((num) => `<div id="line_${i}_cell_${num}"></div>`).join("");
    answer_table.append(div);
}

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