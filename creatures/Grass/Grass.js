const Creature = require('../Creature');
const ImmatureState = require('./ImmatureState');
const MatureState = require('./MatureState');

class Grass extends Creature {
	constructor(options) {
		super(options);

		this.states = {
			immature: new ImmatureState(this),
			mature: new MatureState(this),
		};

		this.state = this.states.immature;
		this.reproductionCooldownTurns = 20;
	}

	act(data) {
		const creature = data.creature.object;
		creature.age += 1;
		if (creature.reproductionCooldown !== 0) {
			creature.reproductionCooldown -= 1;
		}

		if (creature.age < 10) {
			return this.grow(data);
		} else if (creature.reproductionCooldown <= 0) {
			creature.reproductionCooldown = this.reproductionCooldownTurns;
			return this.reproduce(data);
		} else {
			return { type: 'wait' };
		}
	}

	grow(data) {
		return this.state.grow(data);
	}

	reproduce(data) {
		return this.state.reproduce(data);
	}
}

module.exports = Grass;
