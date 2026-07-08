import React, { useState, useMemo } from 'react';
import { set, unset } from 'sanity';
import * as Icons from 'lucide-react';

// Extract all valid icon names from lucide-react
const allIconNames = Object.keys(Icons)
  .filter(
    (key) =>
      key !== 'createLucideIcon' &&
      key !== 'default' &&
      !key.endsWith('Icon') &&
      /^[A-Z]/.test(key) // Lucide component names start with capital letters
  )
  .sort();

export const LucideIconSelector = React.forwardRef((props, ref) => {
  const { value, onChange } = props;
  const [searchQuery, setSearchQuery] = useState('');

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      // Return a set of common default recommendations first
      const defaults = [
        'Laptop',
        'Coffee',
        'Dumbbell',
        'BookOpen',
        'Headphones',
        'Smartphone',
        'Tv',
        'Watch',
        'Gamepad',
        'Speaker',
        'Camera',
        'Mouse',
        'ShoppingBag',
        'Tag',
        'Utensils',
        'Activity',
        'Heart',
        'Sparkles',
        'Grid',
        'Home',
        'Bike',
        'Flame',
        'ChefHat',
      ];
      return defaults.filter(name => allIconNames.includes(name));
    }
    return allIconNames
      .filter((name) => name.toLowerCase().includes(query))
      .slice(0, 72); // Limit to 72 matching elements for fast rendering performance
  }, [searchQuery]);

  const handleSelect = (name) => {
    onChange(name ? set(name) : unset());
  };

  const SelectedIcon = Icons[value];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* 1. Preview of currently selected icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: value ? '#4E6B35' : '#D1D5DB',
          backgroundColor: value ? '#F4F7F1' : '#FFFFFF',
        }}
      >
        <div
          style={{
            background: value ? '#E5ECD8' : '#F3F4F6',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            flexShrink: 0,
          }}
        >
          {SelectedIcon ? (
            React.createElement(SelectedIcon, { size: 28, color: '#4E6B35' })
          ) : (
            <span style={{ fontSize: '20px', color: '#9CA3AF', fontWeight: 'bold' }}>?</span>
          )}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '14px', color: value ? '#2F4020' : '#374151' }}>
            {value ? `Selected Icon: ${value}` : 'No Icon Selected'}
          </div>
          <div style={{ fontSize: '12px', color: value ? '#4E6B35' : '#6B7280', lineHeight: '1.4' }}>
            {value
              ? 'This icon will represent this category across search bars, navbar drawer menu, and pills lists.'
              : 'Use the catalog below or type in the search box to select a category representation.'}
          </div>
        </div>
        {value && (
          <button
            type="button"
            onClick={() => handleSelect('')}
            style={{
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#DC2626',
              backgroundColor: 'transparent',
              border: '1px solid #DC2626',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#FEF2F2';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* 2. Text Search Input */}
      <input
        type="text"
        placeholder="Type to search icon (e.g. Headphones, Keyboard, Smart, Shopping...)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: '14px',
          borderRadius: '8px',
          border: '1px solid #D1D5DB',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#4E6B35';
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(78, 107, 53, 0.2)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#D1D5DB';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      {/* 3. Grid representation */}
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4B5563', marginTop: '4px' }}>
        {searchQuery ? `Search Results (${filteredIcons.length} shown):` : 'Recommended Category Icons:'}
      </div>
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
          gap: '8px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {filteredIcons.map((name) => {
          const IconComponent = Icons[name];
          const isSelected = value === name;
          if (!IconComponent) return null;

          return (
            <button
              key={name}
              type="button"
              onClick={() => handleSelect(name)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 6px',
                borderRadius: '8px',
                border: isSelected ? '2px solid #4E6B35' : '1px solid #E5E7EB',
                backgroundColor: isSelected ? '#F4F7F1' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: '100%',
                boxSizing: 'border-box',
              }}
              onMouseOver={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#9CA3AF';
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }
              }}
              onMouseOut={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }
              }}
            >
              <div style={{ color: isSelected ? '#4E6B35' : '#4B5563', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(IconComponent, { size: 20 })}
              </div>
              <span
                style={{
                  wordBreak: 'break-all',
                  textAlign: 'center',
                  fontSize: '10px',
                  color: isSelected ? '#2F4020' : '#4B5563',
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

LucideIconSelector.displayName = 'LucideIconSelector';
