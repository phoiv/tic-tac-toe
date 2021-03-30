import React from 'react';
import './index.css';

import './index.css';
class SetupScreen extends React.Component {
    render() {
        return (
            <div className={this.props.isActive ? "button-container on-screen" : "button-container"}>
                <button onClick={() => this.props.handleClick(1)}>VS COM</button>
                <button onClick={() => this.props.handleClick(2)}>2 PLAYERS</button>
            </div>
        )
    }
}

export default SetupScreen