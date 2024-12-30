import React, { useState } from 'react';
import Slider from 'rc-slider';
import Select from 'react-select';
import 'rc-slider/assets/index.css';

const BannerV5 = ({ updateFilters }) => {
    const [budget, setBudget] = useState([1000, 5000000]);
    const [propertyType, setPropertyType] = useState(null);
    const [location, setLocation] = useState(null);
    const [bedrooms, setBedrooms] = useState(null);

    const locations = [
        { value: "Downtown Dubai", label: "Downtown Dubai" },
        { value: "Dubai Marina", label: "Dubai Marina" },
        { value: "Palm Jumeirah", label: "Palm Jumeirah" },
		{ value: "Jumeirah Beach Residence (JBR)", label: "Jumeirah Beach Residence (JBR)" },
        { value: "Business Bay", label: "Business Bay" },
        { value: "Jumeirah Lake Towers (JLT)", label: "Jumeirah Lake Towers (JLT)" },
        { value: "Dubai Creek Harbour", label: "Dubai Creek Harbour" },
        { value: "Al Barsha", label: "Al Barsha" },
        { value: "Dubai Silicon Oasis", label: "Dubai Silicon Oasis" },
        { value: "Dubai International Financial Centre (DIFC)", label: "Dubai International Financial Centre (DIFC)" },
        { value: "Jumeirah Village Circle (JVC)", label: "Jumeirah Village Circle (JVC)" },
        { value: "Arabian Ranches", label: "Arabian Ranches" },
        { value: "Mirdif", label: "Mirdif" },
		{ value: "The Greens", label: "The Greens" },
        { value: "The Springs", label: "The Springs" },
        { value: "Emirates Hills", label: "Emirates Hills" },
        { value: "Al Quoz", label: "Al Quoz" },
        { value: "Bluewaters Island", label: "Bluewaters Island" },
        { value: "City Walk", label: "City Walk" },
        { value: "Al Wasl", label: "Al Wasl" },
        { value: "Dubai Festival City", label: "Dubai Festival City" },
        { value: "Deira", label: "Deira" },
        { value: "Bur Dubai", label: "Bur Dubai" },
		{ value: "Dubai Sports City", label: "Dubai Sports City" },
        { value: "Motor City", label: "Motor City" },
        { value: "Discovery Gardens", label: "Discovery Gardens" },
        { value: "Al Furjan", label: "Al Furjan" },
        { value: "Dubai Hills Estate", label: "Dubai Hills Estate" },
        { value: "Al Sufouh", label: "Al Sufouh" },
		{ value: "Jumeirah Islands", label: "Jumeirah Islands" },
    ];

    const propertyTypes = [
        { value: "House", label: "House" },
        { value: "Apartment", label: "Apartment" },
        { value: "Villa", label: "Villa" },
        { value: "Townhouse", label: "Townhouse" },
    ];

    const bedroomOptions = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4+", label: "4+" },
    ];

    const handleSliderChange = (value) => {
        setBudget(value);
    };

    const handleSearch = () => {
        const filters = {
            propertyType: propertyType?.value || '',
            location: location?.value || '',
            bedrooms: bedrooms?.value || '',
            budget,
        };

        console.log("Search Filters:", filters);
        updateFilters(filters);
    };

    let publicUrl = process.env.PUBLIC_URL + '/';

    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            height: '50px',
            marginBottom: '10px',
            borderColor: state.isFocused ? '#ff5a3c' : '#ccc',
            boxShadow: state.isFocused ? '0 0 10px rgba(255, 90, 60, 0.5)' : 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px', // Adjust padding for placeholder alignment
            '&:hover': {
                borderColor: '#ff5a3c',
            },
        }),
        placeholder: (base) => ({
            ...base,
            color: '#aaa',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            margin: '0',
        }),
        singleValue: (base) => ({
            ...base,
            textAlign: 'center',
            fontWeight: 'bold',
        }),
        indicatorsContainer: (base) => ({
            ...base,
            padding: '0',
        }),
        indicatorSeparator: () => ({
            display: 'none', // Hides the line separator
        }),
        menu: (base) => ({
            ...base,
            zIndex: 5, // Ensures dropdown menu is above other elements
            marginTop: '2px',
        }),
    };
    
    

    return (
        <div className="ltn__slider-area ltn__slider-4">
            <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1 arrow-white ltn__slide-animation-active">
                <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-4 bg-image bg-overlay-theme-black-60" data-bs-bg={publicUrl + "assets/img/coverOffPlan.jpg"}>
                    <div className="ltn__slide-item-inner text-left">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 align-self-center">
                                    <div className="slide-item-car-dealer-form">
                                        <div className="ltn__car-dealer-form-tab">
                                            <div className="ltn__tab-menu text-uppercase">
                                                <div className="nav">
                                                    <a className="active show">
                                                        <i className="fas fa-home" /> Off Plan
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="tab-content">
                                                <div className="tab-pane fade active show">
                                                    <div className="car-dealer-form-inner">
                                                        <form className="ltn__car-dealer-form-box row">
                                                            {/* Property Type Filter */}
                                                            <div className="ltn__car-dealer-form-item col-lg-3 col-md-6">
                                                                <label className="form-label">Property Type</label>
                                                                <Select
                                                                    options={propertyTypes}
                                                                    value={propertyType}
                                                                    onChange={setPropertyType}
                                                                    placeholder="Select Property Type"
                                                                    styles={customSelectStyles}
                                                                    isClearable
                                                                />
                                                            </div>

                                                            {/* Location Filter */}
                                                            <div className="ltn__car-dealer-form-item col-lg-3 col-md-6">
                                                                <label className="form-label">Location</label>
                                                                <Select
                                                                    options={locations}
                                                                    value={location}
                                                                    onChange={setLocation}
                                                                    placeholder="Select Location"
                                                                    styles={customSelectStyles}
                                                                    isClearable
                                                                />
                                                            </div>

                                                            {/* Bedrooms Filter */}
                                                            <div className="ltn__car-dealer-form-item col-lg-3 col-md-6">
                                                                <label className="form-label">Bedrooms</label>
                                                                <Select
                                                                    options={bedroomOptions}
                                                                    value={bedrooms}
                                                                    onChange={setBedrooms}
                                                                    placeholder="Select Bedrooms"
                                                                    styles={customSelectStyles}
                                                                    isClearable
                                                                />
                                                            </div>

                                                            {/* Budget Slider */}
                                                            <div className="ltn__car-dealer-form-item col-lg-3 col-md-6">
                                                                <label className="form-label">Budget</label>
                                                                <p>${budget[0]} - ${budget[1]}</p>
                                                                <Slider
                                                                    range
                                                                    min={1000}
                                                                    max={5000000}
                                                                    step={5000}
                                                                    value={budget}
                                                                    onChange={handleSliderChange}
                                                                    trackStyle={[{ backgroundColor: '#ff5a3c' }]}
                                                                    handleStyle={[
                                                                        { borderColor: '#ff5a3c' },
                                                                        { borderColor: '#ff5a3c' },
                                                                    ]}
                                                                    railStyle={{ backgroundColor: '#ddd' }}
                                                                />
                                                            </div>

                                                            {/* Search Button */}
                                                            <div className="btn-wrapper text-center col-lg-12 mt-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={handleSearch}
                                                                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                                                >
                                                                    Search Properties
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerV5;