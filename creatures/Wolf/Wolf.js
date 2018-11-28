const Creature = require('./Creature');
const CreatureState = require('./CreatureState');

class HuntingState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'hunting-wolf';
	}
}

class Wolf extends Creature {
	constructor() {
		super();

		this.states = {
			hunting: new HuntingState(this),
		};

		this.state = this.states.hunting;
	}

	act(data) {
		// const creature = data.creature.object;

		return this.state.execute(data);
	}
}