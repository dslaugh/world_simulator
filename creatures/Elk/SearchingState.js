const ElkState = require('./ElkState');

class SearchingState extends ElkState {
	constructor(target) {
		super(target);
		this.name = 'searching';
		this.searchDirection = undefined;
		this.count = 0;
	}

	execute(data) {
		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
		if (grassDirs.length > 0) {
			return this.target.changeState(this.target.states.eating, data);
		}

		return this.act(data);
	}

	act(data) {
		this.count += 1;
		const emptyDirs = this.searchSurroundings(data.surroundings, 'empty');
		if (emptyDirs.length > 0) {
			const randDir = this.randomDirection(emptyDirs);
			let moveToPoint = this.directions[randDir];

			if (!this.searchDirection) {
				this.searchDirection = randDir;
			}

			if (emptyDirs.includes(this.searchDirection)) {
				moveToPoint = this.directions[this.searchDirection];
			} else {
				this.searchDirection = randDir;
			}

			if (this.count >= 10) {
				this.searchDirection = undefined;
				this.count = 0;
			}

			return { type: 'move', point: moveToPoint };
		}

		return { type: 'wait' };
	}
}

module.exports = SearchingState;
