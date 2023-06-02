/* Mehrere Bedingungen */
var now = new Date()
var day = now.getDay() // 0 - Domingo, 1 - Segunda, ...
var hour = now.getHours()
var min = now.getMinutes()

/*
switch-case kommt aus C und muss deswegen immer ein break haben.
Fügt man kein break ein, wird jede folgende Zeile ausgeführt stattdessen, das Block zu verlassen
*/
if (hour > 9 && hour < 18) {
    console.log(`${hour}:${min}... \nEs ist Arbeitszeit`)
    switch(day) {
        case 1:
            console.log('... und Montag.')
            break
        case 2:
            console.log('... und Dienstag.')
            break
        case 3:
            console.log('... und Mittwoch.')
            break
        case 4:
            console.log('... und Donnerstag.')
            break
        case 5:
            console.log('... und Freitag.')
            break
        default:
            console.log('Aber heute arbeitet kein Schwein.')
            break
    }
}
