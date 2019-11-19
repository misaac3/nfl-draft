import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import Teams from "./components/Teams.jsx";
import ExportModal from "./components/ExportModal.jsx";
import TradeModal from './components/TradeModal.jsx';
import SelectTeamModal from './components/SelectTeamModal'

// import teamorder from './teamsorder.json';
// import teamorder from './fullteamorder.json';
import teamorder from './tankathon_full_draft_2020.json'

import rankings from './2020_drafttek_bigboard.json';
// import rankings from './Drafttek-Feb3-bigboard.json'

import teamneeds from './teamneeds.json'
// import teamneeds from './teamneedswtop.json'

import tradevalues from './tradevalues.json'

var id = -1

class App extends Component {
  constructor(props) {

    const teams = teamorder.map(({ team, pickNum, round, pickNumInRound }) => {

      return { pick: { team, pickNum, round, pickNumInRound, isSelected: false, isPicked: false, playerPicked: null }, key: pickNum };
    });

    let teamsToPlayer = []
    teams.forEach(({ pick }) => {
      teamsToPlayer[pick.pickNum - 1] = null;
    });
    super(props);

    const players = rankings.map(({ rank, name, position, school }) => {
      return { player: { rank, name, position, school, isSelected: false, teamDraftedTo: null }, key: rank }
    });

    this.state = {
      playerSelected: null,
      pickSelected: null,
      teamsToPlayer,
      teams,
      players,
      tradesExecuted: [],
      showExportModal: false,
      showTradeModal: false,
      showTeamModal: false,
      currSimulatedPickNum: 0,
      draftSimulatorMode: false,
      teamForDraftSimMode: null,
      userCanPick: false,
      playersChosenByUser: []
    }
  }

  playerWasSelected = (selectedPLayer) => {
    // if (!this.state.draftSimulatorMode) {
    console.log(selectedPLayer)
    let currentlySelected = -1;
    if (this.state.playerSelected !== null) {
      currentlySelected = this.state.playerSelected.key
    }

    let { rank } = selectedPLayer
    if (currentlySelected !== rank) {
      let players = this.state.players;

      let newPlayerSelected = players[rank - 1]


      newPlayerSelected.player.isSelected = true;
      players[rank - 1] = newPlayerSelected;
      let ttp = this.state.teamsToPlayer
      if (this.state.playerSelected) {
        let oldPlayerSelcted = players[this.state.playerSelected.key - 1].player
        oldPlayerSelcted.isSelected = false;
        players[this.state.playerSelected - 1] = oldPlayerSelcted;
      }


      if (this.state.pickSelected != null) {
        console.log('both a player and pick are selected')

        let pickSelectedNum = this.state.pickSelected.key

        if (ttp.indexOf(rank) !== -1) {
          let ind = ttp.indexOf(rank)
          ttp[ind] = null
        }

        ttp[pickSelectedNum - 1] = rank

        /*---------unselect pick and players------------------- */

        newPlayerSelected.player.isSelected = false;
        players[rank - 1] = newPlayerSelected;

        let pickNum = pickSelectedNum
        let teams = this.state.teams;
        let team = teams[pickNum - 1]
        team.pick.isSelected = false;
        teams[pickNum - 1] = team;
        console.log("teamsToPlayers updated")

        if (this.state.draftSimulatorMode) {
          let ps = this.state.playersChosenByUser;
          ps.push(selectedPLayer)
          this.setState({ teamsToPlayer: ttp, players, teams, playerSelected: null, pickSelected: null, playersChosenByUser: ps })
        }


        else {
          this.setState({ teamsToPlayer: ttp, players, teams, playerSelected: null, pickSelected: null })
        }
      }

      else { //A team wasn't also selected so update newly selected player
        this.setState({ playerSelected: newPlayerSelected })
      }

    }
    // }
    if (this.state.draftSimulatorMode) {

      this.autoPick()
    }

  }

