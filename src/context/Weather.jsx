import { createContext ,useContext ,useState} from "react";
import { getWeatherDataForCity ,getWeatherDataForLocation } from "../api";

export const WeatherContext=createContext(null);

export const useWeather=()=>{
    return useContext(WeatherContext);
}

export const WeatherProvider=(props)=>{
    const [data,setData]=useState();
    const [searchCity,setSearchCity]=useState();
    const [error, setError] = useState("");

    const fetchData=async()=>{

        try{
            const response=await getWeatherDataForCity(searchCity);
            console.log("City Weather Response:", response);
            if (response.error && response.error.code === 1006) {
            setError("No matching location found.");
            setData(null);
            } else {
            setData(response);
            setError(""); 
            }
        }catch(error){
            console.error("Fetch error:", err);
            setError("No matching location found.");;
            setData(null);
            

        }
        
    };
    const fetchCurrentUserLocationData=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            getWeatherDataForLocation(position.coords.latitude,position.coords.longitude).then((data)=>setData(data));
            
        })

    };

    const handleRefreshClick = () => {
    fetchCurrentUserLocationData();
    setSearchCity(""); 
    setError("");      
    };
    

    const handleClick = () => {
        if (searchCity.trim() !== "") {
            fetchData(); 
        } else {
          setData(null);
        }
      };
    
    return(
        <WeatherContext.Provider value={{searchCity,data,setSearchCity,fetchData,fetchCurrentUserLocationData,handleClick,handleRefreshClick,error}}>
        {props.children}
        </WeatherContext.Provider>

    )

};