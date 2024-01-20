let title_div = document.getElementById("title-table");
    ["W", "O", "R", "D", "L", "E"].forEach((char, index) => {
    let div = document.createElement("div");
    div.className = `animation${index + 1}`;
    div.innerHTML = char;
    title_div.append(div);
})