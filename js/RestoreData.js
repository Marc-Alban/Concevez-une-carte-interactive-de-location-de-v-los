class RestoreData
{
    constructor()
    {
        this.infos = document.querySelector("#information")    
        this.lastName = document.querySelector("#dataClientLastName")   
        this.firstName = document.querySelector("#dataClientFirstName")   
        this.nameStationDataReservation = document.querySelector('#nameStationDataReservation')   
        this.addressSattionDataReservation = document.querySelector('#addressSattionDataReservation')
        this.dataCanvasDom = document.querySelector('#dataCanvasDom')
        this.time = document.querySelector('#time')
        this.dataStations = document.querySelector('#dataStations')
        this.btnStop = document.querySelector('#btnAnnuler')
        this.data = document.querySelector('#data')
        this.check(window.sessionStorage)
    }

    check(sessionStorage)
    {  
            if(isNaN(sessionStorage.minutes) && isNaN(sessionStorage.secondes))
            {
                console.log('pas de minute et de seconde')
            }
            else
            {
                if(sessionStorage.length > 0  )
                {
                console.log(sessionStorage)
                this.infos.style.display = "block"
                this.lastName.innerHTML = localStorage.getItem('nom')
                this.firstName.innerHTML = localStorage.getItem('prenom')
                this.addressSattionDataReservation.innerHTML = sessionStorage.getItem('Adresse de la Station') 
                this.nameStationDataReservation.innerHTML = sessionStorage.getItem('Nom de la Station')
                this.dataCanvasDom.src = sessionStorage.getItem('dataCanvas')
                this.dataStations.style.display = 'none'
                let min = parseInt(sessionStorage.minutes * 60 )
                let sec = parseInt(sessionStorage.secondes)
                let endReservation = min + sec
                this.time.innerHTML = new Timer(endReservation, time)
               
                    this.btnStop.addEventListener('click', (e) => {
                        this.infos.style.display = 'none'
                        sessionStorage.clear()
                    })
                }
                else
                {
                    console.log('sessionStorage est vide')
                    this.infos.style.display = "none"
                }
        }
    }

}

$restor = new RestoreData()