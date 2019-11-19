import React, { Component } from 'react'



export class Team extends Component {
    constructor(props) {
        super(props);

        const { pick } = this.props.pick
        this.state = {
            pick,
            playerPicked: null,
            pickWasSelected: this.props.pickWasSelected,
            forTrade: this.props.forTrade,
            userCanPick: this.props.userCanPick

        }
    }

    clicked = (pick) => {
        //TODO Forfeited picks (giants)
        if (this.state.pick.pickNum !== '71') {
            this.state.pickWasSelected(pick)
        }
    }

    componentWillReceiveProps(nextProps) {
        let { pick } = nextProps.pick
        this.setState({ pick, playerPicked: nextProps.playerPicked })
    }

    nothing = () => {

    }

    render() {
        let backgroundColor = this.state.pick.isSelected ? '#37BC9B' : 'white'
        backgroundColor = this.state.playerPicked ? '#D3D3D3' : backgroundColor
        return (
            <div>
                <li
                    className={this.state.forTrade ? "list-group-item" : "list-group-item text-sm-left py-3"}
                    onClick={this.clicked.bind(this, this.state.pick)}
                    style={{
                        backgroundColor
                    }}
                >

                    <h5> {this.state.pick.team}</h5>
                    Round {this.state.pick.round}, Pick {this.state.pick.pickNumInRound}
                    <br />
                    Pick # {this.state.pick.pickNum}
                    <br />
                    {this.state.playerPicked ? this.state.playerPicked.player.name + ', ' + this.state.playerPicked.player.position : null}
                    {this.state.pick.pickNum === '71' ? <div><b>(Forfieted)</b> Sam Beal, CB</div> : null}
                </li>

            </div>
        )
    }
}

export default Team
