import { useEffect, useState } from 'react'
import './App.css'
import { fetchData } from './api/fetchData'
import sppiner from './assets/Spinner.svg'
import search from './assets/search.svg'
import DaysArray from './components/DaysArray'

function App() {
  // Guardamos el nombre de la ubicación
  const [location, setLocation] = useState('')
  const [weatherInfo, setWeatherInfo] = useState({})
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
      if (!data) { // Si no hay datos
        setLoading(true); // Establecer notFound como verdadero 
        return;
      }
      setShow(true)
      setWeatherInfo(data)
      // Termina de acargar
      setLoading(false)
    })
  };

  return (
    <>
      <h1 className='title'>OpenWeather</h1>
      <div className="container">
        <input autoFocus type="text" placeholder="Escribe tu ubicación" value={location} onChange={(e) => setLocation(e.target.value)} onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onSearch();
          }
        }} />
        <div className="onSearchIcon" onClick={onSearch}><img src={search} alt={search} /></div>

      </div>
      {/* {loading ? <p>No se encontro</p> <img src={sppiner} alt="Loading.." /> : ''} */}
      {loading &&
        <div className='loading'><p>No se encontró ninguna ubicación.</p><img src={sppiner} alt="Loading.." /></div>
      }
      {show &&
        // Puedes retornar algún elemento JSX aquí
        <div className="container__main">
          <div className="container__left" >
            <h5>Tiempo en</h5>
            <h2>{weatherInfo.weather.name}</h2>
            <div className="container__weather">
              <div className="temp-img">
                <img src={`http://openweathermap.org/img/w/${weatherInfo.weather.weather[0].icon}.png`} alt="icon" />
              </div>
              <div className="temp">{(weatherInfo.weather?.main?.temp - 273.15).toFixed()}ºC</div>
            </div>
            <h4>{weatherInfo.weather.weather[0]?.description}</h4>
          </div>
          <div className="container__right">
            <div className="container__right-info">
              <p>Temp. max: <span className="temp-info">{(weatherInfo?.weather?.main?.temp_max - 273.15).toFixed()}ºC</span></p>
              <p>Temp. min: <span className="temp-info">{(weatherInfo?.weather?.main?.temp_min - 273.15).toFixed()}ºC</span></p>
            </div>
            <div className="container__weather-wind">
              <p>Humedad: <span className="temp-info">{weatherInfo?.weather?.main?.humidity}%</span></p>
              <p>Viento : <span className="temp-info">{weatherInfo?.weather?.wind?.speed}m/s</span></p>
            </div>
          </div>

          <div className="first">
            <DaysArray weatherInfo={weatherInfo} element={1} />
          </div>
          <div className="second">
            <DaysArray weatherInfo={weatherInfo} element={2} />
          </div>

          <div className="third">
            <DaysArray weatherInfo={weatherInfo} element={3} />
          </div>
        </div>
      }

    </>
  )
}

export default App
