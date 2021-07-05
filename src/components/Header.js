import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Header extends Component {
    render() {
        return (
            <header className="top">
                <div className="wrap">
                    <div className="header-content">
                        <div className="header-rating">
                            <div className="header-rating_tag">Rating</div>
                            <div className="header-rating_icon">★★★★★</div>
                        </div>

                        <div className="header-divider"></div>
                        <h1 className="font-effect-fire-animation">{this.props.title}</h1>

                        <h3>
                            <span>
                                Fast Delivery Hot <span className="sub-header"># Burgers</span>
                            </span>
                        </h3>

                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;