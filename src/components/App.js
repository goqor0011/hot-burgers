import React, {Component} from 'react';
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from '../base'
import PropTypes from 'prop-types'
import SignIn from './auth/SignIn'
import firebase from "firebase/app";

class App extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    state = {
        burgers: {},
        orders: {}
    }

    componentDidMount() {
        const {params} = this.props.match

        const localStorageRef = localStorage.getItem(params.restaurantId)
        if (localStorageRef)
            this.setState({orders: JSON.parse(localStorageRef)})


        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {params} = this.props.match
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.orders))
    }

    addBurger = (burger) => {
        const burgers = {...this.state.burgers}
        burgers[`burger${Date.now()}`] = burger
        this.setState({burgers})
    }

    loadSampleBurgers = () => {
        this.setState({burgers: sampleBurgers})
    }

    addToOrder = (key) => {
        const orders = this.state.orders
        orders[key] = orders[key] + 1 || 1
        this.setState({orders})
    }

    updateBurger = (key, updatedBurger) => {
        const burgers = {...this.state.burgers}
        burgers[key] = updatedBurger
        this.setState({burgers})
    }

    deleteBurger = (key) => {
        const burgers = {...this.state.burgers}
        burgers[key] = null
        this.setState({burgers})
    }

    deleteBurgerFromOrder = (key) => {
        const orders = {...this.state.orders}
        delete orders[key]
        this.setState({orders})
    }

    handleLogout = async () => {
        await firebase.auth().signOut()
        window.location.reload()
    }

    render() {
        return (
            <SignIn>
                <div className="burger-paradise">
                    <div className="menu-burger">
                        <Header title="Very Hot Burgers"/>
                        <ul className="burger">
                            {
                                Object.keys(this.state.burgers).map(key => {
                                    return (
                                        <Burger
                                            key={key}
                                            index={key}
                                            details={this.state.burgers[key]}
                                            addToOrder={this.addToOrder}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <Order
                        burgers={this.state.burgers}
                        orders={this.state.orders}
                        deleteBurgerFromOrder={this.deleteBurgerFromOrder}
                    />
                    <MenuAdmin burgers={this.state.burgers}
                               addBurger={this.addBurger}
                               loadSampleBurgers={this.loadSampleBurgers}
                               updateBurger={this.updateBurger}
                               deleteBurger={this.deleteBurger}
                               handleLogout={this.handleLogout}
                    />
                </div>
            </SignIn>
        );
    }
}


export default App;