import React, {Component} from 'react';
import {connect} from 'react-redux';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {orderBookLoadedSelector, orderBookSelector, orderFillingSelector} from '../store/selectors/orders';
import {exchangeSelector, tokenNameSelector, tokenSelector} from '../store/selectors/contracts';
import {accountSelector, web3Selector} from '../store/selectors/web3';

import Spinner from './Spinner';
import { fillOrder } from '../store/interactions/orders';

const renderOrder = (order, props) => {
    const { dispatch, exchange, account, web3, token} = props;
    return (
        <OverlayTrigger key={order._id} placement='auto' 
            overlay={
                <Tooltip id={order._id}>
                    {`Click here to ${order.orderFillAction}`}
                </Tooltip>
            }
        >
            <tr key={order._id} className="order-book-order" onClick={(e) => fillOrder(dispatch, exchange, order, account, web3, token)}>
                <td>{order.tokenAmount}</td>
                <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
                <td>{order.etherAmount}</td>
            </tr>
        </OverlayTrigger>
    )
}

const showOrderBook = (props) => {
    //fetch key from props using ES6
    const {orderBook, tokenName} = props;
    return (
        <tbody>
            {orderBook.sellOrders.map((order) => renderOrder(order, props))}
            <tr>
                <th>{tokenName}</th>
                <th>{tokenName}/ETH</th>
                <th>ETH</th>
            </tr>
            {orderBook.buyOrders.map((order) => renderOrder(order, props))}
        </tbody>
    );
}

class OrderBook extends Component {
    render() {
        return (
            <div className="vertical">
                <div className="card bg-dark text-white">
                    <div className="card-header">
                        Order Book
                    </div>
                    <div className="card-body order-book">
                        <table className="table table-dark table-sm small">
                            {this.props.showOrderBook ? showOrderBook(this.props) : <Spinner type="table"/>}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    const orderBookLoaded = orderBookLoadedSelector(state);
    const orderFilling = orderFillingSelector(state);
    return {
        orderBook: orderBookSelector(state),
        showOrderBook: orderBookLoaded && !orderFilling,
        exchange: exchangeSelector(state),
        account: accountSelector(state),
        tokenName: tokenNameSelector(state),
        web3: web3Selector(state),
        token: tokenSelector(state)
    }
}

export default connect(mapStateToProps)(OrderBook);