import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Social extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

	return <div className="ltn__social-media">
			<ul>
				<li><a href="https://www.facebook.com/realestatedubaihoc" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
				<li><a href="https://www.instagram.com/heart.of.carthage/" title="Instagram"><i className="fab fa-instagram" /></a></li>
				<li><a href="https://www.linkedin.com/company/heart-of-carthage-real-estate/posts/?feedView=all" title="LinkedIn"><i className="fab fa-linkedin" /></a></li>
			</ul>
		</div>
        }
}

export default Social