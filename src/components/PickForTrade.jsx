import React, { Component } from 'react'

export class PickForTrade extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trades: this.props.trades,
            pick: this.props.pick,
            addPicksForTrade: this.props.addPicksForTrade,
            active: false
        }
    }

    componentWillReceiveProps(nextProps) {
        let { trades } = this.state
        let { pickNum } = this.state.pick.pick
        this.setState({ pick: nextProps.pick, active: trades.includes(pickNum) });
    }

    onClick = (p, pick) => {
        if (pick.pickNum !== 71) {
            this.state.addPicksForTrade(p, pick)
            this.forceUpdate()
        }
    }

    render() {
        let { pick } = this.state.pick
        let { trades } = this.state
        let { pickNum } = this.state.pick.pick
        return (
            <li className={'list-group-item text-sm-left ' + (trades.includes(pickNum) ? ' active' : '')} onClick={p => this.onClick(p, pick)}>
                {pick.pickNum}-R{pick.round}P{pick.pickNumInRound} {pick.team}
                {pick.pickNum === 71 ? ' (Forfieted)' : null}
            </li>
        )
    }
}

export default PickForTrade
