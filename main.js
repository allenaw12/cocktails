//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

//on page load, retrieves list of all drinks
document.querySelector('body').addEventListener('load',drinksList())
//stores drinks from all letter fetches
let drinks = []
//iterates thru alphabet, gathering all drinks for each letter and pushing to drinks variable above
function drinksList(){
    let alpha = 'abcdefghijklmnopqrstuvwxyz'
    for(char of alpha){
        //console.log('fetching char =', char)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${char}`)
            .then(res=> res.json())
            .then(data => {
                //console.log(data)
                data.drinks!==null ? data.drinks.forEach(drink => drinks.push(drink)) : null
            })
            .catch(err=>console.log(`Error: ${err}`))
    }
    console.log('finished')
}

//document.querySelector('button').addEventListener('click', getDrink)
//document.querySelector('input').addEventListener('keydown', enterKey)
//adds listener to form element and responds with any click or key press that equals submit
document.querySelector('#form').addEventListener('submit', getDrink)

// function enterKey(e){
//     if(e.keyCode === 13){
//         return getDrink()
//     }
// }

function getDrink(e) {
    e.preventDefault()
    let choice = document.querySelector('#filter')
    //reset alcoholic filter to none when searching
    choice.selectedIndex = 0
    let input = document.querySelector('input').value.toLowerCase()
    let searchFocus = document.querySelector('#searchFocus').value
    let divs = document.querySelectorAll('.card')
    searchCards = undefined
    if(divs.length > 0){
        divs.forEach(el => el.remove())
    }
    // fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    //     .then(res=>res.json())
    //     .then(data => {
    //         console.log(data.drinks)
    //         // let drinks = []
    //         data.drinks.forEach(obj =>{
    //let cards =[]
    drinks.forEach(drink =>{
            //console.log(drink.strAlcoholic)
            if(searchFocus === 'name' && drink.strDrink.toLowerCase().includes(input)){
                //console.log('in name and drink includes')
                return (makeCard(drink))
            }else if(searchFocus === 'ingredient'){
                //console.log('in ingredient')
                let ingredients = []
                for(prop in drink){
                    if(prop.includes('Ingredient') && drink[prop] !== null){
                        ingredients.push(drink[prop].toLowerCase())
                    }
                }
                if(ingredients.includes(input)){
                    //console.log('ingredient included')
                    return (makeCard(drink))
                }
            }else{
                //console.log('in null')
                null
            }
        function makeCard(obj){
            let sect = document.querySelector('#results')
            let div = document.createElement('div')
            let h3 = document.createElement('h3')
            let img = document.createElement('img')
            let p = document.createElement('p')
            let ul = document.createElement('ul')
            let ingred = document.createElement('span')
            let instru = document.createElement('span')
            let hiddenAlc = document.createElement('span')
            let ingredients = []
            let measures = []
            for(prop in obj){
                if(prop.includes('Ingredient') && obj[prop] !== null){
                    ingredients.push(obj[prop])
                }else if(prop.includes('Measure')){
                    measures.push(obj[prop])
                }
            }
            for(i=0;i<ingredients.length;i++){
                let li = document.createElement('li')
                if(measures[i] && measures[i].indexOf("\n")!==-1){
                    measures[i] = measures[i].replace('\n', '')
                }
                li.innerText = measures[i] ? `${measures[i]} ${ingredients[i]}` :ingredients[i]
                ul.appendChild(li)
                // console.log(`${measures[i]} ${ingredients[i]}`, measures[i]===null? null : measures[i].indexOf("\n")==-1 )
            }
            hiddenAlc.innerText = obj.strAlcoholic.toLowerCase()
            hiddenAlc.style.display = 'none'
            hiddenAlc.classList.add('alcoholContent')
            ingred.innerText = 'Ingredients:'
            instru.innerText = 'Instructions:'
            h3.innerText = obj.strDrink
            img.src = obj.strDrinkThumb
            p.innerText = obj.strInstructions
            div.setAttribute('class','card')
            div.appendChild(h3)
            div.appendChild(img)
            div.appendChild(ingred)
            div.appendChild(ul)
            div.appendChild(instru)
            div.appendChild(p)
            div.appendChild(hiddenAlc)
            sect.appendChild(div)
            return
            //     let drink = [obj.strDrink, obj.strDrinkThumb, obj.strInstructions, []]
            //     for(prop in obj){
            //         if(prop.includes('Ingredient') && obj[prop] !== null){
            //             drink[3].push(obj[prop])
            //         }
            //     }
            //     drinks.push(drink)
            // })
        }
    })
        cards = document.querySelectorAll('.card')
        // console.log(cards)
        let noresults = document.querySelector('.noResults')
        if(cards.length !== 0){
            //console.log('cards present')
            noresults.style.display = 'none'
            cards.forEach(card => {
                card.style.display = "none"
            })
            //console.log('then block', cards[0])
            cards[0].style.display = "block"
            document.querySelector('#filter').toggleAttribute('disabled', false)
        }else{
            //console.log('cards NOT present')
            noresults.style.display = 'block'
            noresults.innerText = 'No results found, please try a different search.'
            document.querySelector('#filter').toggleAttribute('disabled', true)
        }
        // .then(array=>{
        //     array.forEach(drink=>{
        //         let sect = document.querySelector('.results')
        //         let div = document.createElement('div')
        //         let h3 = document.createElement('h3')
        //         let img = document.createElement('img')
        //         let p = document.createElement('p')
        //         let ul = document.createElement('ul')
        //         let ingred = document.createElement('span')
        //         let instru = document.createElement('span')
        //         for(i=0;i<drink[3].length;i++){
        //             let li = document.createElement('li')
        //             li.innerText = drink[3][i]
        //             ul.appendChild(li)
        //         }
        //         ingred.innerText = 'Ingredients:'
        //         instru.innerText = 'Instructions:'
        //         h3.innerText = drink[0]
        //         img.src = drink[1]
        //         p.innerText = drink[2]
        //         div.setAttribute('class','card')
        //         div.appendChild(h3)
        //         div.appendChild(img)
        //         div.appendChild(ingred)
        //         div.appendChild(ul)
        //         div.appendChild(instru)
        //         div.appendChild(p)
        //         sect.appendChild(div)
        //     })
        
        //})
        //.catch(err=>console.log(`Error: ${err}`))
}

