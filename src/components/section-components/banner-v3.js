import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class BannerV3 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

    return  <div className="ltn__slider-area ltn__slider-3  section-bg-2">
			  <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
			    {/* ltn__slide-item */}
			    <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60" data-bs-bg={publicUrl+"assets/img/caver1.jpg"}>
			      <div className="ltn__slide-item-inner text-center">
			        <div className="container">
			          <div className="row">
			            <div className="col-lg-12 align-self-center">
			              <div className="slide-item-info">
			                <div className="slide-item-info-inner ltn__slide-animation">
			                  <div className="slide-video mb-50 d-none">
			                    <a className="ltn__video-icon-2 ltn__video-icon-2-border" href="https://www.youtube.com/embed/tlThdr3O5Qo" data-rel="lightcase:myCollection">
			                      <i className="fa fa-play" />
			                    </a>
			                  </div>
			                  <h6 className="slide-sub-title white-color--- animated"><span><i className="fas fa-home" /></span> Heart Of Carthage</h6>
			                  <h1 className="slide-title animated ">Discover Your Dream Home <br /> in Dubai</h1>
			                  <div className="slide-brief animated">
			                    <p>Explore our exclusive collection of luxury villas, apartments, and penthouses in prime Dubai locations. Find the perfect property that matches your lifestyle and aspirations.</p>
			                  </div>
			                  <div className="btn-wrapper animated go-top">
			                    <Link to="/Search" className="theme-btn-1 btn btn-effect-1">Explore Properties</Link>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			    {/* ltn__slide-item */}
			    <div className="ltn__slide-item ltn__slide-item-2  ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60" data-bs-bg={publicUrl+"assets/img/cover2.jpeg"}>
			      <div className="ltn__slide-item-inner  text-right text-end">
			        <div className="container">
			          <div className="row">
			            <div className="col-lg-12 align-self-center">
			              <div className="slide-item-info">
			                <div className="slide-item-info-inner ltn__slide-animation">
			                  <h6 className="slide-sub-title white-color--- animated"><span><i className="fas fa-home" /></span> Heart Of Carthage</h6>
			                  <h1 className="slide-title animated ">Invest in Dubai's Premier   <br /> Properties</h1>
			                  <div className="slide-brief animated">
			                    <p>Unlock unparalleled investment opportunities with our curated selection of high-end real estate. Benefit from Dubai's thriving market and secure your future with a prestigious address.</p>
			                  </div>
			                  <div className="btn-wrapper animated go-top">
			                    <Link to="/Search" className="theme-btn-1 btn btn-effect-1">Explore Properties</Link>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			    {/* ltn__slide-item */}
			    <div className="ltn__slide-item ltn__slide-item-2  ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60" data-bs-bg={publicUrl+"assets/img/cover3.png"}>
			      <div className="ltn__slide-item-inner  text-left">
			        <div className="container">
			          <div className="row">
			            <div className="col-lg-12 align-self-center">
			              <div className="slide-item-info">
			                <div className="slide-item-info-inner ltn__slide-animation">
			                  <h6 className="slide-sub-title white-color--- animated"><span><i className="fas fa-home" /></span> Heart Of Carthage</h6>
			                  <h1 className="slide-title animated ">Experience Luxury Living  <br /> in Dubai</h1>
			                  <div className="slide-brief animated">
			                    <p>Step into a world of elegance and sophistication with our handpicked properties. Enjoy exceptional amenities and breathtaking views in the heart of Dubai's most sought-after neighborhoods.</p>
			                  </div>
			                  <div className="btn-wrapper animated go-top">
			                    <Link to="/Search" className="theme-btn-1 btn btn-effect-1">Find your home</Link>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			    {/*  */}
			  </div>
			</div>

        }
}

export default BannerV3