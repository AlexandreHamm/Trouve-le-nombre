// Elements du DOM (= éléments HTML du navigateur)
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// Modèle de coeurs
const coeurVide = '<i class="far fa-heart"></i>'
const coeurPlein = '<i class="fas fa-heart"></i>'

// Fonds
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)';
const bgLoose = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

// Fonction PLAY
const play = () => {

    //  nombre aléatoire
    const randomNumber = Math.floor(Math.random() * 101); // Math.Floor arrondi à l'entier en dessous // Math.random = chiffre random
    const totalVies = 5;
    let vies = totalVies;
    // console.log(randomNumber);

    // Actualisation à chaque essai - TOUTE LA LOGIQUE
    formulaire.addEventListener('submit', (e) =>{
        e.preventDefault();
        const valeurInput=parseInt(input.value); // parseInt = "3" -> 3 (transforme chaine de caractères (string) en Number)

        if(valeurInput < 0 || valeurInput > 100) return;

        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`; // `` (Alt Gr + 7) permet d'écrire des variables dans une chaine de texte
            rejouerBtn.style.display = "block";
            essayerBtn.setAttribute('disabled', '');
        }

        if(valeurInput !== randomNumber){
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3){
                body.style.backgroundImage = bgBrulant;
                message.textContent = 'C\est Brûlant !!! 🔥🔥🔥';
            }
            else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6){
                body.style.backgroundImage = bgChaud;
                message.textContent = 'C\est Chaud ! 🔥';
            }
            else if(randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11){
                body.style.backgroundImage = bgTiede;
                message.textContent = 'C\est Tiède 😐';
            }
            else{
                body.style.backgroundImage = bgFroid;
                message.textContent = 'C\est Froid ❄️';
            }
            vies--;
            verifyLoose();
        }

        actualiseCoeurs(vies);
    })

    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000'
            essayerBtn.setAttribute('disabled', '');
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
    }

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = '';
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
        }
        // tableau qui affichera le nombre de vies
        for(let i = 0; i < totalVies - vies; i++){
            tableauDeVies.push(coeurVide);
        }
        // tableau qui affichera le nombre de coeurs vides
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);

    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        document.location.reload(true); // permet de refresh la page
    })
}

play();