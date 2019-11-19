import React, { Component } from 'react'
import Team from './Team';


export class RoundHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players,
            pickWasSelected: this.props.pickWasSelected,
            teams: this.props.teams,
            teamsToPlayer: this.props.teamsToPlayer,
            round: this.props.round,
            teamToDisplay: 'All',
            userCanPick: this.props.userCanPick


        }
    }


    componentWillReceiveProps(nextProps) {
        let teamToDisplay = nextProps.teamToDisplay !== null ? nextProps.teamToDisplay : null;
        this.setState({ teams: nextProps.teams, teamsToPlayer: nextProps.teamsToPlayer, teamToDisplay });
    }

    render() {
        let { round } = this.state

        return (
            <div className="accordion" id="accordionExample">
                <div className="card  mb-1">
                    <button className="card-header btn" id={"headingOne" + round} data-toggle="collapse" data-target={'#collapse' + round} aria-expanded="true"
                        aria-controls={"collapse" + round}> Round {round} </button>
                    <div
                        className={"list-group collapse " + (round === 1 ? 'show' : '')} id={"collapse" + round} aria-labelledby={"heading" + round} data-parent="#accordionExample"
                    >
                        <div
                            className="list-group"
                        >
                            <div>
                                <div
                                    className="list-group"
                                >
                                    {this.state.teams
                                        .filter(p => p.pick.round === this.state.round)
                                        .filter(p => {
                                            let { teamToDisplay } = this.state
                                            if (teamToDisplay === 'All') { return true }
                                            else { return p.pick.team === teamToDisplay }
                                        })
                                        .map((p) =>
                                            < Team

                                                userCanPick={this.state.userCanPick}
                                                pick={p}
                                                playerPicked={
                                                    this.state.players[this.state.teamsToPlayer[(p.key) - 1] - 1]
                                                }

                                                active="active"
                                                pickWasSelected={this.state.pickWasSelected}
                                                key={p.pick.pickNum}
                                            />)}
                                </ div>
                            </div>
                        </ div>
                    </div>
                </ div>
            </div>
        )
    }
}

export default RoundHeader
