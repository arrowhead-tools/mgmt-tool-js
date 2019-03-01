import React, { Component } from 'react'

export default class NotFound extends Component {
  render() {
    return (
      <div className="page404 page dynamic">
        <div className="page-content-wrapper white-edged">
          <div className="mask" />
          <div className="page-content container">
            <div>
              <div className="bigtext">404</div>
              <div className="sub-text-row a">
                <span>Page not Found</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
