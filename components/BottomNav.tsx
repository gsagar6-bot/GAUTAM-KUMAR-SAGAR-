
import React from 'react';
import type { Tab } from '../types';
import { BrainIcon } from './icons/BrainIcon';
import { LungsIcon } from './icons/LungsIcon';
import { SparkleIcon } from './icons/SparkleIcon';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'Meditate', label: 'Meditate', icon: BrainIcon },
  { id: 'Breathe', label: 'Breathe', icon: LungsIcon },
  { id: 'Affirm', label: 'Affirm', icon: SparkleIcon },
];

const NavButton: React.FC<{
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 w-24 p-2 rounded-lg transition-all duration-300 ease-in-out ${
        isActive ? 'bg-white/20 scale-110' : 'bg-transparent hover:bg-white/10'
      }`}
    >
      <item.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`} />
      <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{item.label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="w-full max-w-sm mx-auto bg-black/20 backdrop-blur-lg rounded-xl shadow-lg">
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
