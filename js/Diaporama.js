class Diaporama {
    // Constructor
    constructor(imgSliderElt)
    {
        this.imgSlider = imgSliderElt
        this.elementPrev = document.querySelector('#prev')
        this.elementNext = document.querySelector('#next')
        this.play = document.querySelector('.play')
        this.stop = document.querySelector('.stop')
        this.imagesTab = ['assets/01.jpg', 'assets/02.png', 'assets/03.png', 'assets/04.png', 'assets/05.png', 'assets/06.png', 'assets/07.jpg' ]
        this.textTab = 
        [
            'Bienvenue sur le site de réservation de velo de Rouen: <br> Ce diaporama vous montre la façon d\'utiliser la carte',
            'Choissisez une station: <br> Sélectionner une station en cliquant sur un markeur pour afficher ses informations et commencer votre réservation. ',
            'Bouton réserver: <br> Une fois le markeur cliqué, cliquez sur le bouton réserver. ',
            'Formulaire: <br> Remplissez le formulaire. ',
            'Confirmation et réservation de votre vélo: <br> Après avoir signé, confirmez votre réservation en cliquant sur "Valider".',
            'Réservation réalisée: <br> Votre vélo est réservé pendant 20min mais vous pouvez annuler à tout moment en cliquant sur "Annuler".',
            'Rouen Cyclic vous souhaite une bonne journée'
        ]
        this.counter = 0
        this.interval = 0
        this.init()
    }

    // fonctionnalitées
    next()
    {
        this.counter++
        if (this.counter >= this.imagesTab.length) {
            this.counter = 0
        }
        this.imgSlider.src = this.imagesTab[this.counter]
        document.getElementById('textSlide').innerHTML = this.textTab[this.counter]
    }

    prev()
    {
        this.counter--
        if (this.counter < 0) {
            this.counter = this.imagesTab.length - 1
        }
        this.imgSlider.src = this.imagesTab[this.counter]
        document.getElementById('textSlide').innerHTML = this.textTab[this.counter]
    }

    demarrer()
    {
        clearInterval(this.interval)
        this.interval = setInterval(() => {this.next()}, 5000)
    }

    arreter()
    {
        clearInterval(this.interval)
    }

    init()
    {
        this.elementNext.addEventListener('click', () => this.next())
        this.elementPrev.addEventListener('click', () => this.prev())
        document.addEventListener('keydown', event => {
            if (event.key === 'ArrowRight') this.next()
            if (event.key === 'ArrowLeft') this.prev()
        })
        this.play.addEventListener('click', () => this.demarrer())
        this.stop.addEventListener('click', () => this.arreter())
        this.interval = setInterval(() => {this.next()}, 5000)  
    }
}
// Instance
const imageSliderElt = document.querySelector('.imgSlider')
const diapo1 = new Diaporama(imageSliderElt)