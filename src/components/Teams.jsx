import React, { Component } from 'react'
// import Team from './Team';
import RoundHeader from './RoundHeader'
import TeamSelect from './TeamSelect'


export class Teams extends Component {

  constructor(props) {
    super(props);

    this.props.hasOwnProperty('forTrade')

    this.state = {
      forTrade: this.props.hasOwnProperty('forTrade'),
      players: this.props.players,
      playerWasSelected: this.props.playerWasSelected,
      pickWasSelected: this.props.pickWasSelected,
      teams: this.props.teams,
      teamsToPlayer: this.props.teamsToPlayer,
      rounds: Array.from(new Set(this.props.teams.map(p => p.pick.round))),
      teamToDisplay: 'All',
      userCanPick: this.props.userCanPick,

      teamForDraftSimMode: this.props.teamForDraftSimMode,
      playersChosenByUser: this.props.playersChosenByUser


    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ teams: nextProps.teams, teamsToPlayer: nextProps.teamsToPlayer });
  }

  onSelectChange = () => {
    console.log('select changed')
    let teamToDisplay = document.querySelector('#teamSelect') !== null ? document.querySelector('#teamSelect').value : 'All'
    this.setState({ teamToDisplay })
  }

  render() {
    // console.log(this.props.teamForDraftSimMode)
    return (
      <div className={this.state.forTrade ? 'col-12' : 'col-6 text-small'}>
        <div>
          <b>{this.props.teamForDraftSimMode}</b>
        </div>
        {this.state.playersChosenByUser.map(p => {
          return (<div>{p.name}, {p.position}, {p.school},</div>)
        })}
        {this.state.forTrade ? null : <TeamSelect onSelectChange={this.onSelectChange} />}

        {this.state.rounds.map(round =>
          <div className="" key={round}>
            <RoundHeader
              forTrade={this.state.forTrade}
              pickWasSelected={this.state.pickWasSelected}
              teams={this.state.teams}
              players={this.state.players}
              teamsToPlayer={this.state.teamsToPlayer}
              round={round}
              key={round}
              teamToDisplay={this.state.teamToDisplay}

            />
          </div>
        )}

        {this.state.forTrade ?
          (this.state.rounds.map(round =>
            <div className="">

              <RoundHeader
                forTrade={this.state.forTrade}
                pickWasSelected={this.state.pickWasSelected}
                teams={this.state.teams}
                players={this.state.players}
                teamsToPlayer={this.state.teamsToPlayer}
                round={round}
                key={round}
                teamToDisplay={this.state.teamToDisplay}

              />
            </div>)
          ) : null}
      </div>


    )
  }
}

export default Teams
