const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('nameInput');
const playerName = document.getElementById('playerName');

submitBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('playerName', name);
        window.location.href = 'stage1.html';
    } else {
        alert('Please enter your name!');
    }
});

nameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submitBtn.click();
    }
});