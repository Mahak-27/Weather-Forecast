import { useEffect, useState } from 'react'
import './App.css'
import Button from './components/Button'
import Card from './components/Card'
import Input from './components/Input'
import WeeklyForecast from './components/WeeklyForecast';
import { useWeather } from './context/Weather'
import WeatherDetailsGrid from './components/WeatherDetailsGrid'

function App() {
  const weather=useWeather();
  const [timeOfDay, setTimeOfDay] = useState('day');
  console.log(weather);
  

  

  useEffect(()=>{
    //get current location here
    weather.fetchCurrentUserLocationData();
  },[])

  useEffect(() => {
    if (weather.data && weather.data.location && weather.data.location.localtime) {
      const localTime = new Date(weather.data.location.localtime);
      const hour = localTime.getHours();

      if (hour >= 6 && hour < 18) { // 6 AM to 5:59 PM
        setTimeOfDay('day');
      } else if (hour >= 18 && hour < 22) { // 6 PM to 9:59 PM
        setTimeOfDay('evening');
      } else { // 10 PM to 5:59 AM
        setTimeOfDay('night');
      }
    }
  }, [weather.data]);


  const backgroundImages = {
    day: 'https://images.pexels.com/photos/139366/pexels-photo-139366.jpeg',
    evening: 'https://images.pexels.com/photos/244483/pexels-photo-244483.jpeg',
    night: 'https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg',
  };

  const currentBackground = backgroundImages[timeOfDay] || backgroundImages.day;

  const forecastData = weather.data?.forecast?.forecastday;
  console.log(forecastData);

  return (

    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed text-white flex flex-col items-center px-4 py-8 gap-8 overflow-hidden transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url('${currentBackground}')`,
      }}
    >
      {/* Overlay for readability - adjusted opacity slightly for better contrast */}
    <div className="absolute inset-0 bg-black opacity-50 z-0"></div> {/* Adjusted opacity to 50 */}
    <div className="relative z-10 flex flex-col items-center w-full gap-2">
      <h1 className="text-3xl font-bold">Weather Forecast</h1>

      {/* Search Section */}
<div className="w-full flex flex-col items-center justify-center gap-1 mb-8">
  {/* Input and Buttons row */}
  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
    <Input />
    <Button onClick={weather.handleClick} value="Search" />
    <Button onClick={weather.handleRefreshClick} value="Refresh" />
  </div>

  {/* Error message always rendered below */}
  <p className="text-red-400 text-sm min-h-[1.25rem]">
    {weather.error || "\u00A0"}
  </p>
</div>

      {/* Main Weather Card */}
      <div className="flex flex-col md:flex-row items-start md:items-stretch justify-center w-full max-w-4xl gap-2 z-10"> {/* Reduced gap to gap-3 */}
        <Card />
        <WeatherDetailsGrid />
      </div>
      

      {/* 5-Day Forecast */}
      {forecastData && <WeeklyForecast forecastData={forecastData} />}

    
    </div>

    </div>
  )
}

export default App;
