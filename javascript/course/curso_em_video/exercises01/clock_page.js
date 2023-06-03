function updateClock() {
    const now = new Date();
    const clockText = document.querySelector("h2#clock_text");
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();

    function addLeadingZero(n) {
        let nOut = n.toString();
        if (nOut.length < 2) {
            return '0' + nOut;
        } else {
            return nOut;
        }
    }

    hour = addLeadingZero(hour)
    min = addLeadingZero(min)
    sec = addLeadingZero(sec)

    clock_text.innerHTML = 
    `${hour}:
    ${min}:
    ${sec}`;
}

updateClock();

setInterval(updateClock, 1000);
