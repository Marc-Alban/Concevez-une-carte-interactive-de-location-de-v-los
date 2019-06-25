class Map {
	constructor() {
		this.map = L.map('mapid').setView([49.4404591, 1.0939658], 13)
		this.url = 'https://api.jcdecaux.com/vls/v1/stations?contract=rouen&apiKey=59b13c3a163f23a9565bbe85ecf928ed623a0747'
		this.statutStation = document.querySelector('#statutStation')
		this.dataStations = document.querySelector('#dataStations')
		this.btnReserver = document.querySelector('#btn-Reserver')
		this.formReservation = document.querySelector('.formReservation')
		this.formCanvas = document.querySelector('.formCanvas')
		this.information = document.querySelector('#information')
		this.divData = document.querySelector('#data')
		this.LeafIcon = L.Icon.extend({
			options: {
				iconSize: [25, 41],
				shadowSize: [41, 41],
				iconAnchor: [13, 41],
				shadowAnchor: [0, 41],
				popupAnchor: [0, -40]
			}
		})
		this.greenIcon = new this.LeafIcon({
			iconUrl: 'assets/assetsMarkers/marker-icon.png'
		})
		this.redIcon = new this.LeafIcon({
			iconUrl: 'assets/assetsMarkers/marker-icon2.png'
		})
		this.createMap()
		this.getStationData()
	}

	createMap() {

		//cration du calque image 
		L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
			maxZoom: 17
		}).addTo(this.map)
	}

	// recuperation des donnée de l'api
	getStationData() {
		const getStationDataJson = async () => {
			this.response = await fetch(this.url)
			this.stationTab = await this.response.json()

			this.stationTab.forEach(station => {
				console.log(station)
				this.nameStation = station.name
				this.positionStation = station.position
				this.adresseStation = station.address

				sessionStorage.setItem('Adresse de la Station', this.adresseStation)
				sessionStorage.setItem('Nom de la Station', this.nameStation)

				if (station.available_bikes > 0) {
					this.marker = new L.marker(this.positionStation, {
						icon: this.greenIcon
					}).addTo(this.map)

					this.marker.addEventListener('click', () => {
						document.getElementById('nameStation').innerHTML = "<span class='nameStationClass'>Nom de la station:</span> <br> " + station.name 
						document.getElementById('address').innerHTML = "<span class='addressStationClass'>Adresse:</span> <br> " + station.address
						document.getElementById('nbVeloStation').innerHTML = "Nombre de place" + (station.bike_stands > 1  ? "s :" : " :") + "<span class='red'>" + station.bike_stands + "</span>"
						document.getElementById('nbVelo').innerHTML = "Nombre de vélo disponible" + (station.available_bikes > 1  ? "s :" : " :") + "<span class='red'>" + station.available_bikes + "</span>"
						this.statutStation.innerHTML = "<span class='stationClass'>Station:</span><span class='red'>Ouvert</span>"


						if (this.formReservation.style.display = 'block', this.formCanvas.style.display = 'block', this.information.style.display = 'block', this.btnReserver.style.display = 'none') {
							this.btnReserver.style.display = 'block'
							this.dataStations.style.display = 'block'
							this.formReservation.style.display = 'none'
							this.formCanvas.style.display = 'none'
							this.information.style.display = 'none'
						}
					})

				} else {
					this.marker = new L.marker(this.positionStation, {
						icon: this.redIcon
					}).addTo(this.map)

					this.marker.addEventListener('click', () => {
						document.getElementById('nameStation').innerHTML = station.name
						document.getElementById('address').innerHTML = station.address
						document.getElementById('nbVeloStation').innerHTML = station.bike_stands
						// document.getElementById('nbVeloDisponible').innerHTML = station.available_bikes
						this.statutStation.innerHTML = "<span class='stationClass'>Station:</span><span class='red'>Fermé</span>"

						if (this.formReservation.style.display = 'block', this.formCanvas.style.display = 'block', this.information.style.display = 'block', this.btnReserver.style.display = 'none') {
							this.btnReserver.style.display = 'none'
							this.dataStations.style.display = 'block'
							this.formReservation.style.display = 'none'
							this.formCanvas.style.display = 'none'
							this.information.style.display = 'none'
						}
					})
				}
			})
		}
		getStationDataJson()
	}
}
const map = new Map()