import React, { Component } from 'react'
import Player from './Player';
import PositionButton from './PositionButton'
// import ListGroup from "../../node_modules/react-bootstrap/lib/ListGroup"


export class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players,
            playerWasSelected: this.props.playerWasSelected,
            teams: this.props.teams,
            teamsToPlayer: this.props.teamsToPlayer,
            positionFilter: Array.from(new Set(this.props.players.map(p => p.player.position))),
            uniquePositions: Array.from(new Set(this.props.players.map(p => p.player.position))).sort()


        };
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ players: nextProps.players, teamsToPlayer: nextProps.teamsToPlayer });
    }

    filterPositionOnClick = (pos, e) => {
        let pf = this.state.positionFilter

        // console.log('index of edge: ', pf.indexOf('Edge'))
        if (pf.includes(pos)) {
            pf = pf.filter(p => p !== pos)
        }
        else {
            pf.push(pos)
        }
        this.setState({ positionFilter: pf })
    }

    getPlayersArray = () => {
        let { positionFilter } = this.state

        let playersArray = this.state.players.filter(
            player => {
                return positionFilter.includes(player.player.position)
            }
        )

        return playersArray;
    }

    render() {
        let { uniquePositions } = this.state
        let playersArray = this.getPlayersArray();

        return (
            <div className="col-6"  >
                <button className='btn btn-info float-left' onClick={() => this.setState({ positionFilter: this.state.uniquePositions })}>Show All Positions</button>
                <button className='btn btn-info float-right' onClick={() => this.setState({ positionFilter: [] })}>Hide All Positions</button>
                <br /><br />
                {uniquePositions.map(pos =>

                    <PositionButton
                        filterPosition={this.filterPositionOnClick}
                        pos={pos}
                        show={this.state.positionFilter.includes(pos)}
                        key={pos}
                    />

                )}

                <div
                    className="list-group"
                >
                    <br />
                    <div>
                        {playersArray.map((p) =>
                            < Player
                                playerWasSelected={this.state.playerWasSelected}
                                player={p.player}
                                teamDraftedTo={
                                    this.state.teams[
                                    this.state.teamsToPlayer.indexOf(p.key)]
                                }
                                key={p.player.rank}
                                active="active"
                            />
                        )}

                    </div>
                </div>
            </div>
        )
    }
}

export default Players
