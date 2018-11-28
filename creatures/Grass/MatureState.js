const CreatureState = require('../CreatureState');

class MatureState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'mature-grass';
	}

	grow(data) {
		return this.target.changeState(this.target.states.immature, data);
	}

	reproduce(data) {
		return this.execute(data);
	}

	execute(data) {
		const emptySpaces = this.searchSurroundings(data.surroundings, 'empty');

		if (emptySpaces.length > 0) {
			const randDir = this.randomDirection(emptySpaces);
			return { type: 'reproduce', point: this.directions[randDir], character: '.' };
		} else {
			return { type: 'wait' };
		}
	}
}

module.exports = MatureState;
