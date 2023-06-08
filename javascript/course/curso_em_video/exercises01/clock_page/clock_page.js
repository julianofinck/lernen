function updateClock() {
    const actualTime = document.querySelector("input#wrong_clock").value;
    const clockText = document.querySelector("h2#clock_text");    
    if (actualTime == '') {
        const now = new Date();
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
        clockText.innerHTML = `${hour}:${min}:${sec}`;
    } else {
        clockText.innerHTML = `${actualTime.toString()}:00`
    }
    
}

function updateTimeStyle () {
    function imgsrc(a_string) {
        return `<img src="img/${a_string}.png" alt="${a_string}">`
    }

    function setStyle(period_of_the_day) {
        const body = document.querySelector('body')

        if (body.className != period_of_the_day) {
            // pexels - Free and Open Image Database
            const msgs = {
                'morning': "It's morning", 
                'lunch': "It's lunch time",
                'afternoon': "It's afternoon",
                'sunset': "It's sunset",
                'night': "It's night",
            }
            const text = document.querySelector("div#time_msg")
            const img = document.querySelector("div.large")

            body.classList = []
            body.classList.add(period_of_the_day);
            text.innerHTML = msgs[period_of_the_day]
            img.innerHTML = imgsrc(period_of_the_day)
        }
    }

    const clockText = document.querySelector("h2#clock_text").innerText; 
    const timeParts = clockText.split(':');

    const h = parseInt(timeParts[0]);
    const m = parseInt(timeParts[1]);
    const s = parseInt(timeParts[2]);
    const daytime = h + m/60 + s/3600;
    
    if (daytime >= 7 && daytime < 11) {
        setStyle('morning')
    } else if (daytime >= 11 && daytime < 13.5) {
        setStyle('lunch')
    } else if (daytime >= 13.5 && daytime < 17) {
        setStyle('afternoon')
    } else if (daytime >= 17 && daytime < 19) {
        setStyle('sunset')
    } else {
        setStyle('night')
    }

}

function load() {
    updateClock();
    updateTimeStyle();
    // listen_new_time(); listen to new time, if it is changed, get it and substitute to the update clock
}

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden")

    loader.addEventListener("transitionend", () => {
        document.body.removeChild("loader");
    })
})

setInterval(load, 1000);
