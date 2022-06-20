//----------------------------------Definition Constante et referance des image
const longueurCanvas = 1000;
const hauteurCanvas = 500;

const frameParSecond = 240;
const vitesseInitial = 150; // px/s
const vitesseMax = 650;
const acceleration =  0.1;

const nbAnimationRun = 8;
const nbAnimationJump = 13;

const canvasJeuxChien = document.getElementById("JeuxChienCanvas");
canvasJeuxChien.style.width = longueurCanvas+"px";
canvasJeuxChien.style.height = hauteurCanvas+"px";
canvasJeuxChien.width = longueurCanvas;
canvasJeuxChien.height = hauteurCanvas;
const context = canvasJeuxChien.getContext("2d");

const skinBlocTerre = document.getElementById("imageBlocTerre");
const skinCorgiRun1 = document.getElementById("corgiRun1");
const skinCorgiRun2 = document.getElementById("corgiRun2");
const skinCorgiRun3 = document.getElementById("corgiRun3");
const skinCorgiRun4 = document.getElementById("corgiRun4");
const skinCorgiRun5 = document.getElementById("corgiRun5");
const skinCorgiRun6 = document.getElementById("corgiRun6");
const skinCorgiRun7 = document.getElementById("corgiRun7");
const skinCorgiRun8 = document.getElementById("corgiRun8");

const skinCorgiJump1 = document.getElementById("corgiJump1");
const skinCorgiJump2 = document.getElementById("corgiJump2");
const skinCorgiJump3 = document.getElementById("corgiJump3");
const skinCorgiJump4 = document.getElementById("corgiJump4");
const skinCorgiJump5 = document.getElementById("corgiJump5");
const skinCorgiJump6 = document.getElementById("corgiJump6");
const skinCorgiJump7 = document.getElementById("corgiJump7");
const skinCorgiJump8 = document.getElementById("corgiJump8");
const skinCorgiJump9 = document.getElementById("corgiJump9");
const skinCorgiJump10 = document.getElementById("corgiJump10");
const skinCorgiJump11 = document.getElementById("corgiJump11");
const skinCorgiJump12 = document.getElementById("corgiJump12");
const skinCorgiJump13 = document.getElementById("corgiJump13");

const skinPierre = document.getElementById("pierre");


//---------------------------------------------------Definition des class--------------------
class Sol{
    positionFirstBlocX = 0;
    constructor() {
    }

    drawSol(){
        let x = this.positionFirstBlocX;
        while (x < (longueurCanvas+48)){
            context.drawImage(skinBlocTerre, x, hauteurCanvas-48, 48, 48);
            x = x +48;
        }
    }

    moveSolLeft(distanceX){
        this.positionFirstBlocX = distanceX % 48;
    }
}

var numberAnimationCorgi;
var typeAnimationCorki;
var nextAnimationVar;
var speed = 100;
var corgiInterval;
numberAnimationCorgi = 1;
typeAnimationCorki = "run";
nextAnimationVar = "run";

    function skipAnimation(){
        numberAnimationCorgi++;
        if ((numberAnimationCorgi == nbAnimationRun+1 && typeAnimationCorki == "run") || (numberAnimationCorgi == nbAnimationJump+1 && typeAnimationCorki == "jump")){
            numberAnimationCorgi = 1;
            if (typeAnimationCorki == "jump"){
                typeAnimationCorki = "run";
                nextAnimationVar = "run";
            }
        }
        if (nextAnimationVar == "jump" && typeAnimationCorki != "jump"){
            numberAnimationCorgi = 1;
            typeAnimationCorki = nextAnimationVar;
            nextAnimationVar = "run";
        }
        corgiInterval = window.setTimeout(skipAnimation, speed);
    }
    skipAnimation();

    function getAnimation(){
        switch (typeAnimationCorki) {
            case "run":
                switch (numberAnimationCorgi) {
                    case 1:
                        return skinCorgiRun1;
                        break;
                    case 2:
                        return skinCorgiRun2;
                        break;
                    case 3:
                        return skinCorgiRun3;
                        break;
                    case 4:
                        return skinCorgiRun4;
                        break;
                    case 5:
                        return skinCorgiRun5;
                        break;
                    case 6:
                        return skinCorgiRun6;
                        break;
                    case 7:
                        return skinCorgiRun7;
                        break;
                    case 8:
                        return skinCorgiRun8;
                        break;
                }
                break;
            case "jump":
                switch (numberAnimationCorgi) {
                    case 1:
                        return skinCorgiJump1;
                        break;
                    case 2:
                        return skinCorgiJump2;
                        break;
                    case 3:
                        return skinCorgiJump3;
                        break;
                    case 4:
                        return skinCorgiJump4;
                        break;
                    case 5:
                        return skinCorgiJump5;
                        break;
                    case 6:
                        return skinCorgiJump6;
                        break;
                    case 7:
                        return skinCorgiJump7;
                        break;
                    case 8:
                        return skinCorgiJump8;
                        break;
                    case 9:
                        return skinCorgiJump9;
                        break;
                    case 10:
                        return skinCorgiJump10;
                        break;
                    case 11:
                        return skinCorgiJump11;
                        break;
                    case 12:
                        return skinCorgiJump12;
                        break;
                    case 13:
                        return skinCorgiJump13;
                        break;
                }
                break;
        }
    }

