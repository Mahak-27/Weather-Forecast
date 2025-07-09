import React from "react";

const WeeklyForecast = ({ forecastData }) => {
  if (!Array.isArray(forecastData)) return null;


  return (
    <div className="mt-10 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 shadow-xl w-full max-w-4xl">
      <h2 className="text-white font-semibold text-xl mb-4 drop-shadow">7-Day Forecast</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecastData.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/20 backdrop-blur-lg p-4 rounded-xl text-center hover:bg-white/20 transition-all"
          >
            <h3 className="text-white font-medium mb-2">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h3>
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="mx-auto mb-2 w-11 h-11"
            />
            <p className="text-white text-sm mb-1">{day.day.condition.text}</p>
            <div className="text-white font-semibold text-sm w-full"> {/* Changed text-base to text-sm and added w-full */}
              <div className="block leading-tight">Max-{day.day.maxtemp_c}°</div>
              <div className="block text-white/70 leading-tight">Min-{day.day.mintemp_c}°</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
