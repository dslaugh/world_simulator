const ElkState = require('./ElkState');

class RuttingState extends ElkState {
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

module.exports = RuttingState;
