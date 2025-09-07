const addBtn = document.getElementById('addBtn');
const cartBtn = document.getElementById('cartBtn');
const notification = document.getElementById('notification');

addBtn.addEventListener('click', () => {
    const flavor = document.querySelector('input[name="flavor"]:checked').value;
    showNotification(`${flavor}-ijs is toegevoegd!`);
});

function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}

