import React, { Component } from 'react'



export class Team extends Component {
    constructor(props) {
        super(props);

        const { pick } = this.props.pick
        this.state = {
            pick, playerPicked: this.props.playerPicked, pickWasSelected: this.props.pickWasSelected, forTrade: this.props.forTrade
        }
    }

    clicked = (pick) => {
        //TODO Forfeited picks (giants)
        if (pick.pickNum !== 71) {
            this.state.pickWasSelected(pick)
        }
    }

    componentWillReceiveProps(nextProps) {
        let { pick } = nextProps.pick
        this.setState({ pick, playerPicked: nextProps.playerPicked })
    }

    render() {

        return (
            <div>
                <li
                    className={this.state.forTrade ? "list-group-item" : "list-group-item text-sm-left py-3"}
                    onClick={this.clicked.bind(this, this.state.pick)}
                    style={{
                        backgroundColor: this.state.pick.isSelected ? '#37BC9B' : 'white'
                    }}
                >

                    <h5> {this.state.pick.team}</h5>
                    Round {this.state.pick.round}, Pick {this.state.pick.pickNumInRound}
                    <br />
                    Pick # {this.state.pick.pickNum}
                    <br />
                    {this.state.playerPicked ? this.state.playerPicked.player.name : null}
                    {this.state.pick.pickNum === 71 ? <b>(Forfieted)</b> : null}

                </li>

            </div>
        )
    }
}

export default Team
