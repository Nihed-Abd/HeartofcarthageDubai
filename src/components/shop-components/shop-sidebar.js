import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Sidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: [],
    propertyType: [],
    priceRange: [1000, 5000000],
    bedrooms: [],
    bathrooms: [],
    status: [],
  });

  const handleCheckboxChange = (filterName, value) => {
    setFilters((prev) => {
      const isChecked = prev[filterName].includes(value);
      const updatedFilter = isChecked
        ? prev[filterName].filter((item) => item !== value)
        : [...prev[filterName], value];

      const updatedFilters = { ...prev, [filterName]: updatedFilter };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleSliderChange = (value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, priceRange: value };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="col-lg-4 mb-100">
      <aside className="sidebar ltn__shop-sidebar">
        <h3 className="mb-10">Filter Properties</h3>

        {/* Category */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Category</h4>
          <ul>
            <li>
              <label className="checkbox-item">
                Off-Plan
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('category', 'Off Plan')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                Ready to Move
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('category', 'Ready to Move')}
                />
                <span className="checkmark" />
              </label>
            </li>
          </ul>
        </div>

        {/* Status */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Status</h4>
          <ul>
            <li>
              <label className="checkbox-item">
                Rent
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('status', 'Rent')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                Buy
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('status', 'Buy')}
                />
                <span className="checkmark" />
              </label>
            </li>
          </ul>
        </div>

        {/* Property Type */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Property Type</h4>
          <ul>
            <li>
              <label className="checkbox-item">
                Apartment
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('propertyType', 'Apartment')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                Villa
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('propertyType', 'Villa')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                Townhouse
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('propertyType', 'Townhouse')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                House
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('propertyType', 'House')}
                />
                <span className="checkmark" />
              </label>
            </li>
          </ul>
        </div>

        {/* Price Filter Widget */}
        <div className="widget ltn__price-filter-widget">
          <h4 className="ltn__widget-title">Filter by Price (AED)</h4>
          <div className="price_filter">
            <div className="price_slider_amount">
              <p>{`AED ${filters.priceRange[0]} - AED ${filters.priceRange[1]}`}</p>
              <Slider
                range
                min={1000}
                max={5000000}
                step={5000}
                value={filters.priceRange}
                onChange={handleSliderChange}
                trackStyle={[{ backgroundColor: '#ff5a3c' }]}
                handleStyle={[
                  { borderColor: '#ff5a3c' },
                  { borderColor: '#ff5a3c' },
                ]}
                railStyle={{ backgroundColor: '#ddd' }}
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Bedrooms</h4>
          <ul>
            <li>
              <label className="checkbox-item">
                1 Bedroom
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('bedrooms', '1')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                2 Bedrooms
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('bedrooms', '2')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                3 Bedrooms
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('bedrooms', '3')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                4+ Bedrooms
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('bedrooms', '4')}
                />
                <span className="checkmark" />
              </label>
            </li>
          </ul>
        </div>

        {/* Bathrooms */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Bathrooms</h4>
          <ul>
            <li>
              <label className="checkbox-item">
                1 Bathroom
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('bathrooms', '1')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                2 Bathrooms
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('bathrooms', '2')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                3 Bathrooms
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('bathrooms', '3')}
                />
                <span className="checkmark" />
              </label>
            </li>
            <li>
              <label className="checkbox-item">
                4+ Bathrooms
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('bathrooms', '4')}
                />
                <span className="checkmark" />
              </label>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;