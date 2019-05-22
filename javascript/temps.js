var temps =  document.getElementById("countdown");
var envoie = document.getElementById('envoie');



//Objet Compteur 
var Compteur = function() {
    this.minutes = 20;
    this.secondes = 00;
    this.minutesElt = null;
    this.secondesElt = null;
    this.compteARebour = null;
    this.compteARebourTerminer = null;

    //Methode de lancement storage réservation

    this.reservation = function(){
        sessionStorage.setItem("minutes", this.minutes);
        sessionStorage.setItem("secondes", this.secondes);
        this.compteARebour = setInterval(this.initCompteur.bind(this),1000);
    };

    //Methode de réinitialisation du compte à rebours

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
        temps.innerHTML = this.minutes + " : " + this.secondes;

        //Fonction compte à rebourgs
        this.CompteurStart();

    };

    this.CompteurStart = function(){
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

            //Appel d'une méthode locationTerminer
            this.compteARebourTerminer = setTimeout(() => this.locationTerminer(), 1000);
        }

    };

    this.locationTerminer = function(){
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
    //Méthode annulation de la réservation en cours
    this.annulerReservation = function(){
        this.locationTerminer();
    };

    //Vérification du storage
    this.verificationSessionStorage = function() {
        if (sessionStorage.getItem("minutes")) { // Si une réservation est en cours
            // Relance le compte à rebours
            this.compteARebour = setInterval(() => this.initCompteur(), 1000);
        }
    };
}

