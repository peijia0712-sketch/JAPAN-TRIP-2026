import React, { useState } from 'react';
import { format, parseISO, compareAsc } from 'date-fns';
import { MapPin, Train, Bus, Footprints, Car, Trash2, Plus, Clock, Map, Hourglass, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { ItineraryItem, TransportMode } from '../types';
import { initialItinerary } from '../data/initialData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const TransportIcon = ({ mode, className }: { mode: TransportMode; className?: string }) => {
  switch (mode) {
    case 'train': return <Train className={className} />;
    case 'bus': return <Bus className={className} />;
    case 'walk': return <Footprints className={className} />;
    case 'taxi': return <Car className={className} />;
    case 'shinkansen': return <Train className={cn(className, "text-blue-600")} />; // Distinguish Shinkansen
    default: return <MapPin className={className} />;
  }
};

export default function ItineraryView() {
  const [items, setItems] = useState<ItineraryItem[]>(initialItinerary);

  // Group items by date
  const groupedItems = items.sort((a, b) => compareAsc(parseISO(a.date + 'T' + a.time), parseISO(b.date + 'T' + b.time))).reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, ItineraryItem[]>);

  const dates = Object.keys(groupedItems).sort();

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getHotelForDate = (date: string) => {
    const d = parseISO(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    if (month === 4) {
      if (day >= 5 && day < 8) return "Comfort Hotel ERA Kyoto Toji";
      if (day >= 8 && day < 13) return "Hotel Hankyu Respire Osaka";
      if (day >= 13 && day <= 15) return "Inn Narita";
    }
    return null;
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">行程规划 🇯🇵</h2>
        <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
          4/4 - 15/4 (11天)
        </div>
      </div>
      
      {dates.map((date) => {
        const hotel = getHotelForDate(date);
        return (
          <div key={date} className="mb-12">
            <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm py-3 mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider">
                    {format(parseISO(date), 'MM/dd')}
                  </span>
                  {format(parseISO(date), 'EEEE')}
                </h3>
                {hotel && (
                  <div className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100 flex items-center gap-1">
                    <MapPin size={10} /> {hotel}
                  </div>
                )}
              </div>
            </div>

            <div className="relative border-l-2 border-indigo-100 ml-3 space-y-8">
              {groupedItems[date].map((item) => {
                const isAlert = item.date === '2026-04-13' && item.time === '06:30';
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative pl-8"
                  >
                    {/* Timeline Dot */}
                    <div className={cn(
                      "absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border-4 border-white shadow-md z-10",
                      isAlert ? "bg-red-500 animate-pulse" : "bg-indigo-500"
                    )} />
                    
                    <div className={cn(
                      "bg-white rounded-3xl overflow-hidden shadow-sm border transition-all",
                      isAlert ? "border-red-200 bg-red-50" : "border-gray-100 hover:shadow-xl hover:-translate-y-1"
                    )}>
                      {/* Photo Placeholder */}
                      <div className="h-32 bg-gray-100 relative overflow-hidden">
                        <img 
                          src={item.photo || `https://picsum.photos/seed/${item.id}/600/300`} 
                          alt={item.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <Clock size={10} /> {item.time}
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-black text-gray-900 leading-tight flex-1 mr-4">{item.title}</h4>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                              <TransportIcon mode={item.transport} className="w-3 h-3" />
                              <span className="capitalize">{item.transport}</span>
                            </div>
                            {item.travelTime && (
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                <Map size={10} /> 预计车程: {item.travelTime}
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              <Hourglass size={10} /> 停留: {item.duration}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <a 
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                              <MapPin size={14} className="text-gray-400" />
                              <span className="truncate font-medium">{item.location}</span>
                              <ExternalLink size={10} />
                            </a>
                            {item.link && (
                              <a 
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-indigo-500 hover:underline"
                              >
                                <LinkIcon size={14} />
                                <span className="truncate font-medium">官方网站 / 攻略链接</span>
                              </a>
                            )}
                          </div>

                          {item.notes && (
                            <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-100 leading-relaxed">
                              <span className="font-bold text-gray-400 block mb-1 uppercase tracking-tighter text-[9px]">备注 / Tips</span>
                              {item.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
      
      <div className="fixed bottom-24 right-6 z-40">
        <button className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-2xl hover:bg-indigo-700 transition-all hover:scale-110 active:scale-90 flex items-center justify-center">
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
}

