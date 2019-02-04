import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import Teams from "./components/Teams.jsx";
import Modal from "./components/Modal"
// import teamorder from './teamsorder.json';
import teamorder from './fullteamorder.json';

// import rankings from './bigboard.json';
import rankings from './Drafttek-Feb3-bigboard.json'

class App extends Component {
  constructor(props) {
    super(props);
    const teams = teamorder.map(({ team, pickNum, round, pickNumInRound }) => {
      return { pick: { team, pickNum, round, pickNumInRound, isSelected: false, isPicked: false, playerPicked: null }, key: pickNum };
    });

    let teamsToPlayer = []
    teams.forEach(({ pick }) => {
      teamsToPlayer[pick.pickNum - 1] = null;
    });

    const players = rankings.map(({ rank, name, position, school }) => {
      return { player: { rank, name, position, school, isSelected: false, teamDraftedTo: null }, key: rank }
    });

    this.state = {
      playerSelected: null,
      pickSelected: null,
      teamsToPlayer,
      teams,
      players,
      showModal: false
    }
  }

  playerWasSelected = (selectedPLayer) => {
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

        this.setState({ teamsToPlayer: ttp, players, teams, playerSelected: null, pickSelected: null })
      }

      else {
        this.setState({ playerSelected: newPlayerSelected })
      }

    }
  }

  pickWasSelected = (selectedPick) => {
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
        console.log('both a player and pick are selected')
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


  exportToText = () => {
    let ttp = this.state.teamsToPlayer
    let teams = this.state.teams
    let players = this.state.players

    console.log(ttp)


    // let str = ''
    let arr = []
    if (ttp) {

      ttp.forEach((p, i) => {

        if (p) {
          // let { team, pickNum } = teams[i].pick
          // let { name, position, school } = players[p].player
          // let tempStr = 'At pick #' + pickNum + ', the ' + team + ' select ' + name + ', ' + position + ' from ' + school
          // str += tempStr + '\n'
          // arr.push(tempStr + '\n')
          arr.push({ pick: teams[i].pick, player: players[p - 1].player })
        }
      })
      console.log(arr)
    }
    return arr
  }



  handleShowMessageClick = () => {
    // let arr = this.exportToText()
    this.setState({ showModal: !this.stateshowModal })
  }
  handleCloseModal = () => {
    this.setState({ showModal: false })
    document.querySelector('#copyMessage').style.display = 'none'
  }

  render() {
    return (
      <div style={{
        height: '100%',
      }}

        className="container panel">

        < Header />
        <button
          onClick={this.handleShowMessageClick}
          style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className='btn-lg btn-success'
        >

          Export to Text!
          </button>

        {this.state.showModal ? (
          <Modal onClose={this.handleCloseModal} arr={this.exportToText()}>
          </Modal>
        ) : null}

        <br />
        <div className="container">
          <div className="row" style={{ position: 'relative' }}>
            < Teams
              pickWasSelected={this.pickWasSelected}
              teams={this.state.teams}
              players={this.state.players}
              teamsToPlayer={this.state.teamsToPlayer} />
            < br />
            < Players
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
