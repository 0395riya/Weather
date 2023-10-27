import React, { useState, useEffect } from 'react'
import './css/style.css'
import { DateTime } from 'luxon';

const TempApp = () => {

    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("Delhi")
    const [currentDateTime, setCurrentDateTime] = useState(DateTime.local().toFormat("EEE | MMM dd, yyyy | h:mm a"));
    const [tempStatusIcon, setTempStatusIcon] = useState(<i className="fa-solid fa-sun" style={{ color: '#eccc68' }}></i>);


    const fetchWeatherData = async () => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6fdff5b460df09e3169336e58479a9e1`;
        const response = await fetch(url);
        const result = await response.json();
        setCity(result);
    };

    useEffect(() => {
        fetchWeatherData();
        if (city && city.weather && city.weather.length > 0) {
            const tempStatus = city.weather[0].main;
            let tempStatusIcon = null;

            switch (tempStatus) {
                case "Sunny":
                    tempStatusIcon = <i className="fa-solid fa-sun" style={{ color: '#eccc68' }}></i>;
                    break;
                case "Clouds":
                    tempStatusIcon = <i className="fa-solid fa-cloud" style={{ color: '#f1f2f6' }}></i>;
                    break;
                case "Rainy":
                    tempStatusIcon = <i className="fa-solid fa-cloud-rain" style={{ color: '#a4b0be' }}></i>;
                    break;
                case "Haze":
                    tempStatusIcon = <i className="fa-solid fa-smoke" style={{ color: '#f1f2f6' }}></i>; // Replace 'your-haze-color' with the appropriate color
                    break;
                default:
                    tempStatusIcon = <i className="fa-solid fa-cloud" style={{ color: '#f1f2f6' }}></i>;
            }

            setTempStatusIcon(tempStatusIcon);
        }
    }, [search]);

    useEffect(() => {
        if (city && city.timezone) {
            const timezoneOffsetSeconds = city.timezone;
            const intervalId = setInterval(() => {
                const currentDateTimeInTimeZone = DateTime.utc().plus({ seconds: timezoneOffsetSeconds }).toFormat("EEE | MMM dd, yyyy | h:mm a");
                setCurrentDateTime(currentDateTimeInTimeZone);
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }


    }, [city]);



    // const curDate = document.getElementById('date');
    // let weathercon = document.getElementById('weathercon');

    // const tempStatus = 'Clouds'

    // const getCurrentDay = () =>{
    //     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //     let d = new Date();
    //     let day = days[d.getDay()];
    //     return day ;
    //     console.log(days[d.getDay()]);
    // }

    // const getCurrentTime = () => {
    //     const months = ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    //     var now = new Date();
    //     var month = months[now.getMonth() + 1];
    //     var date = now.getDate();
    //     var year = now.getFullYear();
    //     let hours = now.getHours();
    //     let minut = now .getMinutes();
    //     let period = "AM";
    //     if (hours > 11) {
    //         period = "PM";
    //         if (hours > 12) hours -= 12;
    //     }
    //     if (minut < 10) {
    //         minut = "0" + minut;
    //     }
    //     return `${date} ${month} | ${hours}:${minut} ${period}`
    // }

    // curDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <>
            <div className='box'>
                <div className='inputData'>
                    <input type='search' className='inputField'
                        onChange={(event) => { setSearch(event.target.value) }}
                        value={search}
                    />
                </div>

                {!city ? (<p className='errorMsg'>No Data Found</p>) : (<div>
                    <div id='weathercon'>{tempStatusIcon != null ? tempStatusIcon : (<i className="fa-solid fa-sun" style={{ color: '#eccc68' }}></i>)}</div>
                    <div className='info'>
                        <h1 className='location'>
                            <i className="fa-solid fa-street-view"></i>{" "}{capitalizeFirstLetter(search)}
                        </h1>
                        <p id='date'>{currentDateTime} </p>
                        <h2 className='temp'>{city?.main?.temp}&#8451;</h2>
                        <h3 className='tempmin_max'> Min :{city?.main?.temp_min}&#8451; | Max : {city?.main?.temp_max}&#x2103;</h3>
                    </div>
                    <div className='wave -one'></div>
                    <div className='wave -two'></div>
                    <div className='wave -three'></div>
                </div>)}

            </div>
        </>
    )
}

export default TempApp
