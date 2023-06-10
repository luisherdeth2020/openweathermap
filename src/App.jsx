import { useEffect, useState } from 'react'
import './App.css'
import { fetchData } from './api/fetchData'
import sppiner from './assets/Spinner.svg'
import wind from './assets/wind.svg'
// import process from '../.env'

function App() {
  // Guardamos el nombre de la ubicación
  const [location, setLocation] = useState('')
  const [weatherInfo, setWeatherInfo] = useState([])
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSearch = () => {
    if (!location) {
      return '';
    }
    //Comienza la carga
    setLoading(true)
    //Llamos a fetchData es async, devuelve una promesa
    fetchData(location).then((data) => {
      // Actualizo el estado de show
      setShow(true)
      setWeatherInfo(data)
      console.log((data))
      // Termina de acargar
      setLoading(false)
    })
  };
  console.log(weatherInfo.weather)
  return (
    <>
      <h1>OpenWeather</h1>
      <div className="container">
        <input type="text" placeholder="Escribe tu ubicación" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button onClick={onSearch}>Buscar</button>

      </div>
      {loading ? <img src={sppiner} alt="Loading.." /> : ''}
      {show &&
        // Puedes retornar algún elemento JSX aquí
        <div>
          <h5>El tiempo en</h5>
          <h2>{weatherInfo.name}</h2>
          <div className="container__weather">
            <div class="temp-img"><img src={`http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`} alt="icon" /></div>
            <div className="temp">{(weatherInfo?.main?.temp - 273.15).toFixed()}ºC</div>
          </div>
          <h4>{weatherInfo.weather[0].description}</h4>
          <p>Temp. max: <span className="temp-info">{(weatherInfo?.main?.temp_max - 273.15).toFixed()}ºC</span></p>
          <p>Temp. min: <span className="temp-info">{(weatherInfo?.main?.temp_min - 273.15).toFixed()}ºC</span></p>
          <p>Humedad: {weatherInfo?.main?.humidity}%</p>
          <p><img src={wind} alt="wind" /> Viento : {weatherInfo?.wind?.speed}m/s</p>
        </div>
      }

    </>
  )
}

export default App
