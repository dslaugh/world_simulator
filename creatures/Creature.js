class Creature {
	constructor() {
		this.states = {};
		this.state = undefined;
	}

	changeState(newState, options = {}) {
		this.state = newState;
		return this.state.execute(options);
	}

	act() {
		console.log('You must implement the act method');
	}
}

module.exports = Creature;