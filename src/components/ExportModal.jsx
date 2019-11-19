// import React from 'react';
import ReactDOM from 'react-dom'


import React, { Component } from 'react'
import ExportedPick from './ExportedPick'
import ExportedTrades from './ExportedTrades';

export class ExportModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamSelectedForSim: this.props.teamSelectedForSim
        }
    }
    copy = () => {
        window.getSelection().selectAllChildren(document.getElementById('exportedPicks'));
        let isSuccessful = document.execCommand('copy');
        if (isSuccessful) document.querySelector('#copyMessage').style.display = 'block'
    }

    render() {
        console.log((this.props.teamSelectedForSim))

        return ReactDOM.createPortal(
            <div
                className=' mb-6'
                style={{
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    display: 'grid',
                    justifyContent: 'center',
                    // alignItems: 'center',
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
                        // minHeight: '300px',
                        margin: '2rem',
                        // position: 'relative',
                        minWidth: '300px',
                        // maxWidth: '700px',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                        // justifySelf: 'center',
                    }}
                >
                    <div id='exportedPicks'>
                        <ExportedTrades
                            tradesExecuted={this.props.tradesExecuted}
                        />
                        <div >
                            {/* {this.props.children} */}
                            {this.props.arr.map((p) =>
                                <ExportedPick a={p} key={p.pick.pickNum} teamForDraftSimMode={this.props.teamForDraftSimMode} />
                            )}
                        </div>
                    </div>
                    < hr />
                    <button
                        onClick={this.props.onClose}
                        className='btn btn-warning'
                    >
                        Close
                    </button>
                    <button
                        style={{ float: 'right' }}
                        onClick={this.copy}
                        className='btn btn-warning'
                    >
                        Copy to Clipboard
                    </button>

                    <br />
                    <div
                        style={{ display: 'none' }}
                        id='copyMessage'>
                        Copy Successful!
                    </div>


                </div>
            </div>,
            document.querySelector('#modal-export')
        )
    }
}

export default ExportModal
