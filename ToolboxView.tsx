import React, { useState, useMemo } from 'react';
import { 
  Users, ArrowRightLeft, ShoppingCart, Wallet, Plus, Trash2, UserPlus, Check, PieChart, Info
} from 'lucide-react';
import { ShoppingItem, BudgetCategory, Member, Transaction } from '../types';
import { cn } from '../lib/utils';
import ShoppingListView from './ShoppingListView';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
  budget: BudgetCategory[];
  setBudget: React.Dispatch<React.SetStateAction<BudgetCategory[]>>;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function ToolboxView({ 
  items, setItems, budget, setBudget, members, setMembers, transactions, setTransactions 
}: Props) {
  const [activeTab, setActiveTab] = useState<'rate' | 'split' | 'shopping' | 'budget'>('rate');

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">智能工具箱 🛠️</h2>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        <TabButton active={activeTab === 'rate'} onClick={() => setActiveTab('rate')} icon={<ArrowRightLeft size={20} />} label="汇率" />
        <TabButton active={activeTab === 'split'} onClick={() => setActiveTab('split')} icon={<Users size={20} />} label="AA分账" />
        <TabButton active={activeTab === 'budget'} onClick={() => setActiveTab('budget')} icon={<Wallet size={20} />} label="预算" />
        <TabButton active={activeTab === 'shopping'} onClick={() => setActiveTab('shopping')} icon={<ShoppingCart size={20} />} label="清单" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
        {activeTab === 'rate' && <ExchangeRateCalculator />}
        {activeTab === 'split' && (
          <AdvancedSplitCalculator 
            members={members} 
            setMembers={setMembers} 
            transactions={transactions} 
            setTransactions={setTransactions} 
          />
        )}
        {activeTab === 'budget' && <BudgetManager budget={budget} setBudget={setBudget} />}
        {activeTab === 'shopping' && <ShoppingListView items={items} setItems={setItems} />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-3 rounded-xl border transition-all min-w-[70px]",
        active ? "bg-indigo-600 border-indigo-600 text-white shadow-md" : "bg-white border-gray-100 text-gray-500 hover:border-indigo-200"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function ExchangeRateCalculator() {
  const [jpy, setJpy] = useState<string>('');
  const [rate, setRate] = useState<string>('0.032');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">汇率转换 (JPY ⇄ MYR)</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
          <span>汇率:</span>
          <input 
            type="number" 
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-16 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none text-center font-mono"
            step="0.001"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">日元 (¥)</label>
          <input
            type="number"
            value={jpy}
            onChange={(e) => setJpy(e.target.value)}
            className="w-full text-3xl font-mono p-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/30"
            placeholder="0"
          />
        </div>
        
        <div className="flex justify-center">
          <div className="bg-indigo-50 rounded-full p-2 border border-indigo-100">
            <ArrowRightLeft className="text-indigo-600 rotate-90" size={24} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">马币 (RM)</label>
          <div className="w-full text-3xl font-mono p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl text-indigo-900 font-bold">
            {jpy && rate ? (parseFloat(jpy) * parseFloat(rate)).toFixed(2) : '0.00'}
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetManager({ budget, setBudget }: { budget: BudgetCategory[], setBudget: any }) {
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCurrency, setNewCurrency] = useState<'JPY' | 'MYR'>('JPY');

  const totals = useMemo(() => {
    const rate = 0.032;
    let totalJPY = 0;
    let totalMYR = 0;
    budget.forEach(b => {
      if (b.currency === 'JPY') {
        totalJPY += b.amount;
        totalMYR += b.amount * rate;
      } else {
        totalMYR += b.amount;
        totalJPY += b.amount / rate;
      }
    });
    return { totalJPY, totalMYR };
  }, [budget]);

  const addBudget = () => {
    if (!newName || !newAmount) return;
    setBudget([...budget, {
      id: uuidv4(),
      name: newName,
      amount: parseFloat(newAmount),
      currency: newCurrency,
      notes: ''
    }]);
    setNewName('');
    setNewAmount('');
  };

  const removeBudget = (id: string) => {
    setBudget(budget.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">预算总览</span>
          <PieChart size={20} className="text-indigo-300" />
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold font-mono">¥{totals.totalJPY.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="text-indigo-200 text-sm font-medium">≈ RM {totals.totalMYR.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="品类名称 (如: 机票)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-1">
            <input
              type="number"
              placeholder="金额"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select 
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value as any)}
              className="bg-gray-50 border rounded-xl px-2 text-xs outline-none"
            >
              <option value="JPY">¥</option>
              <option value="MYR">RM</option>
            </select>
          </div>
        </div>
        <button 
          onClick={addBudget}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} /> 添加预算项
        </button>
      </div>

      <div className="space-y-2">
        {budget.map(b => (
          <div key={b.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="text-sm font-bold text-gray-800">{b.name}</p>
              <p className="text-[10px] text-gray-400">{b.notes}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-mono font-bold text-gray-900">
                {b.currency === 'JPY' ? '¥' : 'RM'}{b.amount.toLocaleString()}
              </p>
              <button onClick={() => removeBudget(b.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdvancedSplitCalculator({ 
  members, setMembers, transactions, setTransactions 
}: { 
  members: Member[], setMembers: any, transactions: Transaction[], setTransactions: any 
}) {
  const [newMemberName, setNewMemberName] = useState('');
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [newTx, setNewTx] = useState({
    description: '',
    amount: '',
    paidBy: members[0]?.id || '',
    splitAmong: members.map(m => m.id)
  });

  const balances = useMemo(() => {
    const bal: Record<string, number> = {};
    members.forEach(m => bal[m.id] = 0);

    transactions.forEach(tx => {
      const amount = parseFloat(tx.amount.toString());
      // Payer gets credit
      bal[tx.paidBy] += amount;
      // Split among members
      const share = amount / tx.splitAmong.length;
      tx.splitAmong.forEach(mId => {
        bal[mId] -= share;
      });
    });
    return bal;
  }, [members, transactions]);

  const addMember = () => {
    if (!newMemberName.trim()) return;
    const id = uuidv4();
    setMembers([...members, { id, name: newMemberName }]);
    setNewMemberName('');
    setNewTx(prev => ({ ...prev, splitAmong: [...prev.splitAmong, id] }));
  };

  const addTransaction = () => {
    if (!newTx.description || !newTx.amount || newTx.splitAmong.length === 0) return;
    setTransactions([...transactions, {
      id: uuidv4(),
      description: newTx.description,
      amount: parseFloat(newTx.amount),
      paidBy: newTx.paidBy,
      splitAmong: newTx.splitAmong,
      date: new Date().toISOString()
    }]);
    setIsAddingTransaction(false);
    setNewTx({
      description: '',
      amount: '',
      paidBy: members[0]?.id || '',
      splitAmong: members.map(m => m.id)
    });
  };

  const toggleSplitMember = (mId: string) => {
    setNewTx(prev => ({
      ...prev,
      splitAmong: prev.splitAmong.includes(mId)
        ? prev.splitAmong.filter(id => id !== mId)
        : [...prev.splitAmong, mId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">高级 AA 分账</h3>
        <button 
          onClick={() => setIsAddingTransaction(!isAddingTransaction)}
          className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full"
        >
          {isAddingTransaction ? '取消' : '记一笔'}
        </button>
      </div>

      {/* Member Management */}
      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">数人头</span>
          <div className="flex gap-1">
            <input 
              type="text" 
              placeholder="名字" 
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="text-xs px-2 py-1 border rounded-lg outline-none w-20"
            />
            <button onClick={addMember} className="bg-indigo-600 text-white p-1 rounded-lg">
              <UserPlus size={14} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {members.map(m => (
            <div key={m.id} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
              {m.name}
              <span className={cn(
                "font-mono font-bold",
                balances[m.id] >= 0 ? "text-emerald-600" : "text-red-500"
              )}>
                {balances[m.id] >= 0 ? '+' : ''}{balances[m.id].toFixed(0)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {isAddingTransaction && (
        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="消费项目 (如: 晚餐)"
              value={newTx.description}
              onChange={(e) => setNewTx({...newTx, description: e.target.value})}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none text-sm"
            />
            <input
              type="number"
              placeholder="金额 (¥)"
              value={newTx.amount}
              onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none text-sm"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">谁付的钱？</label>
            <div className="flex flex-wrap gap-2">
              {members.map(m => (
                <button
                  key={m.id}
                  onClick={() => setNewTx({...newTx, paidBy: m.id})}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                    newTx.paidBy === m.id ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200"
                  )}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">谁一起分？</label>
            <div className="flex flex-wrap gap-2">
              {members.map(m => (
                <button
                  key={m.id}
                  onClick={() => toggleSplitMember(m.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1",
                    newTx.splitAmong.includes(m.id) ? "bg-emerald-500 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200"
                  )}
                >
                  {newTx.splitAmong.includes(m.id) && <Check size={12} />}
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={addTransaction}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all"
          >
            保存账单
          </button>
        </div>
      )}

      {/* Transaction List */}
      <div className="space-y-3">
        {transactions.length === 0 && !isAddingTransaction && (
          <div className="text-center py-10 text-gray-300">
            <Info size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">还没有账单记录</p>
          </div>
        )}
        {transactions.slice().reverse().map(tx => (
          <div key={tx.id} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-900">{tx.description}</h4>
                <p className="text-[10px] text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-indigo-600">¥{tx.amount.toLocaleString()}</p>
                <p className="text-[10px] text-gray-400">由 {members.find(m => m.id === tx.paidBy)?.name} 支付</p>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-50 flex flex-wrap gap-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase mr-1">参与者:</span>
              {tx.splitAmong.map(mId => (
                <span key={mId} className="text-[9px] font-medium bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                  {members.find(m => m.id === mId)?.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
