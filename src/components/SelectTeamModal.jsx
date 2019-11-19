import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import uniqueTeams from '../uniqueteams.json'


export class SelectTeamModal extends Component {

    clicked = (e) => {
        this.props.teamSelectedForSim(e.target.innerHTML)
    }


    render() {
        return ReactDOM.createPortal(
            <div
                className=' justify-content-center mb-6'
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
                        // display: 'inline-block',
                        minHeight: '300px',
                        margin: '2rem',
                        // position: 'relative',
                        minWidth: '600px',
                        maxWidth: '700px',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                        justifySelf: 'center',
                    }}
                >
                    {uniqueTeams.sort().map((p) => {
                        return (
                            <button
                                className="btn btn-outline-primary m-2 "
                                onClick={e => this.clicked(e)}
                            >
                                {p}
                            </button>
                        )
                    })}

                    < hr />

                    <button
                        onClick={this.props.onClose}
                        className='btn btn-warning'
                    >
                        Close
                    </button>
                    {/* <button
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
                    </div> */}
                </div>
            </div>,
            document.querySelector('#modal-teams')
        )
    }
}

export default SelectTeamModal
