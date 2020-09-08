import React, { Component } from 'react';
import key from 'react-key-string';
import Cell from './Cell';
import '../../css/Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

export default class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.25
	};
	constructor(props) {
		super(props);
		// TODO: set initial state
		this.state = {
			hasWon: false,
			board: this.createBoard()
		};
	}

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	createBoard = () => {
		let board = [];
		for (let i = 0; i < this.props.nrows; i++) {
			let r = [];
			for (let i = 0; i < this.props.ncols; i++) {
				r.push(Math.round(Math.random() > this.props.chanceLightStartsOn));
			}
			board.push(r);
		}
		return board;
	};

	/** handle changing a cell: update board & determine if winner */

	flipCellsAroundMe = coord => {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [ y, x ] = coord.split('-').map(Number);

		function flipCell(y, x) {
			// if this coord is actually on board, flip it

			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}
		flipCell(y, x);
		flipCell(y + 1, x);
		flipCell(y - 1, x);
		flipCell(y, x + 1);
		flipCell(y, x - 1);
		this.setState({
			board: board,
			hasWon: !board.some(row => row.includes(true))
		});

		// TODO: flip this cell and the cells around it

		// win when every cell is turned off
		// TODO: determine is the game has been won

		// this.setState({ board, hasWon });
	};

	assignCell = cell => {
		const id = key.generate();
		return <Cell key={id} id={id} isLit={cell} />;
	};
	/** Render game board or winning message. */

	render() {
		return (
			<div className="Board">
				{this.state.hasWon ? (
					<h1>You Won</h1>
				) : (
					<table className="Board">
						<tbody>
							{this.state.board.map((r, idxY) => (
								<tr key={idxY}>
									{r.map((cell, idxX) => (
										<Cell
											key={`${idxY}-${idxX}`}
											id={`${idxY}-${idxX}`}
											isLit={cell}
											flipCellsAroundMe={this.flipCellsAroundMe}
										/>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		);
	}
}
