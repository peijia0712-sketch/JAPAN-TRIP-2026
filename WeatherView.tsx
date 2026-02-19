import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import { WeatherData } from '../types';

export default function WeatherView() {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated weather data for the trip locations
    setTimeout(() => {
      setWeather([
        { location: 'Kyoto', temp: 18, condition: 'Sunny', icon: 'sun' },
        { location: 'Osaka', temp: 20, condition: 'Cloudy', icon: 'cloud' },
        { location: 'Tokyo', temp: 16, condition: 'Rainy', icon: 'rain' },
        { location: 'Nara', temp: 19, condition: 'Partly Cloudy', icon: 'cloud' },
        { location: 'Kawaguchiko', temp: 12, condition: 'Sunny', icon: 'sun' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">实时天气 🌤️</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-100 border-t-indigo-600" />
          <p className="text-sm text-gray-400 font-medium">正在获取最新气象数据...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {weather.map((w, i) => (
            <div key={i} className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all" />
              <div className="relative p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    {w.icon === 'sun' && <Sun className="text-yellow-500" size={32} />}
                    {w.icon === 'cloud' && <Cloud className="text-gray-400" size={32} />}
                    {w.icon === 'rain' && <CloudRain className="text-blue-400" size={32} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{w.location}</h4>
                    <p className="text-sm text-gray-500 font-medium">{w.condition}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-4xl font-black text-indigo-600 font-mono tracking-tighter">
                    {w.temp}<span className="text-2xl">°C</span>
                  </div>
                  <div className="flex items-center justify-end gap-3 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Wind size={10} /> 12km/h</span>
                    <span className="flex items-center gap-1"><Droplets size={10} /> 45%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-8 p-6 bg-indigo-600 rounded-3xl text-white shadow-lg">
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Thermometer size={18} /> 旅行建议
            </h5>
            <p className="text-sm text-indigo-100 leading-relaxed">
              4月日本正值樱花季，早晚温差较大。建议采用“洋葱式”穿衣法，随身携带轻便外套。富士山地区海拔较高，气温会比市区低5-10度，请务必准备厚外套。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
