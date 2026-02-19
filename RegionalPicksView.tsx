import React, { useState, useEffect } from 'react';
import { regionalPicks } from '../data/initialData';
import { cn } from '../lib/utils';
import { MapPin, ShoppingBag, Plus } from 'lucide-react';

type Region = 'Kyoto' | 'Osaka' | 'Tokyo';

interface Props {
  onAddToList: (name: string, price: string) => void;
}

export default function RegionalPicksView({ onAddToList }: Props) {
  const [activeRegion, setActiveRegion] = useState<Region>('Kyoto');

  // Context awareness: if today is between 5/4 and 8/4, prioritize Kyoto
  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    if (month === 4 && day >= 5 && day <= 8) {
      setActiveRegion('Kyoto');
    } else if (month === 4 && day > 8 && day <= 12) {
      setActiveRegion('Osaka');
    } else if (month === 4 && day > 12) {
      setActiveRegion('Tokyo');
    }
  }, []);

  const filteredPicks = regionalPicks.filter(pick => pick.region === activeRegion);

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">必买推荐 🛍️</h2>

      {/* Region Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
        {(['Kyoto', 'Osaka', 'Tokyo'] as Region[]).map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
              activeRegion === region 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {region === 'Kyoto' ? '京都' : region === 'Osaka' ? '大阪' : '东京'}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 gap-4 space-y-4">
        {filteredPicks.map((pick) => (
          <div key={pick.id} className="break-inside-avoid bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 group hover:shadow-md transition-all">
            <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 group-hover:bg-indigo-50 transition-colors relative overflow-hidden">
              <ShoppingBag size={32} className="group-hover:text-indigo-200" />
              <button 
                onClick={() => onAddToList(pick.nameCN, pick.price)}
                className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"
              >
                <Plus size={16} />
              </button>
            </div>
            <div>
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{pick.nameCN}</h3>
                  <p className="text-[10px] text-gray-400 font-mono">{pick.nameJP}</p>
                </div>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  {pick.price}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                {pick.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
