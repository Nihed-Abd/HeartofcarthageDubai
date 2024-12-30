import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class SearchForm extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

    return <div className="ltn__car-dealer-form-area mt--65 mt-120 pb-115---">
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-12">
			        <div className="ltn__car-dealer-form-tab">
						<div className="ltn__tab-menu  text-uppercase">
						<div className="nav">
							<a className="active show" data-bs-toggle="tab" href="#ltn__form_tab_1_1"><i className="fas fa-home" />Off Plan</a>
							<a data-bs-toggle="tab" href="#ltn__form_tab_1_2" ><i className="fas fa-shopping-cart" />Buy</a>
							<a data-bs-toggle="tab" href="#ltn__form_tab_1_3" ><i className="fas fa-key" />Rent</a>

						</div>
						</div>
						<div className="tab-content">
						<div className="tab-pane fade active show" id="ltn__form_tab_1_1">
							<div className="car-dealer-form-inner">
							<form action="#" className="ltn__car-dealer-form-box row">
							<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Property Type</option>
									<option>House</option>
									<option>Apartment</option>
									<option>Townhouse</option>
									<option>Villa</option>
									<option>Studio</option>
								</select>
								</div> 
								<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Location</option>
									<option>Dubai Marina</option>
									<option>Palm Jumeirah</option>
									<option>Jumeirah Beach Residence (JBR)</option>
									<option>Business Bay</option>
									<option>Dubai Creek Harbour</option>
									<option>Al Barsha</option>
									<option>Dubai Silicon Oasis</option>
									<option>Dubai International Financial Centre (DIFC)</option>
									<option>Jumeirah Village Circle (JVC)</option>
									<option>Arabian Ranches</option>
									<option>Mirdif</option>
									<option>The Greens</option>
									<option>The Springs</option>

								</select>
								</div> 
								<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Number Bed Rooms</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4+</option>
								</select>
								</div> 
								
								
								<div className="btn-wrapper text-center">
									{/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
									<Link to="/Search" className="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</Link>
								</div>
							</form>
							</div>
						</div>
						<div className="tab-pane fade" id="ltn__form_tab_1_2">
							<div className="car-dealer-form-inner">
							<form action="#" className="ltn__car-dealer-form-box row">
								<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Property Type</option>
									<option>House</option>
									<option>Apartment</option>
									<option>Townhouse</option>
									<option>Villa</option>
									<option>Studio</option>
								</select>
								</div> 
								<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Location</option>
									<option>Dubai Marina</option>
									<option>Palm Jumeirah</option>
									<option>Jumeirah Beach Residence (JBR)</option>
									<option>Business Bay</option>
									<option>Dubai Creek Harbour</option>
									<option>Al Barsha</option>
									<option>Dubai Silicon Oasis</option>
									<option>Dubai International Financial Centre (DIFC)</option>
									<option>Jumeirah Village Circle (JVC)</option>
									<option>Arabian Ranches</option>
									<option>Mirdif</option>
									<option>The Greens</option>
									<option>The Springs</option>

								</select>
								</div> 
								<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Number Bed Rooms</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4+</option>
								</select>
								</div> 
								
								<div className="btn-wrapper text-center">
									{/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
									<Link to="/Search" className="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</Link>
								</div>
								</form>
							</div>
						</div>
						<div className="tab-pane fade" id="ltn__form_tab_1_3">
							<div className="car-dealer-form-inner">
							<form action="#" className="ltn__car-dealer-form-box row">
							<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Property Type</option>
									<option>House</option>
									<option>Apartment</option>
									<option>Townhouse</option>
									<option>Villa</option>
									<option>Studio</option>
								</select>
								</div> 
								<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Location</option>
									<option>Dubai Marina</option>
									<option>Palm Jumeirah</option>
									<option>Jumeirah Beach Residence (JBR)</option>
									<option>Business Bay</option>
									<option>Dubai Creek Harbour</option>
									<option>Al Barsha</option>
									<option>Dubai Silicon Oasis</option>
									<option>Dubai International Financial Centre (DIFC)</option>
									<option>Jumeirah Village Circle (JVC)</option>
									<option>Arabian Ranches</option>
									<option>Mirdif</option>
									<option>The Greens</option>
									<option>The Springs</option>

								</select>
								</div> 
								<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Number Bed Rooms</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4+</option>
								</select>
								</div> 
								<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-4 col-md-6">
								<select className="nice-select">
									<option>Sub Location</option>
									<option>Bayonne</option>
									<option>Greenville</option>
									<option>Manhattan</option>
									<option>Queens</option>
									<option>The Heights</option>
									<option>Upper East Side</option>
									<option>West Side</option>
								</select>
								</div> 
								
								<div className="btn-wrapper text-center">
									{/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
									<Link to="/Search" className="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</Link>
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
        }
}

export default SearchForm