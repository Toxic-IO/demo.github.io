const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let onfloor = true;
let position = 0;

function handleKeyDown(event) {
    if (event.keyCode == 32) {
        if (onfloor) {
            jump();

        }
    }
}

function jump() {
    onfloor = false;

    let upinterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upinterval);
            //Descendo
            let downinterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downinterval);
                    onfloor = true;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            //Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let RNG = Math.random() * 6000;
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus, RNG);
}

createCactus();
document.addEventListener('keydown', handleKeyDown);