  pickWasSelected = (selectedPick) => {
    if (!this.state.draftSimulatorMode) {
      console.log(selectedPick)
      let { pickNum } = selectedPick

      let currentlySelected = -1

      if (this.state.pickSelected !== null) {
        currentlySelected = this.state.pickSelected.key
      }
      if (pickNum !== currentlySelected) {
        let ttp = this.state.teamsToPlayer

        let { pickNum } = selectedPick
        let teams = this.state.teams;



        let team = teams[pickNum - 1]

        team.pick.isSelected = true;
        teams[pickNum - 1] = team;
        if (this.state.pickSelected != null) {

          let oldTeam = teams[this.state.pickSelected.pick.pickNum - 1]
          oldTeam.pick.isSelected = false;
          teams[this.state.pickSelected.pickNum - 1] = oldTeam
        }
        /* -------------------------------------------- */
        // This is for handling when both a player and a pick are selected


        let players = this.state.players;
        if (this.state.playerSelected) {
          team.pick.playerPicked = this.state.playerSelected.player;
          teams[pickNum - 1] = team;

          //teamToPlayer Stuff

          let playerSelectedRank = this.state.playerSelected.key
          if (ttp.includes(playerSelectedRank)) {
            let ind = ttp.indexOf(playerSelectedRank)
            ttp[ind] = null
          }
          ttp[selectedPick.pickNum - 1] = this.state.playerSelected.player.rank

          let playerSelected = players[playerSelectedRank - 1]

          playerSelected.player.isSelected = false;
          playerSelected.player.isSelected = false;
          players[playerSelectedRank - 1] = playerSelected


          team.pick.isSelected = false;
          teams[pickNum - 1] = team;
          console.log("teamsToPlayers updated")
          this.setState({ teamsToPlayer: ttp, players, teams, playerSelected: null, pickSelected: null })

        }

        else {
          this.setState({ pickSelected: team })
        }
      }
      else {
        console.log('clicked on selected player')
      }
    }


  }

  exportToText = () => {
    let ttp = this.state.teamsToPlayer
    let teams = this.state.teams
    let players = this.state.players

    let arr = []
    if (ttp) {

      ttp.forEach((p, i) => {

        if (p) {
          arr.push({ pick: teams[i].pick, player: players[p - 1].player })
        }
      })
    }
    return arr
  }

  tradeModalClick = () => {
    this.setState({ showTradeModal: !this.state.showTradeModal })
  }

  handleCloseTradeModal = () => {
    this.setState({ showTradeModal: !this.state.showTradeModal })

  }

  exportModalClick = () => {
    this.setState({ showExportModal: !this.state.showExportModal })
  }
  handleCloseExportModal = () => {
    this.setState({ showExportModal: false })
    document.querySelector('#copyMessage').style.display = 'none'
  }

  teamsModalClick = () => {
    this.setState({ showTeamModal: !this.state.showExpshowTeamModalortModal })
  }
  handleCloseTeamModal = () => {
    this.setState({ showTeamModal: false, draftSimulatorMode: false })
  }

  executeTrade = (trades, team1, team2) => {

    let teams = this.state.teams;
    let ttp = this.state.teamsToPlayer

    let team1Picks = this.state.teams.filter(p => {
      return ((p.pick.team === team1) && (trades.includes(p.pick.pickNum)))
    });

    let team2Picks = this.state.teams.filter(p => {
      return ((p.pick.team === team2) && (trades.includes(p.pick.pickNum)) && (!team1Picks.includes(p)))
    })


    let tradesExecuted = this.state.tradesExecuted
    // let newTrade = {team1, team2, team1Picks, team2Picks}
    tradesExecuted.push({ team1, team2, team1Picks, team2Picks })



    team1Picks.forEach(p => {
      p.pick.team = team2
      let { pickNum } = p.pick
      teams[pickNum - 1] = p
    })

    team2Picks.forEach(p => {
      p.pick.team = team1
      let { pickNum } = p.pick
      teams[pickNum - 1] = p
    })

    trades.forEach(pickNum => {
      ttp[pickNum - 1] = null
    })

    this.setState({ teams, teamsToPlayer: ttp, tradesExecuted })
  }

  onRightClick = (e, player) => {
    if (!this.state.draftSimulatorMode) {
      e.preventDefault();
      console.log('right click', e.currentTarget.id, player)

      let ttp = this.state.teamsToPlayer;
      let nextPick = -1;
      for (let i = 0; i < ttp.length; i++) {
        if (ttp[i] === null) {
          nextPick = i;
          break;
        }
      }

      console.log('nextPick; ', nextPick)

      // this.setState({ playerSelected: player });

      // this.pickWasSelected(this.state.teams[nextPick].pick)
      // this.playerWasSelected(player)  

      ttp[nextPick] = player.rank
      this.setState({ teamsToPlayer: ttp })
    }
  }


