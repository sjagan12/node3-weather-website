console.log('client side javascript file is loaded')
// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)

//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error

            } else {
                console.log(data.loaction)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent =  data.forecast
            }
        })
    })
    
})