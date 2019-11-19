import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PickForTrade from './PickForTrade'
import TeamSelect from './TeamSelect'

import tradevalues from '../tradevalues.json'



export class TradeModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            executeTrade: this.props.executeTrade,
            teams: this.props.teams,
            team1: null,
            team2: null,
            trades: []
        }
    }

    executeTrade = () => {
        let { trades, team1, team2 } = this.state

        if (team1 !== null && team2 !== null && team1 !== team2) {
            document.querySelector('#tradeFail').style.display = 'none'
            document.querySelector('#tradeSuccess').style.display = 'block'
            this.state.executeTrade(trades, team1, team2)
        }
        else {
            document.querySelector('#tradeSuccess').style.display = 'none'
            document.querySelector('#tradeFail').style.display = 'block'
        }
    }

    handleSelectChange = (e, teamNum) => {
        let value = e.target.value === 'Select' ? null : e.target.value
        teamNum === 1 ? this.setState({ team1: value }) : this.setState({ team2: value })
    }

    addPicksForTrade = (ele, pick) => {
        let trades = this.state.trades
        // console.log(ele.target)
        if (this.state.team1 === null) {
            let selectElement = document.querySelector('#teamSelect1')
            selectElement.value = pick.team
            this.setState({ team1: pick.team })
        }
        else if (this.state.team2 === null) {
            let selectElement = document.querySelector('#teamSelect2')
            selectElement.value = pick.team
            this.setState({ team2: pick.team })
        }


        // console.log('click', trades.includes(pick.pickNum), typeof (trades), pick)

        if (trades.includes(pick.pickNum)) {
            trades.splice(trades.indexOf(pick.pickNum), 1)
        }
        else {
            trades.push(pick.pickNum)
            trades.sort()
            // console.log('added to trades', pick.pickNum)
        }
        // console.log('trades')
        this.setState({ trades })
    }

    totalValue = (teamNum) => {
        let total = 0;
        let currTeam = teamNum === 1 ? this.state.team1 : this.state.team2
        this.state.trades
            .filter(p => {
                let team = this.state.teams[p - 1]
                return (team.pick.team === currTeam)
            })
            .map(p => {
                let { pickNum } = this.state.teams[p - 1].pick
                total += tradevalues[pickNum - 1]
                return null
            })
        return total
    }


    render() {
        return ReactDOM.createPortal(
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    display: 'grid',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                }}
            // onClick={this.props.onClose}
            >
                <div
                    style={{
                        padding: 20,
                        background: '#fff',
                        borderRadius: '2px',
                        display: 'inline-block',
                        minHeight: '150px',
                        margin: '2rem',
                        position: 'relative',
                        minWidth: '300px',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                        justifySelf: 'center',
                    }}
                >
                    <div className="mb-2 mt-2">
                        <nav className=" text-center navbar ">
                            <h3>Make A Trade!</h3>


                        </nav>
                    </div>

                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 pre-scrollable" >
                                <div className="list-group">
                                    {this.state.teams
                                        .filter(p => {
                                            if (this.state.team1 && this.state.team2) {

                                                return ((p.pick.team === this.state.team1) || (p.pick.team === this.state.team2))
                                            }
                                            else {
                                                return true
                                            }
                                        })
                                        .map(p => {
                                            return <PickForTrade trades={this.state.trades} pick={p} addPicksForTrade={this.addPicksForTrade} />
                                        })
                                    }


                                </div>
                            </div>
                            <div className="col-6 pre-scrollable">
                                <div className="ml-2 mr-2">
                                    <div className="row">
                                        <TeamSelect forTrade={true} tradeTeam={1} onSelectChange={p => this.handleSelectChange(p, 1)} />
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        {this.state.trades
                                            .filter(p => {
                                                let team = this.state.teams[p - 1]
                                                return (team.pick.team === this.state.team1)
                                            })
                                            .map(p => {
                                                let { pickNum, round, pickNumInRound } = this.state.teams[p - 1].pick
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        {pickNum}, R{round}, P{pickNumInRound}
                                                        <span className="badge badge-primary badge-pill float-right">Value: {tradevalues[pickNum - 1]}</span>
                                                    </li>)
                                            })}
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span className="badge badge-primary badge-pill float-right">Total Value: {this.totalValue(1)}</span>

                                        </li>
                                    </ul>
                                </div>

                                <hr />

                                <div className="ml-2 mr-2 mt-2">
                                    <div className="row">
                                        <TeamSelect forTrade={true} tradeTeam={2} onSelectChange={p => this.handleSelectChange(p, 2)} />
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        {this.state.trades
                                            .filter(p => {
                                                let team = this.state.teams[p - 1]
                                                return (team.pick.team === this.state.team2)
                                            })
                                            .map(p => {
                                                let { pickNum, round, pickNumInRound } = this.state.teams[p - 1].pick
                                                return (
                                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                                        {pickNum}, R{round}, P{pickNumInRound}
                                                        <span class="badge badge-primary badge-pill float-right">Value: {tradevalues[pickNum - 1]}</span>
                                                    </li>)
                                            })}
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span className="badge badge-primary badge-pill float-right">Total Value: {this.totalValue(2)}</span>

                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    < hr />
                    <div className="col-12">
                        <div className="row">
                            <div>
                                <div className="float-left text-sm mr-2">
                                    {`${this.state.team1 ? this.state.team1.split(' ')[this.state.team1.split(' ').length - 1] + " Give up:" : ''}`} <span className="badge badge-primary badge-pill ">Total Value: {this.totalValue(1)}</span>
                                </div>
                                <div className="float-right">
                                    {`${this.state.team2 ? this.state.team2.split(' ')[this.state.team2.split(' ').length - 1] + " Give up:" : ''}`}<span className="badge badge-primary badge-pill ">Total Value: {this.totalValue(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <button
                                onClick={this.props.onClose}
                                className='btn btn-warning col-6'
                            >
                                Close
                    </button>
                            <button
                                style={{ float: 'right' }}
                                onClick={this.executeTrade}
                                className='btn btn-warning col-6'
                            >
                                Execute Trade
                    </button>
                        </div>

                    </div>
                    <br />
                    <div
                        className="alert alert-success"
                        style={{ display: 'none' }}
                        id='tradeSuccess'>
                        Trade Executed!
                    </div>
                    <div
                        className="alert alert-danger"
                        style={{ display: 'none' }}
                        id='tradeFail'>
                        Make sure there are two teams selected!
                    </div>


                    <hr />
                    <div>
                        Value Refers to <a target="_blank" rel="noopener noreferrer" href='https://cdn1.vox-cdn.com/imported_assets/2183087/trade-value-chart.jpg'>NFL Draft Trade Value Chart</a>
                    </div>


                </div>
            </div >,


            document.querySelector('#modal-trades')


        )
    }
}

export default TradeModal
