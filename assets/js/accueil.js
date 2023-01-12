function nbAnecdotes() {
    sendRequest("https://catfact.ninja/facts").then((
        response) => {
        let anecdote = document.querySelector(".nbAnecdotes");
        reponse_anecdote = response;
        anecdote.textContent = reponse_anecdote.total;
    });
};
nbAnecdotes();

function nbRace() {
    sendRequest("https://catfact.ninja/breeds").then((
        response) => {
        let races = document.querySelector(".nbRaces");
        reponse_races = response;
        races.textContent = reponse_races.total;
    });
};
nbRace();


// Récupération de la race
async function recupPelage() {
    return new Promise((resolve) => {
        sendRequest("https://catfact.ninja/breeds").then(async (response) => {
            let lastpage = response.last_page; // On récupère le nombre de pages
            let tabPelage = []; // On crée un tableau qui va contenir les pelages
            for (let index = 1; index <= lastpage; index++) {
                // On parcourt toutes les pages
                let response = await sendRequest(
                    "https://catfact.ninja/breeds?page=" + index
                ); // On récupère

                response.data.forEach((race) => {
                    //On parcourt le tableau
                    tabPelage.push(race.coat); // On ajoute le pelage dans le tableau
                });
            }
            resolve(tabPelage);
        });
    });
}
recupPelage();
// Récupération du pelage le plus fréquent
async function recupPelageFrequent() {
    let typePelage = document.querySelector(".typePelage");
    let tabPelage = await recupPelage();
    let nombreMax = 1;
    let nombreActuel = 0;
    let lePlusFrequent;

    for (let i = 0; i < tabPelage.length; i++) {
        // On parcourt le tableau
        for (let f = i; f < tabPelage.length; f++) {
            // On compare chaque élément avec les autres
            if (tabPelage[i] == tabPelage[f]) {
                // Si les éléments sont identiques
                nombreActuel++; // On incrémente le compteur
            }
            if (nombreMax < nombreActuel) {
                // Si le compteur est supérieur au nombre max
                nombreMax = nombreActuel; // On remplace le nombre max par le compteur
                lePlusFrequent = tabPelage[i]; // On remplace le plus fréquent par l'élément courant
            }
        }
        nombreActuel = 0; // On remet le compteur à 0 pour le prochain élément
    }
    typePelage.innerHTML = lePlusFrequent; // On affiche le plus fréquent
    console.log(lePlusFrequent); // On
}
recupPelageFrequent();