class Pierre{
    positionX;
    oldDistanceX;
    constructor() {
        this.positionX = -49;
        this.oldDistanceX = 0;
    }

    drawPierre(){
        context.drawImage(skinPierre, this.positionX, 500 - skinBlocTerre.naturalHeight - skinPierre.naturalHeight);
    }

    moveSolLeft(distanceX){
        if (this.positionX < -48){
            this.positionX = 1000 + (Math.random() * 1000)
        }
        this.positionX = this.positionX - (distanceX - this.oldDistanceX);
        this.oldDistanceX = distanceX;
    }
}
//----------------------Declaration des objet global--------------------------------------
var sol = new Sol();
var pierre = new Pierre();

//---------------Démarage du jeux si le navigateur prend en compte les canvas--------------------

var run = false;
if (context){
    var tempsSurvie = 0;
    var distance = 0;
    var frameInterval;
    var gameTickInterval;

    function drawCorgi(){
        let animCorgi = getAnimation();
        context.drawImage(animCorgi, 20, 500 - skinBlocTerre.naturalHeight - animCorgi.naturalHeight);
    }

    function drawInterface(){
        context.font = '36 serif';
        context.fillText(("Temps : "+Math.round((tempsSurvie/1000)*10)/10)+"s", 15, 20);
    }

    function drawFrame(){
        sol.drawSol();
        drawCorgi();
        pierre.drawPierre();
        drawInterface();
    }

    function frame(){
        context.clearRect(0, 0, longueurCanvas, hauteurCanvas);
        drawFrame();
    }

    function init(){
        tempsSurvie = 0;
        distance = 0;
        pierre = new Pierre();
        speed = 100;
    }

    function runGame(){
        run = true;
        frameInterval =setInterval(function (){
            frame()
            checkColision();
        },1000/frameParSecond);

        let vitesse = vitesseInitial;
        let timeStart = Date.now();
        let timeOld = Date.now();
        let timeNew = Date.now();
        let tempsEcouler = timeNew - timeOld;
        gameTickInterval = setInterval(function(){
            tempsSurvie = Date.now() - timeStart;
            timeNew = Date.now();
            tempsEcouler = timeNew - timeOld;
            timeOld = timeNew;
            distance = distance + ((tempsEcouler/1000)*vitesse);
            sol.moveSolLeft(-distance);
            pierre.moveSolLeft(distance);
            if (vitesse < vitesseMax){vitesse = (vitesseInitial + distance * acceleration);speed = (150 - (((vitesse)/(vitesseMax))*90));}//speed = (150 - (((vitesse)/(vitesseMax))*90));
            else{vitesse = vitesseMax;}
        }, 25);
    }

    function checkColision(){
        if((pierre.positionX < 20+152) && (pierre.positionX > 20-47)){
            let diferantielDePosition = pierre.positionX-20;
            switch (typeAnimationCorki){
                case "run":
                    switch (numberAnimationCorgi){
                        case 1:
                            if (diferantielDePosition < 145){
                                stopLoose();
                            }
                            break;
                        case 2:
                            if (diferantielDePosition < 132){
                                stopLoose();
                            }
                            break;
                        case 3:
                            if (diferantielDePosition > -31 && diferantielDePosition < 128){
                                stopLoose();
                            }
                            break;
                        case 4:
                            if (diferantielDePosition > -26 && diferantielDePosition < 120){
                                stopLoose();
                            }
                            break;
                        case 5:
                            if (diferantielDePosition > -15 && diferantielDePosition < 125){
                                stopLoose();
                            }
                            break;
                        case 6:
                            if (diferantielDePosition > -18 && diferantielDePosition < 132){
                                stopLoose();
                            }
                            break;
                        case 7:
                            if (diferantielDePosition > -21 && diferantielDePosition < 137){
                                stopLoose();
                            }
                            break;
                        case 8:
                            if (diferantielDePosition > -37 && diferantielDePosition < 145){
                                stopLoose();
                            }
                            break;
                    }
                    break;
                case "jump":
                    switch (numberAnimationCorgi){
                        case 1:
                            if (diferantielDePosition > -31 && diferantielDePosition < 136){
                                stopLoose();
                            }
                            break;
                        case 2:
                            if (diferantielDePosition > -31 && diferantielDePosition < 130){
                                stopLoose();
                            }
                            break;
                        case 3:
                            if (diferantielDePosition > -31 && diferantielDePosition < 101){
                                stopLoose();
                            }
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                        case 6:
                            break;
                        case 7:
                            break;
                        case 8:
                            break;
                        case 9:
                            break;
                        case 10:
                            break;
                        case 11:
                            if (diferantielDePosition > -23){
                                stopLoose();
                            }
                            break;
                        case 12:
                            if (diferantielDePosition > -42 && diferantielDePosition < 143){
                                stopLoose();
                            }
                            break;
                        case 13:
                            if (diferantielDePosition > -42 && diferantielDePosition < 150){
                                stopLoose();
                            }
                            break;
                    }
                    break;
            }
        }
    }

    function stopLoose(){
        clearInterval(frameInterval);
        clearInterval(gameTickInterval);
        run = false;
    }

    runGame();
}

//-------------------Debut des listener---------------------------------------------------------
window.addEventListener("keydown", function (event) {
    if(event.code == "KeyW"){
        nextAnimationVar = "jump"
    }
    else if(event.code == "Enter" && run == false){
        init();
        runGame();
    }
});