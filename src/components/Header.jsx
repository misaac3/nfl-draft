import React, { Component } from 'react'
class Header extends Component {
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-dark bg-dark text-white">
          <a className="navbar-brand">
            <h1>NFL Mock Draft Creator!</h1>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

        </nav>
      </div>
    )
  }
}

export default Header
