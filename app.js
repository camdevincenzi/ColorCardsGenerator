const generatePalette = document.getElementById('submit-button')
const scaleCards = document.getElementById('scale-cards')

generatePalette.addEventListener('click', () => {

    // initialize colors and colors list
    let scaleList = []
    let scaleColors = []

    //get and convert the color value of the inputs to hexadecimal
    scaleColors[0] = chroma(document.getElementById('input-color').value).hex()
    scaleColors[1] = chroma(document.querySelector('input[name="shade"]:checked').value).hex()

    //number of cards
    let steps = parseInt(document.getElementById('input-number').value)

    //reset the list
    scaleCards.innerHTML = '';

    //create the scale
    scaleList = chroma.scale(scaleColors).colors(steps);

    //initialize clipboard.js
    let clipboard = new ClipboardJS('button.copy-button')

    if(steps === 0 || steps <= 36){
        let messageError = document.querySelector('.messageError').style.display='none'

        for(let j=0; j < steps; j++){
            let newCard = document.createElement('li')
            newCard.classList.add('card')
            newCard.addEventListener('click', (e) => {
                if(e.target.tagName === 'BUTTON'){
                    e.target.classList.add('active')
                    setTimeout(() => {
                        e.target.classList.remove('active')
                    },1000)
                }
            });
            newCard.style.backgroundColor = scaleList[j]
    
            newCard.innerHTML = 
            `<div class="color-box">
                <button data-clipboard-target="#hexColor${[j]}" class="copy-button">
                </button>
            </div>
            <div class="details">
                <span class="rgb">${chroma(scaleList[j]).css()}</span>
                <input type="text" id="hexColor${[j]}" class="hexColor" value="${scaleList[j]}" readonly></input>
            </div>`
    
            scaleCards.appendChild(newCard);
        }
    } else {
        messageError = document.querySelector('.messageError').style.display='block'
    }
})