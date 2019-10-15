//console.log('Client side java-script file is loaded.')
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })
//fetch data from client side java-script using a url
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')//target by class the .classname, by id then #message
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From JavaScript'

 

weatherForm.addEventListener('submit', (e)=>{
e.preventDefault()
const location = search.value
messageOne.textContent = 'loading...'
messageTwo.textContent = ''
console.log('testing!', location)
fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            //console.log(data.error)
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})

})
//Client side java-script
