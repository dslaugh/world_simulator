const Creature = require('./Creature');
const CreatureState = require('./CreatureState');

class MovingToFood extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'moving-to-food';
	}

	execute(data) {
		const creature = data.creature.object;
		const creaturePoint = data.creature.point;
		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
		if (grassDirs.length > 0) {
			return this.target.changeState(this.target.states.eating, data);
		}

		if (this.isInFoodArea(creaturePoint) || creature.health < 20) {
			return this.target.changeState(this.target.states.searching, data);
		}

		return this.act(data);
	}

	act(data) {
		const emptySpaceDirs = this.searchSurroundings(data.surroundings, 'empty');
		if (emptySpaceDirs.length > 0) {
			const southWestDirs = emptySpaceDirs.filter(dir => ['w', 'sw', 's'].includes(dir));
			if (southWestDirs.length > 0) {
				const randomDir = this.randomDirection(southWestDirs);
				const movePoint = this.directions[randomDir];
				return { type: 'move', point: movePoint };
			}
		}
		return { type: 'wait' };
	}
}

class MovingToShelter extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'moving-to-shelter';
	}

	execute(data) {
		const creature = data.creature.object;
		const creaturePoint = data.creature.point;
		if (creature.health < this.hungryLevel) {
			return this.target.changeState(this.target.states.movingToFood, data);
		}

		if (this.isInShelter(creaturePoint)) {
			if (creature.age > 50) {
				return this.target.changeState(this.target.states.rutting, data);
			}
			return this.target.changeState(this.target.states.millingAround, data);
		}
		return this.act(data);
	}

	act(data) {
		const emptySpaceDirs = this.searchSurroundings(data.surroundings, 'empty');
		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');

		let northEastDirs = [];
		if (emptySpaceDirs.length > 0) {
			northEastDirs = emptySpaceDirs.filter(dir => ['e', 'ne', 'n'].includes(dir));
		}
		if (northEastDirs.length === 0 && grassDirs.length > 0) {
			northEastDirs = grassDirs.filter(dir => ['e', 'ne', 'n'].includes(dir));
		}

		if (northEastDirs.length > 0) {
			const randomDir = this.randomDirection(northEastDirs);
			const movePoint = this.directions[randomDir];
			return { type: 'move', point: movePoint };
		}

		return { type: 'wait' };
	}
}

class Eating extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'eating';
	}

	execute(data) {
		const creature = data.creature.object;
		if (creature.health > this.notHungryLevel) {
			return this.target.changeState(this.target.states.movingToShelter, data);
		}

		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
		if (grassDirs.length > 0) {
			return this.act(grassDirs);
		}

		return this.target.changeState(this.target.states.movingToFood, data);
	}

	act(grassDirs) {
		const randomDir = this.randomDirection(grassDirs);
		const grassPoint = this.directions[randomDir];
		return { type: 'eat', point: grassPoint };
	}
}

class MillingAround extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'milling-around';
	}

	execute(data) {
		const creature = data.creature.object;
		if (creature.health < this.hungryLevel) {
			return this.target.changeState(this.target.states.movingToFood, data);
		}

		return this.act(data);
	}

	act(data) {
		const randNum = this.getRand();
		if (randNum % 3 === 0) {
			const emptyDirs = this.searchSurroundings(data.surroundings, 'empty');
			const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
			const passableDirs = emptyDirs.concat(grassDirs);
			if (passableDirs.length > 0) {
				const randDir = this.randomDirection(passableDirs);
				const randPoint = this.directions[randDir];
				return { type: 'move', point: randPoint };
			}
		}
		return { type: 'wait' };
	}
}

class Rutting extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'rutting';
	}

	execute(data) {
		const creature = data.creature.object;

		if (creature.health < this.hungryLevel) {
			return this.target.changeState(this.target.states.movingToFood, data);
		}

		if (creature.reproductionCooldown < this.reproductionCooldownLevel) {
			return this.target.changeState(this.target.states.millingAround, data);
		}

		return this.act(data);
	}

	act(data) {
		const creature = data.creature.object;
		const emptyDirs = this.searchSurroundings(data.surroundings, 'empty');
		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');

		if (emptyDirs.length > 0) {
			const otherElkDirs = this.searchSurroundings(data.surroundings, 'elk');
			const randDir = this.randomDirection(emptyDirs);
			const randPoint = this.directions[randDir];
			if (otherElkDirs.length > 0) {
				creature.reproductionCooldown = 0;
				return { type: 'reproduce', point: randPoint, character: 'E' };
			}
			return { type: 'move', point: randPoint };
		}
		if (grassDirs.length > 0) {
			const randGrassDir = this.randomDirection(grassDirs);
			const randGrassPoint = this.directions[randGrassDir];
			return { type: 'move', point: randGrassPoint };
		}

		return { type: 'wait' };
	}
}

class Searching extends CreatureState {
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

class Elk extends Creature {
	constructor() {
		super();

		this.states = {
			movingToFood: new MovingToFood(this),
			movingToShelter: new MovingToShelter(this),
			eating: new Eating(this),
			millingAround: new MillingAround(this),
			rutting: new Rutting(this),
			searching: new Searching(this),
		};

		this.state = this.states.millingAround;
	}

	act(data) {
		const creature = data.creature.object;
		creature.health -= 1;
		creature.age += 1;
		creature.reproductionCooldown += 1;

		if (creature.health <= 0 || creature.age > 500) {
			return this.die();
		}

		return this.state.execute(data);
	}

	die() {
		return { type: 'die' };
	}
}

module.exports = Elk;
