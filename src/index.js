import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js'
import SetupScreen from './SetupScreen.js'
import './index.css';



class GamesGlobal extends React.Component {

    state = {
        stage: "setup", // setup/game
        mode: null,     // 1 or 2 players
    }

    handleClick = (mode) => {

        if (mode == 1)
            this.setState({
                mode: 1,
                stage: "game"
            })
        else if (mode == 2)
            this.setState({
                mode: 2,
                stage: "game"
            })
        else
            alert("something went wrong - mode has unexpected value")


    }

    render() {
        return (
            <div className="game-container">
                <SetupScreen
                    isActive={this.state.stage === "setup" ? true : false}
                    handleClick={this.handleClick}
                />
                <Game
                    isActive={this.state.stage === "game" ? true : false}
                    mode={this.state.mode} />
                {/* <Game /> */}
            </div>
        );
    }
}
// ========================================

ReactDOM.render(
    <GamesGlobal />,
    document.getElementById('root')
);

