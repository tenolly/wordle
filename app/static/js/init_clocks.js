fetch("/get_server_time").then((response) => response.json()).then((json) => {
    document.getElementById("clock-hours_hand").style.transform = `rotate(${json.hour * 30 + json.minute / 2}deg)`;
    document.getElementById("clock-minutes_hand").style.transform = `rotate(${json.minute * 6}deg)`;
})