import React, {useState} from "react";
import PropTypes from 'prop-types'
import restaurants from "../sample-restaurants";

const Landing = (props) => {

    const [display, toggleDisplay] = useState(false)
    const [title,setTitle] = useState('')
    const [url,setUrl] = useState('')

    const displayList = () => {
        toggleDisplay(!display)
    }

    const getTitle = (restaurant) => {
        const {title, url} = restaurant
        setUrl(url)
        setTitle(title)
        toggleDisplay(false)
    }

    const goToRestaurant = () => {
        props.history.push(`/restaurant/${url}`)
    }

    return (
        <div className="restaurant_select">
            <div className="restaurant_select_top">
                <div
                    className="restaurant_select_top-header font-effect-outline"
                    onClick={displayList}
                >
                    {title || 'Choose Restaurant'}
                </div>
                <div className="arrow_picker">
                    <div className="arrow_picker-up" />
                    <div className="arrow_picker-down" />
                </div>
            </div>
            {display ? <div className="restaurant_select_bottom">
                <ul>
                    {restaurants.map(restaurant =>
                        <li
                            key={restaurant.id}
                            onClick={() => getTitle(restaurant)}
                        >
                            {restaurant.title}
                        </li>
                    )}
                </ul>
            </div> : null}
            {(title && !display) ?
                <button onClick={goToRestaurant}>Go To Restaurant</button>
                : null}
        </div>
    )
}

Landing.propTypes = {
    history: PropTypes.object
}

export default Landing