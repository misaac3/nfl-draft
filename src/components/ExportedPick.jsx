import React, { Component } from 'react'

export class ExportedPick extends Component {
    render() {
        let { player, pick } = this.props.a
        return (
            <div>
                R{pick.round} P{pick.pickNumInRound}, (Pick {pick.pickNum}) <b>{pick.team}</b> : {player.name}, {player.position}
            </div>
        )
    }
}

export default ExportedPick
