import React, { Component } from 'react'

export class ExportedTrades extends Component {
    render() {
        let { tradesExecuted } = this.props
        return (
            <div>
                {
                    tradesExecuted.length !== 0 ? <b>Trades: </b> : ''
                }
                <ul>
                    {
                        tradesExecuted.map((p) => {
                            let { team1, team2, team1Picks, team2Picks } = p

                            let team1PicksRecieves = team2Picks.map((p) => {
                                let { pick } = p
                                return `Pick ${pick.pickNum} (R${pick.round}P${pick.pickNumInRound})`
                            }).join(', ')

                            let team2PicksRecieves = team1Picks.map((p) => {
                                let { pick } = p
                                return `Pick ${pick.pickNum} (R${pick.round}P${pick.pickNumInRound})`
                            }).join(', ')

                            return (
                                <li>
                                    {/* {<li className='border-bottom'>} */}
                                    <b>{team1}</b> receives {team1PicksRecieves}
                                    <br />
                                    <b>{team2}</b> receives {team2PicksRecieves}
                                    <br />
                                    <br />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ExportedTrades
