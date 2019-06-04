//Coordonnées de Rouen
var rouen = [49.4404591, 1.0939658];
//Création de la map Leaflet
var mymap = L.map('map').setView(rouen, 13);
//icon de base 
var myIcon = L.icon({
    iconUrl: 'img/ico/m1.png',
    iconSize: [55, 55]
});



//Création du calque image
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20
}).addTo(mymap);

//Lien l'API JCDECEAUX
var lien = "https://api.jcdecaux.com/vls/v1/stations?contract=rouen&apiKey=7d14b9144dbbb44e67122a96cb8386cfd39a3ebb";
//Récupération et envoie de l'API
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // Lecteur d'évènement sur le format JSON
    Httpreq.open("GET",yourUrl,false); //ouverture du lien
    Httpreq.send(null); // envoi du lien avec les données
    return Httpreq.responseText;   //Retour information en format text
 }

 
 //Génération d'un objet JSON
var json_obj = JSON.parse(Get(lien));
//Boucle pour afficher les markers sur la map 
json_obj.forEach(station => {


    var nom = station.name;
    var adress = station.address;
    var cooLat = station.position.lat;
    var cooLon = station.position.lng;
    var nbVelo = station.available_bikes;
    var status = station.status;
    var standPlace = station.bike_stands;


    //Condition si status ouverts alors affichée marker vert sinon rouge
    if(status === "OPEN"){
         myIcon = L.icon({
            iconUrl: 'img/ico/marqueur_ouvert.png',
            iconSize: [55, 55]
        });
        
    }else if(status === "CLOSE"){
        myIcon = L.icon({
            iconUrl: 'img/ico/marqueur_fermer.png',
            iconSize: [55, 55]
        });
    }




    //Affiche les markers sur la carte
    var marker = L.marker([cooLat, cooLon], {icon: myIcon}).addTo(mymap);


    marker.on('click', function(){
        document.getElementById('nom_station').textContent = "Station: " + nom;
        localStorage.setItem("nom", nom);
        document.getElementById('adresse_station').textContent = "Adresse: " + adress;
        localStorage.setItem("station", adress);
        if(stationReservee == nom){
            document.getElementById('disponible_velo').textContent = "Nombre de vélo: " + nbVelo-1 + " disponible" + (nbVelo > 1  ? "s" : "");
        }
        else {
            document.getElementById('disponible_velo').textContent = "Nombre de vélo: " + nbVelo + " disponible" + (nbVelo > 1  ? "s" : "");
        }
        document.getElementById('bike_stands').textContent = "Nombre de place" + (standPlace > 1  ? "s" : "") + " disponible" + (standPlace > 1  ? "s: " : ": ") + standPlace;
        document.getElementById('status').textContent = "Status:" + status;
        console.log(stationReservee);
        if(status === "OPEN" && nbVelo != 0){
            document.getElementById('btnEnvoi').style.display = 'block';
        }else if(status === "CLOSE"){
            document.getElementById('status').style.color = 'red';
        }

    })

});






