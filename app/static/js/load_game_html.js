let title_div = document.getElementById("title-container");
["W", "O", "R", "D", "L", "E"].forEach((char) => {
    let div = document.createElement("div");
    div.className = "trembling--animation";
    div.innerHTML = char;
    title_div.append(div);
})

let answer_table = document.getElementById("answer_table");
let result_table = document.getElementById("result_table");
for (i = 0; i < 6; ++i) {
    let div = document.createElement("div");
    div.id = `line_${i}`
    div.className = "answer_table-line";
    div.innerHTML = [...Array(5).keys()].map(
        (num) => `<div class="answer_table-line-cell"><div id="line_${i}_cell_${num}"></div></div>`)
        .join("");
    answer_table.append(div);
    
    div = document.createElement("div");
    div.id = `line_${i}--result`
    div.className = "result_table-line";
    div.innerHTML = [...Array(5).keys()].map(
        (num) => `<div class="result_table-line-cell"><div id="line_${i}_cell_${num}--result"></div></div>`)
        .join("");
    result_table.append(div);
}
