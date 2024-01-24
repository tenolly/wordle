fetch("/get_server_time").then((response) => response.json()).then((json) => {
    document.getElementById("clock-hours_hand-wrapper").style.transform = `rotate(${json.hour * 30 + json.minute / 2}deg)`;
    document.getElementById("clock-minutes_hand-wrapper").style.transform = `rotate(${json.minute * 6}deg)`;
})

function overloadClocks() {
    setTimeout(() => {document.getElementById("new_word").hidden = false}, 2400)
    document.getElementById("clock-hours_hand").classList.add("clock-hours_hand--overloaded");
    document.getElementById("clock-minutes_hand-wrapper").classList.add("clock-minutes_hand--overloaded");
    document.getElementById("clock-point").classList.add("clock-point--overloaded");
    document.getElementById("clock").classList.add("clock--overloaded");
}