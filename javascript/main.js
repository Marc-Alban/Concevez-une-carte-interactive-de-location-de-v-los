    var form = document.getElementById('formulaire');
    var envoie = document.getElementById('envoie');
    var textTemps = document.getElementById('temps');
    var btn = document.getElementById('btnEnvoi');
    var validation = btn.addEventListener('click', displayFonction);

    function displayFonction(){        
        form.style.display = "block";
        if(form.style.display = "block"){
            envoie.addEventListener('click', function(e){
                e.preventDefault();
                textTemps.style.display = "block";
            })
        }
    }