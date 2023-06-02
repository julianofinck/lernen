let freund = {
    name: "Johann",
    geschlecht: 'M',
    gewicht: 85.4,
    zunehmen(p=0){
        console.log('Zugenommen!')
        this.peso += p
    }
}

freund.zunehmen(2)
console.log(`${freund.name} wiegt ${freund.gewicht}Kg`)