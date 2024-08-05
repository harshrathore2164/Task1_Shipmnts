// src/filters/IntegerFilter.js
import React, { useState } from 'react';

const IntegerFilter = ({ onFilter }) => {
    const [filterType, setFilterType] = useState('equals');
    const [value, setValue] = useState('');
    const [range, setRange] = useState({ min: '', max: '' });

    const handleFilter = () => {
        onFilter(filterType, value !== '' ? Number(value) : '', {
            min: range.min !== '' ? Number(range.min) : '',
            max: range.max !== '' ? Number(range.max) : ''
        });
    };

    return (
        <div>
            <select onChange={(e) => setFilterType(e.target.value)}>
                <option value="equals">Equals</option>
                <option value="lessThan">Less than</option>
                <option value="lessThanOrEqual">Less than or equal</option>
                <option value="greaterThan">Greater than</option>
                <option value="greaterThanOrEqual">Greater than or equal</option>
                <option value="range">Range</option>
                <option value="notEqual">Not equal</option>
            </select>
            {filterType === 'range' ? (
                <>
                    <input type="number" placeholder="Min" onChange={(e) => setRange({ ...range, min: e.target.value })} />
                    <input type="number" placeholder="Max" onChange={(e) => setRange({ ...range, max: e.target.value })} />
                </>
            ) : (
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            )}
            <button onClick={handleFilter}>Apply</button>
        </div>
    );
};

export default IntegerFilter;
