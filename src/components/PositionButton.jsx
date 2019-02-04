import React, { Component } from 'react'

export class PositionButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterPosition: this.props.filterPosition,
            pos: this.props.pos,
            show: this.props.show

        }
    }
    buttonClicked = (e) => {
        this.state.filterPosition(this.state.pos, e)
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ show: nextProps.show });
    }
    render() {
        return (
            <button style={{margin:'0.1rem'}} className={this.state.show ? 'btn btn-success' : 'btn btn-danger'} onClick={e => this.buttonClicked(e)}>
                {this.state.pos}
            </button>

        )
    }
}

export default PositionButton
