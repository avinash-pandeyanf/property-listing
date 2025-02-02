import React, { useState, useRef, useEffect } from 'react';
import styles from './MultiSelect.module.css';

const MultiSelect = ({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const removeTag = (optionToRemove) => {
    onChange(selected.filter(option => option !== optionToRemove));
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.select}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.selectedTags}>
          {selected.length === 0 && (
            <span style={{ color: '#666' }}>{placeholder}</span>
          )}
          {selected.map(option => (
            <span key={option} className={styles.tag}>
              {option}
              <button
                className={styles.removeTag}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(option);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map(option => (
            <div
              key={option}
              className={styles.option}
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => {}}
              />
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
