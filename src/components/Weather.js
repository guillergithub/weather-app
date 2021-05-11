import { useState, useEffect } from "react"
// import {Spinner} from 'reactstrap'

const API_KEY = '1d7ca9d423329e3310d40affab85e874' // Key OpenWeatherAPI
const URL_IP_API = "https://ipgeolocation.abstractapi.com/v1/?api_key=bbf3e174a3914705b459dcfb031ec68b" // URL API IP
const URL_ICONS = 'http://openweathermap.org/img/wn/'  // URL OpenWeatherAPI icons

const Weather = () => {
    
    const [temperature, setTemperature] = useState({
        temp: 0,
        unit: 'C',
        isCelsius: true
    })

    
    const [infoWeather, setInfoWeather] = useState({})

    const [infoIP, setInfoIP] = useState({                                                                                                                                                                                                                                                                                                                                                                                                                                          
        city: '',
        country: '',
        lon: 0,
        lat: 0,
        currentTime: ''
    })

    //This function do the maths to convert de units and change the flag signal of Celsius or Farenheit unit symbol
    const convertTemperature = () => {
   
            let currentTemperature = temperature.temp 

            if (temperature.isCelsius) {
                console.log('De Celsius a Farenheit');
                console.log('Temp: ', temperature.temp)

                setTemperature({
                    temp: Math.floor((currentTemperature * 9/5) + 32),
                    unit: 'F',
                    isCelsius: false 
                })
            }

            if (!temperature.isCelsius) {
                console.log('De Farenheit a Celsius');
                console.log('Temp: ', temperature.temp)

                setTemperature({
                    temp: Math.floor((currentTemperature - 32)*5/9),
                    unit: 'C',
                    isCelsius: true 
                })
            }

    }

    // This function is called by the useEffect fetch OpenWeather API
    const handleTemperature = (weather) => {
        console.log(weather);
        setTemperature({
            temp: weather.main.temp,
            unit: 'C',
            isCelsius: true
        })

        setInfoWeather({
            city: weather.name,
            country: weather.sys.country,           
            description: weather.weather[0].description,
            icon: weather.weather[0].icon,
            iconDescription: weather.weather[0].main
        })        
    }


    // This uses effect calls OpenWeather API and return it to handleTemperature L:57
    //Geolocation with navigator API
    useEffect(()=> {             
        function success (pos) {     
            let lat = pos.coords.latitude;
            let lon = pos.coords.longitude;
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`            
            
            fetch(URL)
                .then(response =>  response.json())
                .then(data => handleTemperature(data))
        }
        
        
        function error (error) {
            console.log(error)
            console.error('The user do not accepted the GPS permission')
        }

        navigator.geolocation.getCurrentPosition(success, error)


    }, [])

    // Fetch the user IP from IP API and save data on infoIP
    useEffect(()=>{     
              
        fetch(URL_IP_API)
        .then(res => res.json())
        .then(data => {

            console.log('IP API result: ', data)
            const hours = parseInt(data.timezone.current_time.slice(0,2))
            setInfoIP({
                city: data.city,
                country: data.country,
                lon: data.longitude,
                lat: data.latitude, 
                currentTime: parseInt(data.timezone.current_time),
                atDay: (hours >= 6 && hours <= 19) ? '#f7a440' : '#325288' 
            })           
        })       
        
 
    }, [])

   
    //<Spinner animation="grow">&nbsp;</Spinner>   
    

    return (
        <div className="container">
            <div className="card">

                <div className="info-img" style={{background: infoIP.atDay}}>
                    <div className="container-temperature">
                        <h1 className="temperature-text">&deg;{temperature.temp} {temperature.unit} </h1>
                        <button onClick={convertTemperature} className="btn btn-primary mt-2">&deg;{(temperature.isCelsius) ? 'F' : 'C'}</button>         
                    </div>   

                    <div className='container-icon'>
                        <img src={URL_ICONS+infoWeather.icon+'@2x.png'} alt={infoWeather.iconDescription} className='d-1'></img>
                        <h3>{infoWeather.iconDescription}</h3>
                    </div>        
                    
                </div>

                <div className="container-info">
                        
                    <div>
                        <p className="title">City: {infoIP.city} </p>
                        <p className="title">Country: {infoIP.country}</p>
                        <p className="title">Description: {infoWeather.description}</p>
                        
                    </div>
       

                </div>
                
            </div>
     
            
        </div>
    )
}

export default Weather;