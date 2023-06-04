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

    clock_text.innerHTML = `${hour}:${min}:${sec}`;
}

updateClock();

setInterval(updateClock, 1000);

function load() {
    // Update container height according to its width
    const container = document.querySelector('section');
    const width = getComputedStyle(container).width;
    const numericWidth = parseFloat(width.match(/\d+/)[0]);
    container.style.height = `${numericWidth/1.618}px` //1.618

    // Color
    const now = new Date();
    const body = document.querySelector('body')

    const daytime = Number(now.getHours()) + Number(now.getMinutes())/60
    const text = document.querySelector("div#time_msg")
    const img = document.querySelector("div.image-container")
    // pexels - Free and Open Image Database
    if (daytime >= 7 && daytime < 11) {
        text.innerHTML = "It's morning"
        body.style.background = "rgb(255, 253, 116)";
        img.innerHTML = '<img src="img/morning.jpg" alt="morning">'
    } else if (daytime >= 11 && daytime < 13.5) {
        text.innerHTML = "It's lunch time"
        body.style.background = "rgb(255, 238, 0)";
        img.innerHTML = '<img src="img/lunch.jpg" alt="lunch">'
    } else if (daytime >= 13.5 && daytime < 17) {
        text.innerHTML = "It's afternoon"
        body.style.background = "rgb(255, 162, 0)";
        img.innerHTML = '<img src="https://www.civitatis.com/f/kenia/nairobi/free-tour-nairobi-r32.jpg" alt="afternoon">'

    } else if (daytime >= 17 && daytime < 19) {
        text.innerHTML = "It's sunset time"
        body.style.background = "rgb(255, 34, 0)";
        img.innerHTML = '<img src="img/sunset.jpg" alt="Nairobi Free Tour">'
    } else {
        text.innerHTML = "It's night"
        body.style.background = "rgb(22, 0, 31)";
        img.innerHTML = '<img src="img/night.jpg" alt="night">'
    }
}
