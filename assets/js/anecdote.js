function anecdoteAl() {
    let button = document.querySelector(".afficher");
    let anecdote = document.querySelector(".anecdoteal");
    button.addEventListener("click", () => {
        sendRequest("https://catfact.ninja/fact").then((
            response) => {
            anecdote.textContent = response.fact;
        });
    });
};
anecdoteAl();