import React, { useState, useEffect } from 'react';
import { Calendar, Languages, Cloud, Wrench } from 'lucide-react';
import ItineraryView from './components/ItineraryView';
import TranslateView from './components/TranslateView';
import WeatherView from './components/WeatherView';
import ToolboxView from './components/ToolboxView';
import { cn } from './lib/utils';
import { ShoppingItem, BudgetCategory, Member, Transaction } from './types';
import { v4 as uuidv4 } from 'uuid';

type View = 'itinerary' | 'translate' | 'weather' | 'tools';

export default function App() {
  const [activeView, setActiveView] = useState<View>('itinerary');
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: '1', name: 'Alfort Chocolate', category: 'Snacks', quantity: 5, price: '¥100', location: 'Don Quijote', checked: false },
  ]);
  const [budget, setBudget] = useState<BudgetCategory[]>([
    { id: 'b1', name: '机票', amount: 1500, currency: 'MYR', notes: 'AirAsia' },
    { id: 'b2', name: '酒店', amount: 80000, currency: 'JPY', notes: 'Kyoto/Osaka/Tokyo' },
  ]);
  const [members, setMembers] = useState<Member[]>([
    { id: 'm1', name: '我' },
    { id: 'm2', name: '伙伴A' },
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Main Content Area */}
      <main className="h-full">
        {activeView === 'itinerary' && <ItineraryView />}
        {activeView === 'translate' && <TranslateView />}
        {activeView === 'weather' && <WeatherView />}
        {activeView === 'tools' && (
          <ToolboxView 
            items={shoppingList} 
            setItems={setShoppingList}
            budget={budget}
            setBudget={setBudget}
            members={members}
            setMembers={setMembers}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-between items-center max-w-md mx-auto h-16">
          <NavButton 
            active={activeView === 'itinerary'} 
            onClick={() => setActiveView('itinerary')}
            icon={<Calendar size={24} />}
            label="行程"
          />
          <NavButton 
            active={activeView === 'translate'} 
            onClick={() => setActiveView('translate')}
            icon={<Languages size={24} />}
            label="翻译"
          />
          <NavButton 
            active={activeView === 'weather'} 
            onClick={() => setActiveView('weather')}
            icon={<Cloud size={24} />}
            label="天气"
          />
          <NavButton 
            active={activeView === 'tools'} 
            onClick={() => setActiveView('tools')}
            icon={<Wrench size={24} />}
            label="工具"
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all duration-200 w-16",
        active ? "text-indigo-600 transform -translate-y-1" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <div className={cn("p-1 rounded-xl transition-colors", active && "bg-indigo-50")}>
        {icon}
      </div>
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}
