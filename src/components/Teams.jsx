import React, { Component } from 'react'
// import Team from './Team';
import RoundHeader from './RoundHeader'


export class Teams extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: this.props.players,
      playerWasSelected: this.props.playerWasSelected,
      pickWasSelected: this.props.pickWasSelected,
      teams: this.props.teams,
      teamsToPlayer: this.props.teamsToPlayer,
      rounds: Array.from(new Set(this.props.teams.map(p => p.pick.round)))
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ teams: nextProps.teams, teamsToPlayer: nextProps.teamsToPlayer });
  }


  render() {
    return (
      <div className='col-6'>

        {this.state.rounds.map(round =>
          <RoundHeader
            pickWasSelected={this.state.pickWasSelected}
            teams={this.state.teams}
            players={this.state.players}
            teamsToPlayer={this.state.teamsToPlayer}
            round={round}
            key={round}
          />
        )}
      </div>


    )
  }
}

export default Teams
