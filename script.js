const toevoegenKnop = document.getElementById('toevoegen');
const winkelmandKnop = document.getElementById('winkelmand');
const melding = document.getElementById('melding');

toevoegenKnop.addEventListener('click', () => {
    const smaak = document.getElementById('smaak').value;
    const liter = document.getElementById('liter').value;
    melding.textContent = `${smaak}-ijs (${liter}L) is toegevoegd!`;
    melding.style.display = 'block';
    setTimeout(() => {
        melding.style.display = 'none';
    }, 2000);
});

winkelmandKnop.addEventListener('click', () => {
    alert("Winkelmandje bekijken: functie nog niet geïmplementeerd.");
});