let currentDrink = 0
let cards

let gallery = (i) => { 
    if(cards.length === 0)return null
    cards.forEach((card, index) => {
        //console.log('set style to none')
        card.style.display = "none"
    })
    //console.log('index given is', i)
    cards[i].style.display = "block"
}
//document.querySelector('#form').addEventListener('submit', gallery(currentDrink))

//next arrow on slideshow
const next = (e) => {
    // cards = document.querySelectorAll(".card")
    if(e){
      e.preventDefault()}
    currentDrink >= cards.length - 1 ? currentDrink = 0 : currentDrink++
    gallery(currentDrink)
}
  
//previous arrow on slideshow
const prev = (e) => {
    // cards = document.querySelectorAll(".card")
    e.preventDefault()
    currentDrink <= 0 ? currentDrink = cards.length - 1 : currentDrink--
    gallery(currentDrink)
}

document.querySelector(".next").addEventListener('click', next)
document.querySelector(".prev").addEventListener('click', prev)


//from current search array, filter drinks that match alcohol filter and display
//populate to cards, but keep current full search cards in memory
//if filter is changed, run function again
//if search is changed, empty 'cached' cards and replace with null, make sure alcohol filter is reset to none
let searchCards
function filterAlcohol(){
    let choice = document.querySelector('#filter').value
    if(choice.indexOf('-') !== -1){
        choice = choice.replace('-', ' ')
    }
    if(searchCards === undefined){
        searchCards = cards
    }
    cards.forEach(el => el.remove())
    //console.log(cards)
    searchCards.forEach(card => {
        let sect = document.querySelector('#results')
        let content = card.querySelector('.alcoholContent').innerText
        //console.log(content === choice)
        if(choice === '' || content === choice){
            sect.appendChild(card)
        }
    })
    //console.log(choice)
    cards = document.querySelectorAll(".card")
    let noresults = document.querySelector('.noResults')
    if(cards.length === 0){
        noresults.style.display = 'block'
        noresults.innerText = 'No results found, please try a different search or filter.'
        //document.querySelector('#filter').toggleAttribute('disabled', true)
    }else{
        noresults.style.display = 'none'
            cards.forEach(card => {
                card.style.display = "none"
            })
            //console.log('then block', cards[0])
            cards[0].style.display = "block"
    }
    //gallery(0)
}

document.querySelector('#filter').addEventListener('input', filterAlcohol)
// document.querySelector('#filter').addEventListener('mousemove', logCards)
// function logCards(){ console.log(cards)}