document.addEventListener('click', (e) => {
    const image = e.target.closest('img');
    if (image === null || image.id === 'CardBack' || image.id === 'Card') return;
    for (let i = 0; i < 6; i++) {
        document.images[i].classList.remove('focus');
    }
    image.classList.toggle('focus');
});

document.addEventListener('click', (e) => {
    const buttons = document.querySelectorAll('button');
    const difficulty = e.target.closest('button');
    if (difficulty === null) return;
    for (let i = 0; i < 5; i++) {
        buttons[i].classList.remove('focus');
    }
    difficulty.classList.toggle('focus');
});