  autoPick = () => {

    let pickNum = this.state.currSimulatedPickNum;
    let isPaused = false;
    let ttp = this.state.teamsToPlayer;
    console.log('pickNum after autoPick called: ', pickNum + 1)
    id = setInterval(() => {

      if (pickNum >= ttp.length - 1 || this.state.teams[pickNum] === undefined) {
        clearInterval(id)

      }


      console.log('pickNum: ', pickNum + 1)
      if (pickNum === '70') {
        alert("Pick 71")
      }

      let newttp = ttp
      if (pickNum !== 71 - 1) {
        newttp = this.simulatePick(pickNum++);

      }
      //Forfeited Pick 
      else {
        pickNum++
      }
      if (this.state.teams[pickNum] !== undefined) {
        console.log("bools: ", pickNum >= ttp.length, pickNum >= 500, this.state.teams[pickNum].pick.team === this.state.teamForDraftSimMode);
        if (pickNum >= ttp.length || pickNum >= 500 || this.state.teams[pickNum].pick.team === this.state.teamForDraftSimMode) {

          if (pickNum !== 70) {
            clearInterval(id)
            this.promptUserPick(this.state.teams[pickNum].pick)
          }
          else {
            // pickNum++;
          }
        }
      }

      this.setState({ teamsToPlayer: newttp, currSimulatedPickNum: (pickNum + 1) })

      console.log('----------------------------------------------------------------')

    }, 50);
  }

  simulatePick = (pickNum) => {
    let ttp = this.state.teamsToPlayer;
    // let players = this.state.players;
    let teams = this.state.teams;
    let team = teams[pickNum].pick.team
    console.log(team, teamneeds[team]['primary'], teamneeds[team]['secondary'], teamneeds[team]['tertiary'], teamneeds[team]['none'])
    console.log(team)
    let p = null
    if (teamneeds[team]['top'].length > 0) {
      return this.findPlayerToPick(pickNum, 'top')
    }
    else if (teamneeds[team]['primary'].length > 0) {

      return this.findPlayerToPick(pickNum, 'primary')
    }
    else if (teamneeds[team]['secondary'].length > 0) {
      return this.findPlayerToPick(pickNum, 'secondary')
    }
    else if (teamneeds[team]['tertiary'].length > 0) {
      return this.findPlayerToPick(pickNum, 'tertiary')
    }
    else {
      return this.findBPA(pickNum)
    }

    return ttp


  }

  findBPA = (pickNum) => {
    let ttp = this.state.teamsToPlayer;
    let players = this.state.players;
    let teams = this.state.teams;
    let team = teams[pickNum].pick.team
    console.log('BPA');
    let playerToSelect = players
      .filter((p) => !ttp.includes(p.player.rank))
      .sort((a, b) => a.player.rank > b.player.rank ? a : b)
      .slice(10)
    [Math.floor(Math.random() * 10)]

    console.log(playerToSelect.player.name, playerToSelect.player.position)
    ttp[pickNum] = playerToSelect.player.rank

    return ttp
  }

  findPlayerToPick = (pickNum, need) => {
    let ttp = this.state.teamsToPlayer;
    let players = this.state.players;
    let teams = this.state.teams;
    let team = teams[pickNum].pick.team

    let exponent = Math.random()

    let playersAtPos =
      players
        .filter(p => (teamneeds[team][need].includes(p.player.position) && !ttp.includes(p.key)))

    let numPlayersConsidered = 3
    let playersToSelect = playersAtPos.slice(0, numPlayersConsidered + 1)

    if (playersToSelect.length < 1) {
      playersToSelect = players
        .filter(p => !ttp.includes(p.key))
    }
    let playersToSelectValues = playersToSelect.map(p => {
      if (p.key < tradevalues.length) {
        return Math.pow(tradevalues[p.key - 1], exponent)
      }
      else {
        return 1
      }
    })
    let totalValue = playersToSelectValues.reduce((a, b) => a + b, 0);
    let weights = playersToSelectValues.map(val => val / totalValue)


    let randInd = Math.floor(Math.random() * numPlayersConsidered)
    // let playerToSelect = playersToSelect[randInd]

    let playerToSelect = this.getRandom(weights, playersToSelect)

    // console.log(playersToSelect, playersToSelectValues, weights)
    console.log(playersToSelect, weights)

    console.log(playerToSelect.player.name, playerToSelect.player.position)
    // console.log(playerToSelect.player.name)
    let indToRemove = teamneeds[team][need].indexOf(playerToSelect.player.position)
    teamneeds[team][need].splice(indToRemove, 1)
    ttp[pickNum] = playerToSelect.player.rank
    return ttp

  }

