import React, { useState } from 'react';
import { translations } from '../data/initialData';
import { Volume2, Languages, ArrowRightLeft, Search } from 'lucide-react';
import { cn } from '../lib/utils';

export default function TranslateView() {
  const [filter, setFilter] = useState('All');
  const [customText, setCustomText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'General', 'Drugstore', 'Dining'];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  const filtered = translations.filter(t => {
    const matchesFilter = filter === 'All' || t.category === filter;
    const matchesSearch = t.cn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.jp.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">翻译助手 🗣️</h2>

      {/* Custom Translation Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">自由翻译 / 语音</span>
          <a 
            href="https://translate.google.com/?sl=zh-CN&tl=ja&op=translate" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] text-indigo-600 font-bold flex items-center gap-1 hover:underline"
          >
            Google Translate <ArrowRightLeft size={10} />
          </a>
        </div>
        <div className="relative">
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="输入中文进行翻译..."
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-h-[80px] bg-gray-50/50"
          />
          <button 
            className="absolute bottom-3 right-3 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-all active:scale-90"
            onClick={() => speak(customText)}
          >
            <Volume2 size={18} />
          </button>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="搜索常用语..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                filter === cat ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-gray-100 text-gray-500'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Translation Cards */}
      <div className="grid gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm hover:border-indigo-200 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                {item.category}
              </span>
              <button 
                onClick={() => speak(item.jp)}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-1"
              >
                <Volume2 size={20} />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">{item.cn}</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                {item.jp}
              </p>
              <p className="text-xs text-gray-400 italic font-mono">{item.pronunciation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
