//Vérification du formulaire et incrustation dans la page

var nom = document.getElementById("nom");
var nom_m = document.getElementById("nomManquant");
var prenom = document.getElementById("prenom");
var prenom_m = document.getElementById("prenomManquant");
var canvas = document.getElementById("canvas");
var text = document.getElementById("textTemps");
var conteur = document.getElementById("countdown");

var fermeture = document.getElementById("Annuler");
fermeture.addEventListener('click', fermer());

var validation = document.getElementById("btnEnvoi");
validation.addEventListener('click', validationFx)






function fermer(){
        
    //bouton fermeture
    fermeture.style.display = "none";

    //Enlever text 
    text.textContent = "";

    //Alert(message)
    // alert("Vous avez annuler votre réservation")

    //Supression de canvas dans la stroage --> Voir mentor

        
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
            //Marque du text
            text.textContent = "Vélo réservé au nom de: " + localStorage.name + " " + localStorage.last_name;
            //Enlever velo avec json_obj ->  mentor aide ? 

            //affichage d'un compteur de 20min 
            temp.reservation();

            //bouton fermeture
            fermeture.style.display = "block";

            }else if (window.close || conteur <= 0){
                        function reset(){

                        }
                }
    }
}

//Affichage si page web  ouverte dans le navigateur
if(window.open){
    if(nom.validity.valueMissing && prenom.validity.valueMissing){
        nom.value = localStorage.name;
        prenom.value = localStorage.last_name;
    }
}