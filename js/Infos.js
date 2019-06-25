class Infos {
  constructor() {
    this.nom = document.querySelector('#lastName')
    this.nom_m = document.querySelector('#lastName_m')
    this.prenom = document.querySelector('#firstName')
    this.prenom_m = document.querySelector('#firstName_m')
    this.dataStations = document.querySelector('#dataStations')
    this.btnReserver = document.querySelector('#btn-Reserver')
    this.formReservation = document.querySelector('.formReservation')
    this.btnReservation = document.querySelector('.btnReservation')
    this.formCanvas = document.querySelector('.formCanvas')
    this.btnValider = document.querySelector('.btnValider')
    this.btnReset = document.querySelector('.btnReset')
    this.information = document.querySelector('#information')
    this.email = document.querySelector('#email')
    this.validInput = document.querySelector('#validInput')
    this.dataClientLastName = document.querySelector('#dataClientLastName')
    this.dataClientFirstName = document.querySelector('#dataClientFirstName')
    this.nameStationDataReservation = document.querySelector('#nameStationDataReservation')
    this.addressSattionDataReservation = document.querySelector('#addressSattionDataReservation')
    this.dataCanvasDom = document.querySelector('#dataCanvasDom')
    this.messageError = document.querySelector('#messageError')
    this.clickBtnReserver()
    this.clickBtnReservation()
    this.clickBtnValider()
  }

  clickBtnReserver() {
    this.btnReserver.addEventListener('click', (e) => {
      this.nom.value = localStorage.getItem('nom')
      this.prenom.value = localStorage.getItem('prenom')
      if (this.formReservation.style.display = 'none') {
        this.formReservation.style.display = 'flex'
        this.dataStations.style.display = 'none'

      }
    })
  }

  clickBtnReservation() {
    this.btnReservation.addEventListener('click', (e) => {
      this.prenom.value = this.prenom.value.trim()
      this.nom.value = this.nom.value.trim()

      //Validation des champs avec JS
      if(this.prenom.validity.valueMissing){
          e.preventDefault();
          this.prenom_m.innerHTML = "Prénom manquant"
          this.prenom_m.style.color = "red"
          this.prenom.style.color = "red"

      }else{
          this.prenom_m.innerHTML = ""
          this.prenom_m.style.color = "green"
          this.prenom.style.color = "green"
          localStorage.setItem('prenom', this.prenom.value)
      }


      if(this.nom.validity.valueMissing){
        e.preventDefault()
       this.nom_m.innerHTML = "Nom manquant"
       this.nom_m.style.color = "red"
       this.nom.style.color = "red"

    }else{
      this.nom_m.innerHTML = ""
        this.nom_m.style.color = "green"
        this.nom.style.color = "green"
        localStorage.setItem('nom', this.nom.value)
        localStorage.name = this.nom.value

        if (this.nom.checkValidity() == true, this.prenom.checkValidity() == true) {
          this.formCanvas.style.display = 'block'
          this.formReservation.style.display = 'none'
          this.dataStations.style.display = 'none'
          this.prenom_m.style.display = 'none'
          this.nom_m.style.display = 'none'
          e.preventDefault()
        }

    }
      
    })
  }

  clickBtnValider() {
    this.btnValider.addEventListener('click', (e) => {
      e.preventDefault()
      if (this.countStorage <= 10) {
        this.information.style.display = 'block'
        this.formCanvas.style.display = 'none'
      }
        this.dataClientLastName.innerHTML = localStorage.getItem('nom')
        this.dataClientFirstName.innerHTML = localStorage.getItem('prenom')
        this.nameStationDataReservation.innerHTML = sessionStorage.getItem('Nom de la Station')
        this.addressSattionDataReservation.innerHTML = sessionStorage.getItem('Adresse de la Station')
        this.dataCanvasDom.src = sessionStorage.getItem('dataCanvas')
    })
  }
}
const infos = new Infos()