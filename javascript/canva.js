//-------------------Canvas -> Signature---------------------//
//Récupération de la balise HTML 
var canvas = document.getElementById("canvas");
//Définition du context (dessin en 2d ou 3d)
var ctx = canvas.getContext("2d");
//Variable trait: si true alors appliquer action pour déssiner un trait au paramètres donénes
var trait = false;


//Fonction dessin permet de dessiner un trait pa rapport à la position x et y de la sourie
function draw(x,y){
    if(trait){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
}



['mouseout', 'mouseup','touchend','touchleave'].forEach( evt => //Lorsque le clic quitte:  crée un trait
    canvas.addEventListener(evt, function(){
        trait = false;
    }) );



//Avoiding scroll when using a touchpad $(this.canvas).on("scroll touchmove mousewheel ", function(e){ e.preventDefault(); e.stopPropagation(); return false; })
['mousedown','touchstart'].forEach( evt => //Lorsque le clic est en bas:  crée un trait
    canvas.addEventListener(evt, function(){
        trait = true;
        ctx.beginPath();
    }) );




['mousemove','touchmove'].forEach( evt => //Lorsque le clic est en bas:  crée un trait
        canvas.addEventListener(evt, function(e){
        
        //décalage sur l'axe Y et X du pointeur de la souris --> provient de l'interface MouseEvent 
        draw(e.offsetX, e.offsetY);
        e.preventDefault();
        }) );
    
