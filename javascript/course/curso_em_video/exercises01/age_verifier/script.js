
function verify () {
    const date = new Date()
    const thisYear = date.getFullYear()
    const txtYear = document.getElementById('txtyear')

    if (txtYear.value.length == 0 || txtYear.value > thisYear) {
        window.alert('Erro: fill a possible year') 
    } else {        
        const res = document.querySelector('div#res')
        const age = thisYear - Number(txtYear.value)
        const sexRad = document.getElementsByName("radsex")
        let img = document.createElement('img')
        let sexLabel = ''
        if (sexRad[0].checked) {
            sexLabel = 'male'
            if (age >= 0 && age < 3) {
                img.setAttribute('src', 'img/baby_boy.png')
            } else if (age < 10) {
                img.setAttribute('src', 'img/little_boy.png')
            } else if (age < 21) {
                img.setAttribute('src', 'img/juvenile_boy.png')
            } else if (age < 40) {
                img.setAttribute('src', 'img/able_man.png')
            } else if (age < 60) {
                img.setAttribute('src', 'img/50_man.png')
            } else {
                img.setAttribute('src', 'img/old_man.png')
            }
        } else if (sexRad[1].checked) {
            sexLabel = 'female'
            if (age >= 0 && age < 3) {
                img.setAttribute('src', 'img/baby_girl.png')
            } else if (age < 10) {
                img.setAttribute('src', 'img/little_girl.png')
            } else if (age < 21) {
                img.setAttribute('src', 'img/juvenile_girl.png')
            } else if (age < 40) {
                img.setAttribute('src', 'img/able_woman.png')
            } else if (age < 60) {
                img.setAttribute('src', 'img/50_woman.png')
            } else {
                img.setAttribute('src', 'img/old_woman.png')
            }
        }
        res.innerHTML = `<p>This person is ${age.toString()} and ${sexLabel}.</p>`
        res.style.textAlign = 'center'

        img.style.marginTop = '1%'
        img.style.height = "auto"
        img.style.width = "100%"
        res.appendChild(img)
    }
}

const verifyBtn = document.getElementById('verify-btn')
verifyBtn.addEventListener(type='mouseenter', listener=verify)