  getRandom = (weights, players) => {
    let num = Math.random(), s = 0, lastIndex = weights.length - 1;
    for (var i = 0; i < lastIndex; ++i) {
      s += weights[i];
      if (num < s) {
        return players[i];
      }
    }

    return players[lastIndex];
  };

  // pauseAutoPick = () => {

  // }

  // stopAutoPick = () => {
  //   clearInterval(id)
  // }

  teamSelectedForSim = (teamName) => {
    console.log(teamName)
    this.setState({ showTeamModal: false, teamForDraftSimMode: teamName })
    this.autoPick()

  }

  promptUserPick = (selectedPick) => {
    let { pickNum } = selectedPick
    if (pickNum !== 71) {
      let currentlySelected = -1

      if (this.state.pickSelected !== null) {
        currentlySelected = this.state.pickSelected.key
      }
      if (pickNum !== currentlySelected) {
        let ttp = this.state.teamsToPlayer
        let { pickNum } = selectedPick
        let teams = this.state.teams;
        let team = teams[pickNum - 1]
        team.pick.isSelected = true;
        teams[pickNum - 1] = team;


        this.setState({ pickSelected: team })

      }
    }
  }


  render() {
    // console.log(this.state.teamForDraftSimMode)

    return (
      <div
        style={{
          height: '100%',
          backgroundColor: (this.state.draftSimulatorMode ? '#ADD8E6' : 'white')

        }}
        className="container panel">
{/*
        <button className='btn btn-primary mb-3' onClick={p => this.autoPick()}>Click to auto pick</button>

        
        <button className='btn btn-primary mb-3' onClick={p => {
          clearInterval(id)
          this.setState({ currSimulatedPickNum: this.state.currSimulatedPickNum - 1 })
        }}>
          Click to STOP  auto pick</button>
        <button
          className='btn btn-info'
          onClick={p => this.setState({ draftSimulatorMode: !this.state.draftSimulatorMode, showTeamModal: true })}

        >Draft Simulator  Mode</button>

        */}

        < Header />
        <div className='col-12'>
          <div className='row'>
            <button
              onClick={this.tradeModalClick}
              style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className='btn-lg btn-success col-6'
            >
              Make A Trade
          </button>

            {this.state.showTradeModal ? (
              <TradeModal
                executeTrade={this.executeTrade}
                pickWasSelected={this.pickWasSelected}
                teams={this.state.teams}
                players={this.state.players}
                teamsToPlayer={this.state.teamsToPlayer}
                onClose={this.handleCloseTradeModal}
                arr={this.exportToText()}>
              </TradeModal>
            ) : null}

            <button
              onClick={this.exportModalClick}
              style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className='btn-lg btn-success col-6'
            >

              Export to Text
          </button>

            {this.state.showExportModal ? (
              <ExportModal

                onClose={this.handleCloseExportModal}
                arr={this.exportToText()}
                tradesExecuted={this.state.tradesExecuted}
                teamForDraftSimMode={this.state.teamForDraftSimMode}
              >
              </ExportModal>
            ) : null}

            {this.state.showTeamModal ? (
              <SelectTeamModal
                teamSelectedForSim={this.teamSelectedForSim}
                onClose={this.handleCloseTeamModal}
              >
              </SelectTeamModal>
            ) : null}
          </div>
        </div>
        <br />
        <div className="container">
          <div className="row" style={{ position: 'relative' }}>
            < Teams
              userCanPick={this.state.userCanPick}
              pickWasSelected={this.pickWasSelected}
              teams={this.state.teams}
              players={this.state.players}
              teamsToPlayer={this.state.teamsToPlayer}
              teamForDraftSimMode={this.state.teamForDraftSimMode}
              playersChosenByUser={this.state.playersChosenByUser}
            />
            < br />
            < Players
              userCanPick={this.state.userCanPick}
              onRightClick={this.onRightClick}
              playerWasSelected={this.playerWasSelected}
              players={this.state.players}
              teams={this.state.teams}
              teamsToPlayer={this.state.teamsToPlayer} />
          </div>
        </div>

      </div >
    );
  }
}
export default App;
