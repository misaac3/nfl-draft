import React, { Component } from 'react'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onRightClick: this.props.onRightClick,
      player: this.props.player,
      teamDraftedTo: this.props.teamDraftedTo,
      isPicked: this.props.isPicked,
      userCanPick: this.props.userCanPick

    }
  }

  playerClick = (player) => {
    console.log(player)
    this.props.playerWasSelected(player)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ player: nextProps.player, teamDraftedTo: nextProps.teamDraftedTo, isPicked: nextProps.isPicked })
  }

  onRightClick = (e, player) => {
    e.persist();
    this.state.onRightClick(e, player);
  }

  render() {
    let backgroundColor = this.state.isPicked ? 'grey' : 'white'
    backgroundColor = this.state.player.isSelected ? '#37BC9B' : backgroundColor
    return (
      <li
        className="list-group-item text-sm-left"
        id={this.props.rank}
        onClick={this.playerClick.bind(this, this.props.player)}
        onContextMenu={(e) => this.onRightClick(e, this.props.player)}
        style={{
          backgroundColor
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
