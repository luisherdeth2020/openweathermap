

// export async function fetchData(location = 'palma', lat, lon) {
//     const key = import.meta.env.VITE_API_KEY

//     const API = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&lang=es`
//     const API_DAYS = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={API key}`

//     const response = await fetch(API)
//     const responseJson = await response.json()
//     //Si quisiera desestructurar
//     // const {data = []} = responseJson
//     return responseJson

// }

export async function fetchData(location = 'palma') {
    const key = import.meta.env.VITE_API_KEY

    const API_LOCATION = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&lang=es`
    
    // Primera consulta para obtener información location y coordenadas
    const responseWeather = await fetch(API_LOCATION)
    const weatherJson = await responseWeather.json()
    console.log('weatherJson:', weatherJson)
    //Si quisiera desestructurar
    // const {data = []} = responseJson

    // Extraer latitud y longitud
    const {lat, lon} = weatherJson.coord;
    const API_DAYS = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&lang=es`

    // Realizar segunda consulta usando las coordenadas obtenidas
    const responseDays = await fetch (API_DAYS)
    const daysJson = await responseDays.json()

    console.log('daysJson:', daysJson)
    return {weather: weatherJson, days: daysJson}

}

// export async function fetchData(location = 'palma', lat, lon) {
//     const key = import.meta.env.VITE_API_KEY

//     const API = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&lang=es`
//     const API_DAYS = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={API key}`

//     const [responseWeather, responseDays] = await Promise.all([
//         fetch(API),
//         fetch(API_DAYS)
//     ])

//     const [weatherJson, daysJson] = await Promise.all([
//         responseWeather.json(),
//         responseDays.json()
//     ])
//     return {weather: weatherJson, days: daysJson}
// }