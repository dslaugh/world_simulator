const CreatureState = require('../CreatureState');

class UnoccupiedState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'unoccupied';
	}

	execute(data) {
		return this.act(data);
	}

	act(data) {
		return { type: 'wait' };
	}
}

module.exports = UnoccupiedState;
