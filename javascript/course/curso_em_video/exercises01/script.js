/*
const handleOnMouseMove = e => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);

}

for(const card of document.querySelectorAll(".card")) {
    card.onmousemove = e => handleOnMouseMove(e);
}

*/

document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
        const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    }
}

const triggerBtnApp1 = document.getElementById("app1")
const triggerBtnApp2 = document.getElementById("app2")

// Add Listener
triggerBtnApp1.addEventListener('click', click_app1)
triggerBtnApp2.addEventListener('click', click_app2)

// Declare  function
function click_app1() {
    window.location.href = "age_verifier/index.html"
    triggerBtnApp1.innerText = 'Clicou!'
    triggerBtnApp1.style.background = "rgb(0, 200, 0)";
}

function click_app2() {
    window.location.href = "clock_page/index.html"
    triggerBtnApp2.innerText = 'Clicou!'
    triggerBtnApp2.style.background = "rgb(0, 200, 0)";
}