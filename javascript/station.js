var nom = document.getElementById("nom");
var nom_m = document.getElementById("nomManquant");
var prenom = document.getElementById("prenom");
var prenom_m = document.getElementById("prenomManquant");
var canvas = document.getElementById("canvas");
var text = document.getElementById("textTemps");
var fermeture = document.getElementById("Annuler");
fermeture.addEventListener('click', fermer);
var envoie = document.getElementById('envoie');
envoie.addEventListener('click', validationFx)


function fermer(){
        
    //bouton fermeture
    fermeture.style.display = "none";

    //Enlever text 
    text.textContent = "";

    }


function validationFx(e){

    //Validation des champs avec JS
    if(prenom.validity.valueMissing){
        e.preventDefault();
        prenom_m.textContent = "Prénom manquant";
        prenom_m.style.color = "red";
        prenom.style.color = "red";
    }else{
        prenom_m.style.color = "green";
        prenom.style.color = "green";
    }
    
    if(nom.validity.valueMissing){
        e.preventDefault();
        nom_m.textContent = "Nom manquant";
        nom_m.style.color = "red";
        nom.style.color = "red";
    }else{
        nom_m.style.color = "green";
        nom.style.color = "green";
    }

    if(!nom.validity.valueMissing && !prenom.validity.valueMissing )
    {
    //Stockage du nom et prénom dans la méthode localStorage 
    //-> pour reprendre le nom et prénom une fois le navigateur fermé et réouvert
    localStorage.name = nom.value;
    localStorage.last_name = prenom.value;

    clearCanvas();

        if(window.open){
            var temp = new Compteur();
            // Vérification de l'existence d'une réservation
            temp.verificationSessionStorage();
            
            
            // Événements lors de la validation du Canvas
            envoie.addEventListener("click", function() {
                
                // Aucune réservation n'existe
                // Lance la méthode de lancement de la réservation
                if(!sessionStorage.getItem("minutes")) {
                //Marque du text
                text.textContent = "Vélo réservé au nom de: " + localStorage.name + " " + localStorage.last_name + temp.reservation();            
                }
            });

            // Evénement lors du clique sur le bouton d'annulation d'une réservation
            fermeture.addEventListener("click", function() {
                // Lance la méthode d'annulation
                temp.annulerReservation();
                temp.clearTimeout(() => this.compteARebourTerminer);
            });


            //Enlever velo avec json_obj ->  mentor aide ? 

            //bouton fermeture
            fermeture.style.display = "block";

            }
    }
}

