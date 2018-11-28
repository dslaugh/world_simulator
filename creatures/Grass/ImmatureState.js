const CreatureState = require('../CreatureState');

class ImmatureState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'immature-grass';
	}

	grow(data) {
		return this.execute(data);
	}

	reproduce(data) {
		return this.target.changeState(this.target.states.mature, data);
	}

	execute(data) {
		return { type: 'grow', units: 0 };
	}
}

module.exports = ImmatureState;
