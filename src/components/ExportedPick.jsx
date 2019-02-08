import React, { Component } from 'react'

export class ExportedPick extends Component {
    render() {
        let { player, pick } = this.props.a
        return (
            <div>
                {pick.pickNum}): R{pick.round} P{pick.pickNumInRound},  <b>{pick.team}</b> : {player.name}, {player.position}
            </div>
        )
    }
}

export default ExportedPick
