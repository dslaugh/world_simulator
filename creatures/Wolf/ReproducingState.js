const CreatureState = require('../CreatureState');

class ReproducingState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'reproducing-wolf';
	}

	execute(data) {
		const creature = data.creature.object;
		if (creature.health < 300) {
			return this.target.changeState(this.target.states.hunting, data);
		}
		const emptyDirs = this.searchSurroundings(data.surroundings, 'empty');
		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
		const birthableDirs = emptyDirs.concat(grassDirs);
		if (birthableDirs.length > 0) {
			creature.health = creature.health / 2; // Child birth is tiring hehe.
			return this.act(birthableDirs);
		}

		return this.target.changeState(this.target.states.hunting, data);
	}

	act(birthableDirs) {
		const randDir = this.randomDirection(birthableDirs);
		const randPoint = this.directions[randDir];
		return { type: 'reproduce', point: randPoint, character: 'W' };
	}
}

module.exports = ReproducingState;
