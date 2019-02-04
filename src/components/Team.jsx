import React, { Component } from 'react'



export class Team extends Component {
    constructor(props) {
        super(props);

        const { pick } = this.props.pick
        this.state = {
            pick, playerPicked: this.props.playerPicked, pickWasSelected: this.props.pickWasSelected
        }
    }

    clicked = (pick) => {
        console.log('team clicked')
        this.state.pickWasSelected(pick)
            
    }

    componentWillReceiveProps(nextProps) {
        let { pick } = nextProps.pick
        this.setState({ pick, playerPicked: nextProps.playerPicked })
    }

    render() {
        return (
            <div>
                <li
                    className="list-group-item"
                    onClick={this.clicked.bind(this, this.state.pick)}
                    style={{
                        backgroundColor: this.state.pick.isSelected ? '#37BC9B' : 'white'
                    }}
                >

                    {/* <h4> <img src={ATL} alt='ARZ' width="10%" height='10%' /> {this.state.pick.team}</h4> */}
                    <h4> {this.state.pick.team}</h4>
                    Round {this.state.pick.round}, Pick {this.state.pick.pickNumInRound}
                    <br />
                    Pick # {this.state.pick.pickNum}
                    <br />
                    {this.state.playerPicked ? this.state.playerPicked.player.name : null}

                </li>

            </div>
        )
    }
}

export default Team
