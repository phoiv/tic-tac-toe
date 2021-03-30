import React from 'react';
import './index.css';

class Square extends React.Component {

    render() {
        return (
            <button
                style={{ animation: this.props.animate, color: this.props.color }}
                className={this.props.value ? "square" : "square empty"}
                onClick={() => { this.props.onClickFun() }}>
                {this.props.value}
            </button>
        );
    }
}

export default Square