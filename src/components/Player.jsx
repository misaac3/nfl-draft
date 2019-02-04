import React, { Component } from 'react'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { player: this.props.player, teamDraftedTo: this.props.teamDraftedTo }
  }

  playerClick = (rank) => {
    this.props.playerWasSelected(rank)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ player: nextProps.player, teamDraftedTo: nextProps.teamDraftedTo })
  }


  render() {
    return (
      <li
        className="list-group-item"
        id={this.props.rank}
        onClick={this.playerClick.bind(this, this.props.player)}
        style={{
          backgroundColor: this.state.player.isSelected ? '#37BC9B' : 'white',
          position: 'static',
        }}
      >

        <h4>{this.state.player.rank}.) {this.state.player.name}</h4>
        {this.state.player.school}, {this.state.player.position}
        <br />
        {this.state.teamDraftedTo ? this.state.teamDraftedTo.pick.team : null}

      </li>
    )
  }
}

export default Player
