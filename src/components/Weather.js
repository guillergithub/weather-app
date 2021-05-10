import { useState, useEffect } from "react"

const API_KEY = '1d7ca9d423329e3310d40affab85e874'

const Weather = () => {
    
    const [infoWeather, setInfoWeather] = useState({
        city: 'Punto Fijo',
        country: 'Venezuela',
        temp: 0, 
        description: 'Sunny',
        img: 'url',
        sym: 'C'
    })

    const convertTemperature = () => {
        console.log('Cambiar de grados a Faremheit')
    }

    const getData = (data) => {
        console.log(data.name, data.weather[1].main)
        console.log(data)

        setInfoWeather({
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            description: data.weather[1].description,
            sym: 'C'
        })
    }

    useEffect(()=> {     
        
        function success (pos) {     
            let lat = pos.coords.latitude;
            let lon = pos.coords.longitude;
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`            
            
            fetch(URL)
                .then(response =>  response.json())
                .then(data => getData(data))
        }
        
        
        function error (error) {
            console.log(error)
            console.error('No aceptaron bro')
        }

        navigator.geolocation.getCurrentPosition(success, error)


    }, [])

    
    
    return (
        <div className="container">
           
            <div className="card">

                <div className="info-img">
                    <div className="d-flex">
                        <h1 className="temperature-text">{infoWeather.temp} &deg; {infoWeather.sym}</h1>
                        <button onClick={convertTemperature} className='btn btn-warning'>&deg;{infoWeather.sym}</button>         
                    </div>           
                </div>
                    

                <div className="container-info">
                        
                    <div className="">
                        <p className="title">City: {infoWeather.city} </p>
                        <p className="title">Country: {infoWeather.country}</p>
                        <p className="title">Description: {infoWeather.description}</p>
                    </div>

                    <div className="">
                        <p className="title">City:</p>
                        <p className="title">Country: </p>
                        <p className="title">Description: </p>
                    </div>        

                </div>
                
            </div>
     
            
        </div>
    )
}

export default Weather;