const Creature = require('./Creature');
const CreatureState = require('./CreatureState');

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
