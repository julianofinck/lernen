
function verify () {
    const date = new Date()
    const thisYear = date.getFullYear()
    const txtYear = document.getElementById('txtyear')
    console.log(txtyear.value)
    // 
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
            if (age >= 0 && age < 10) {
                // baby boy
                img.setAttribute('src', 'img/baby_boy.png')
            } else if (age < 21) {
                // boy
                img.setAttribute('src', 'img/boy.png')
            } else if (age < 50) {
                // man
                img.setAttribute('src', 'img/man.png')
            } else {
                // old man
                img.setAttribute('src', 'img/old_man.png')
            }
        } else if (sexRad[1].checked) {
            sexLabel = 'female'
            if (age >= 0 && age < 10) {
                // baby girl
                img.setAttribute('src', 'img/baby_girl.png')
            } else if (age < 21) {
                // girl
                img.setAttribute('src', 'img/girl.png')
            } else if (age < 50) {
                // woman
                img.setAttribute('src', 'img/woman.png')
            } else {
                // old woman
                img.setAttribute('src', 'img/old_woman.png')
            }
        }
        res.innerHTML = `This person is ${age.toString()} and ${sexLabel}.`
        res.style.textAlign = 'center'

        img.style.marginTop = '3vw'
        res.appendChild(img)
    }
}

const verifyBtn = document.getElementById('verify-btn')
verifyBtn.addEventListener('click', verify)


