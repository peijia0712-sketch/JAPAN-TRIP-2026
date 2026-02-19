import React, { useState } from 'react';
import { ShoppingItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Check, ShoppingCart, MapPin, Tag } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
}

export default function ShoppingListView({ items, setItems }: Props) {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '1',
    location: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const toggleCheck = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    
    const item: ShoppingItem = {
      id: uuidv4(),
      name: newItem.name,
      category: newItem.category,
      quantity: parseInt(newItem.quantity) || 1,
      price: newItem.price,
      location: newItem.location,
      checked: false
    };
    
    setItems([...items, item]);
    setNewItem({ name: '', category: '', price: '', quantity: '1', location: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <ShoppingCart size={20} className="text-indigo-600" /> 购物清单
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
        >
          {isAdding ? '取消' : '添加商品'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={addItem} className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3 animate-in fade-in slide-in-from-top-2">
          <input
            type="text"
            placeholder="商品名称 (如: 抹茶粉)"
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            autoFocus
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="品类 (如: 食品)"
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
            <input
              type="text"
              placeholder="价格 (如: ¥1500)"
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="数量"
              value={newItem.quantity}
              onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
            <input
              type="text"
              placeholder="哪里买 (如: 锦市场)"
              value={newItem.location}
              onChange={(e) => setNewItem({...newItem, location: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-md active:scale-95 transition-all"
          >
            确认添加
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.length === 0 && !isAdding && (
          <div className="text-center py-10 text-gray-400">
            <ShoppingCart size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">清单还是空的，快去添加商品吧！</p>
          </div>
        )}
        {items.map((item) => (
          <div 
            key={item.id} 
            className={cn(
              "group flex items-center gap-4 p-4 rounded-2xl border transition-all",
              item.checked 
                ? "bg-gray-50 border-gray-100 opacity-60" 
                : "bg-white border-gray-100 shadow-sm hover:border-indigo-200"
            )}
          >
            <button 
              onClick={() => toggleCheck(item.id)}
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                item.checked 
                  ? "bg-indigo-600 border-indigo-600 text-white" 
                  : "border-gray-300 text-transparent hover:border-indigo-400"
              )}
            >
              <Check size={14} strokeWidth={3} />
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className={cn("font-bold text-gray-900 truncate", item.checked && "line-through text-gray-400")}>
                  {item.name}
                </h4>
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {item.price}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                  <Tag size={10} /> {item.category || '未分类'}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                  x{item.quantity}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium truncate">
                  <MapPin size={10} /> {item.location || '未知地点'}
                </span>
              </div>
            </div>

            <button 
              onClick={() => deleteItem(item.id)}
              className="text-gray-200 hover:text-red-500 p-2 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
