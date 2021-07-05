import React, {Component} from 'react';
import Shipment from "./Shipment";
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

class Order extends Component {

    static propTypes={
        burgers:PropTypes.object,
        orders:PropTypes.object,
        deleteBurgerFromOrder:PropTypes.func
    }

    renderOrder = (key) => {
        const burger = this.props.burgers[key]
        const count = this.props.orders[key]
        const isAvailable = burger && burger.status === 'available'
        const transitionOptions = {
            classNames:'order' ,
            key ,
            timeout:{enter: 500, exit: 500}
        }

        if (!burger) return null

        return isAvailable ?
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                <span>
                    <TransitionGroup component='span' className="count">
                        <CSSTransition classNames="count" key={count} timeout={{enter:500,exit:500}}>
                            <span>{count} </span>
                        </CSSTransition>
                    </TransitionGroup>
                     <span> {burger.name} </span>
                    <span> {count * burger.price} $</span>
                <button
                    className="cancelItem"
                    onClick={() => this.props.deleteBurgerFromOrder(key)}
                >&times;</button>
                </span>
                </li>
            </CSSTransition> :
            <CSSTransition {...transitionOptions}>
                <li key={key} className="unavailable">
                    Sorry {burger ? burger.name : 'burger'} Temporarily Not
                </li>
            </CSSTransition>
    }

    render() {
        const ordersId = Object.keys(this.props.orders)
        const total = ordersId.reduce(((prevTotal, key) => {
            const burger = this.props.burgers[key]
            const count = this.props.orders[key]
            const isAvailable = burger && burger.status === 'available'
            return isAvailable ? prevTotal + burger.price * count : prevTotal
        }), 0)


        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <TransitionGroup component='ul' className="order">
                    {ordersId.map(this.renderOrder)}
                </TransitionGroup>
                {
                    total > 0 ? <Shipment total={total}/> :
                        <div className="nothingSelected">
                            Choose burger and add on order
                        </div>
                }

            </div>
        );
    }
}

export default Order;