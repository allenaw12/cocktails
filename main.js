//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

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
    let drink = document.querySelector('input').value
    let divs = document.querySelectorAll('div')
    if(divs.length > 0){
        divs.forEach(el => el.remove())
    }
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res=>res.json())
        .then(data => {
            // let drinks = []
            data.drinks.forEach(obj =>{
                let sect = document.querySelector('.results')
                let div = document.createElement('div')
                let h3 = document.createElement('h3')
                let img = document.createElement('img')
                let p = document.createElement('p')
                let ul = document.createElement('ul')
                let ingred = document.createElement('span')
                let instru = document.createElement('span')
                let ingredients = []
                for(prop in obj){
                    if(prop.includes('Ingredient') && obj[prop] !== null){
                        ingredients.push(obj[prop])
                    }
                }
                for(i=0;i<ingredients.length;i++){
                    let li = document.createElement('li')
                    li.innerText = ingredients[i]
                    ul.appendChild(li)
                }
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
                sect.appendChild(div)

            //     let drink = [obj.strDrink, obj.strDrinkThumb, obj.strInstructions, []]
            //     for(prop in obj){
            //         if(prop.includes('Ingredient') && obj[prop] !== null){
            //             drink[3].push(obj[prop])
            //         }
            //     }
            //     drinks.push(drink)
            // })
            
        })
        cards = document.querySelectorAll('div')
            cards.forEach(card => {
                card.style.display = "none"
                })
            cards[0].style.display = "block"
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
        
        })
        .catch(err=>console.log(`Error: ${err}`))
}

let currentDrink = 0
let cards = document.querySelectorAll("div")

let gallery = (i) => { 
    cards.forEach(card => {
    card.style.display = "none"
    })
    cards[i].style.display = "block"
}
//document.querySelector('#form').addEventListener('submit', gallery(currentDrink))

//next arrow on slideshow
const next = (e) => {
    cards = document.querySelectorAll("div")
    if(e){
      e.preventDefault()}
    currentDrink >= cards.length - 1 ? currentDrink = 0 : currentDrink++
    gallery(currentDrink)
}
  
//previous arrow on slideshow
const prev = (e) => {
    cards = document.querySelectorAll("div")
    e.preventDefault()
    currentDrink <= 0 ? currentDrink = cards.length - 1 : currentDrink--
    gallery(currentDrink)
}

document.querySelector(".next").addEventListener('click', next)
document.querySelector(".prev").addEventListener('click', prev)
  