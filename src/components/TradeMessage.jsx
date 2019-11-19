import React, { Component } from 'react'

export class TradeMessage extends Component {
    render() {
        return (
            <div>
                <div
                    style={{ display: 'none' }}
                    id='tradeMessage'>
                    {this.props.message}
                    </div>

            </div>
        )
    }
}

export default TradeMessage
