

export async function fetchData(location = 'palma') {
    const key = import.meta.env.VITE_API_KEY
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&lang=es`
    const response = await fetch(API)
    const responseJson = await response.json()
    //Si quisiera desestructurar
    // const {data = []} = responseJson
    return responseJson
    
}