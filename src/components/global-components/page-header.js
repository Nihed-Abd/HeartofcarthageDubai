import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Page_header extends Component {

    render() {

        let HeaderTitle = this.props.headertitle;
        let publicUrl = process.env.PUBLIC_URL+'/'
        let Subheader = this.props.subheader ? this.props.subheader : HeaderTitle
		let CustomClass = this.props.customclass ? this.props.customclass : ''
        let Img = this.props.Img ? this.props.Img :'14.jpg'

        return (

		<div className={"ltn__breadcrumb-area text-left bg-overlay-white-30 bg-image "+CustomClass} data-bs-bg={publicUrl+"assets/img/CoverContact2.jpg"}>
			<div className="container">
				<div className="row">
				<div className="col-lg-12">
					
				</div>
				</div>
			</div>
		</div>


        )
    }
}


export default Page_header