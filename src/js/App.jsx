import React, { Component } from 'react';
import '../css/App.css';
import Board from './componets/Board';
// import Cell from './componets/Cell';

/** Simple app that just shows the LightsOut game. */

class App extends Component {
	render() {
		return (
			<div className="App">
				<Board />
			</div>
		);
	}
}

export default App;
