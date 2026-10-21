import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange,
  isSearching,
}) => {
  return (
    <div className="filter-bar">
      <div>
        <label htmlFor="search-input">Tìm kiếm </label>
        <input
          id="search-input"
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        {isSearching && <span> Đang tìm...</span>}
      </div>

      <div>
        <label htmlFor="category-filter">Thể loại </label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;