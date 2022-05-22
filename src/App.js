import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import MY_API_TOKEN from './config.js'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState(' ')
  const [input, setInput] = useState('New York')

  const url2 = 'http://api.openweathermap.org/geo/1.0/direct?q=' + input + '&appid=' + MY_API_TOKEN

  const enterData = (e) => {
    if(e.key === 'Enter') {
      getData()
    }
  }

  const getData = () => {
    axios.get(url2).then((res) => {
      axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + res.data[0].lat + '&lon=' + res.data[0].lon + '&exclude=minutely,daily&appid=' + MY_API_TOKEN).then((response) => {
        setData(response.data)
        setLocation(res.data[0].name)
        setInput('')
      })
    })
  }


  const convertTemp = temp => {
    return Math.round((temp - 273.15) * 9/5 + 32)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
        {data.hourly ? (
        <>
          <div class='wind'>
            <div class='temp temp1'>Wind</div>
            <div class='temp temp2'> {data.hourly[1].wind_speed} </div>
            <div class='temp temp3'> {data.hourly[2].wind_speed} </div>
            <div class='temp temp4'> {data.hourly[3].wind_speed} </div>
            <div class='temp temp5'> {data.hourly[4].wind_speed} </div>
            <div class='temp temp6'> {data.hourly[5].wind_speed} </div>
            <div class='temp temp7'> {data.hourly[6].wind_speed} </div>
            <div class='temp temp8'> {data.hourly[7].wind_speed} </div>
            <div class='temp temp9'> {data.hourly[8].wind_speed} </div>
            <div class='temp temp10'> {data.hourly[9].wind_speed} </div>
            <div class='temp temp11'> {data.hourly[10].wind_speed} </div>
            <div class='temp temp12'> {data.hourly[11].wind_speed} </div>
          </div>

          <div class='temperature'>
            <div class='temp temp1'> Temp </div>
            <div class='temp temp2'> {convertTemp(data.hourly[1].temp)} </div>
            <div class='temp temp3'> {convertTemp(data.hourly[2].temp)} </div>
            <div class='temp temp4'> {convertTemp(data.hourly[3].temp)} </div>
            <div class='temp temp5'> {convertTemp(data.hourly[4].temp)} </div>
            <div class='temp temp6'> {convertTemp(data.hourly[5].temp)} </div>
            <div class='temp temp7'> {convertTemp(data.hourly[6].temp)} </div>
            <div class='temp temp8'> {convertTemp(data.hourly[7].temp)} </div>
            <div class='temp temp9'> {convertTemp(data.hourly[8].temp)} </div>
            <div class='temp temp10'>{convertTemp(data.hourly[9].temp)} </div>
            <div class='temp temp11'>{convertTemp(data.hourly[10].temp)}</div>
            <div class='temp temp12'>{convertTemp(data.hourly[11].temp)}</div>
          </div>
          <div class='hours'>
            <div class='temp temp1'>Hours</div>
            <div class='temp temp2'>1</div>
            <div class='temp temp3'>2</div>
            <div class='temp temp4'>3</div>
            <div class='temp temp5'>4</div>
            <div class='temp temp6'>5</div>
            <div class='temp temp7'>6</div>
            <div class='temp temp8'>7</div>
            <div class='temp temp9'>8</div>
            <div class='temp temp10'>9</div>
            <div class='temp temp11'>10</div>
            <div class='temp temp12'>11</div>
          </div>
          <div class='centerInfo'>
            <div class='info'>
              <p>{location}</p>
              <p class='currentTemp'>{convertTemp(data.current.temp)}°F</p>
              <p>Feels Like: {convertTemp(data.current.feels_like)}°F</p>
            </div>
          </div>
        </>
        ) : (
          null
        )}
        
      <div class='data'>
        <input type="text" placeholder="Enter City..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={enterData} />
        <button onClick={getData}>Update</button>
      </div>
    </div>
  );
}

export default App;
