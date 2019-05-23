//Déclaration des variables
//Formulaire - pour Vérification champs
var nom = document.getElementById("nom");
var nom_m = document.getElementById("nomManquant");
var prenom = document.getElementById("prenom");
var prenom_m = document.getElementById("prenomManquant");

//Selection fomulaire
var form = document.getElementById('formulaire');

//Selection du boutton envoyer
var btnElt = document.getElementById('btnEnvoi');

//Fonction sur le boutton envoie
btnElt.addEventListener('click', affichageElements);

//Sélection de l'id Temps 
var tempsElt = document.getElementById("temps");
//Sélection de l'id textTemps 
var textDuCompteur = document.getElementById("textTemps");
//Sélection de l'id countdown 
var compteurId =  document.getElementById("countdown");
//Sélection  du boutton annuler
var btnAnnulation = document.getElementById("Annuler");
//Définition d'une fonction lors du click sur le boutton
btnAnnulation.addEventListener('click', fermer);
//Sélection  du boutton envoyer
var btnEnvoie = document.getElementById('envoie');
//Définition d'une fonction lors du click sur le boutton
btnEnvoie.addEventListener('click', donneesEnvoyer)


//------------------Objet Compteur -----------------------//
var Compteur = function() {
    this.minutes = 20;
    this.secondes = 00;
    this.minutesElt = null;
    this.secondesElt = null;
    this.compteARebour = null;
    this.compteARebourTerminer = null;


    //Vérification du storage
    this.verificationSessionStorage = function() {
        if (sessionStorage.getItem("minutes")) { // Si une réservation est en cours
            //Annulation de le compte à rebour
            this.compteARebourTerminer = this.annulerReservation();
        }
    
            // Sinon lancement de l'initiation du compteur 
            this.compteARebour = setInterval(this.initCompteur.bind(this),1000);

    };
       
    //Storage et  Méthode Réservation
    this.lancementCompteur = function(){

        //Si les minutes et les secondes sont supérieur à 0
        if( this.minutes >= 0 && this.secondes > 0){

            //On diminue les secondes
            this.secondes--;

            //On modifie la storage
            sessionStorage.setItem("secondes", this.secondes);

        // si les minutes sont supérieur à 0 et les secondes sont égales à 0 ou inférieur
        }else if(this.minutes > 0 && this.secondes <= 0){

            //Seconde à 59
            this.secondes = 59;

            //on diminue les minutes
            this.minutes--;

            //Modificatiuon des sessions storage
            sessionStorage.setItem("minutes", this.minutes);
            sessionStorage.setItem("secondes", this.secondes);



        // si les minutes et les secondes sont égales à 0 le Compteur est terminer    
        }else if( this.minutes == 0 && this.secondes == 0 || window.close){
            alert("Votre location à pris fin");

            //Appel d'une méthode annulation réservation
            this.compteARebourTerminer = setTimeout(() => this.annulerReservation(), 1000);
        }

    };

    //Methode de d'initialisation du compte à rebours
    this.initCompteur = function(){

        //Si minute en dessous de 10 alors on met un 0 sinon on laisse par défaults
        if(this.minutes < 10){
            this.minutesElt = "0" + this.minutes;
        }else{
            this.minutesElt = this.minutes;
        }

        //Si seconde en dessous de 10 alors on met un 0 sinon on laisse par défaults
        if(this.secondes < 10){
            this.secondesElt = "0" + this.secondes;
        }else{
            this.secondesElt = this.secondes;
        }

        //Insertion du Compteur dans le html
        compteurId.innerHTML = this.minutes + " : " + this.secondes;

        //Fonction compte à rebours
        this.lancementCompteur();

    
    };

    this.annulerReservation = function(){
        //On arrete la fonction setInterval
        clearInterval(this.compteARebour);

        //On reset les minutes et secondes
        this.minutes = 20;
        this.secondes = 00;
        this.minutesElt = null;
        this.secondesElt = null;

        //Supression des sessionStorage
        sessionStorage.clear();

        //Arret de la méthode seTimeout
        clearTimeout(this.compteARebourTerminer);

    };
}


//------------Fin objet--------------//

//Déclaration de l'objet
var CompteurObj = new Compteur();


function fermer(){
    //bouton annuler disparait
    btnAnnulation.style.display = "none";
    //Enlever le text du compteur
    textDuCompteur.textContent = "";
    //Faire disparaitre le compteur
    compteurId.style.display = "none";
    // Lance la méthode d'annulation de l'objet Compteur
    CompteurObj.annulerReservation();
}

//Fontion lors du clique sur le boutton envoie
function donneesEnvoyer(e){

    //Validation des champs avec JS
    if(prenom.validity.valueMissing){
        e.preventDefault();
        prenom_m.textContent = "Prénom manquant";
        prenom_m.style.color = "red";
        prenom.style.color = "red";
    }else{
        prenom_m.style.color = "green";
        prenom.style.color = "green";
        localStorage.last_name = prenom.value;
    }
    
    if(nom.validity.valueMissing){
        e.preventDefault();
        nom_m.textContent = "Nom manquant";
        nom_m.style.color = "red";
        nom.style.color = "red";
    }else{
        nom_m.style.color = "green";
        nom.style.color = "green";
        localStorage.name = nom.value;

    }


    if(!nom.validity.valueMissing && !prenom.validity.valueMissing )
    {
    //Supprétion du déssin Canvas
    clearCanvas();

    // Vérification de l'existence d'une réservation et 
    // si il y en a une utiliser la méthode annulation
    CompteurObj.verificationSessionStorage();
    //Marque du text
    textDuCompteur.textContent = "Vélo réservé au nom de: " + localStorage.name + " " + localStorage.last_name;   //Relance la méthode init 
    //bouton fermeture
    compteurId.style.display = "block";
    //bouton fermeture
    btnAnnulation.style.display = "block";

        }
    }


//Fonction qui fait apparaitre lors des cliques des block.
function affichageElements(){        
    form.style.display = "block";
    if(form.style.display = "block"){
        btnEnvoie.addEventListener('click', function(e){
            if(!nom.validity.valueMissing && !prenom.validity.valueMissing )
            {
                e.preventDefault();
                tempsElt.style.display = "block";
            }
        })
    }
}