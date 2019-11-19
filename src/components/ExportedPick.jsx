import React, { Component } from 'react'

export class ExportedPick extends Component {
    constructor(props) {
        super(props)
        console.log("constructor")
        console.log((this.props.teamSelectedForSim))

        this.state = {
            teamSelectedForSim: this.props.teamSelectedForSim
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log("will receive props")
        console.log((this.props.teamSelectedForSim))
        this.setState({ teamSelectedForSim: nextProps.teamSelectedForSim })

    }

    render() {
        let { player, pick } = this.props.a
        // console.log('team in export: ', this.state.teamForDraftSimMode)
        if (this.props.teamForDraftSimMode === pick.team) {
            console.log('HERE')
            console.log((this.props.teamForDraftSimMode))
            return (
                < h5 className='m-2'>
                    <b>{pick.pickNum}): R{pick.round} P{pick.pickNumInRound},  <b>{pick.team}</b> : {player.name}, {player.position}</b>
                </h5 >
            )
        }
        else {
            return (

                < div >
                    {pick.pickNum}): R{pick.round} P{pick.pickNumInRound},  <b>{pick.team}</b> : {player.name}, {player.position}
                </div >
            )
        }
    }
}

export default ExportedPick
