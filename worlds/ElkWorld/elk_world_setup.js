const ElkWorld = require('./ElkWorld');
const ElementRegistry = require('../../core/ElementRegistry');
const Directions = require('../../core/Directions');
const Elk = require('../../creatures/Elk');
const Grass = require('../../creatures/Grass');
const elkWorldMap = require('../../maps/elk_world_map');

const empty = {
	character: ' ',
	type: 'empty',
	create() {
		return { type: this.type, character: this.character };
	}
};
const wall = {
	character: '#',
	type: 'wall',
	create() {
		return { type: this.type, character: this.character, 	iconClass: 'wall' };
	}
};
const horizontalWall = {
	character: '!',
	type: 'wall',
	create() {
		return { type: this.type, character: this.character, 	iconClass: 'horizontal-wall' };
	}
};

const grass = {
	character: '.',
	type: 'grass',
	create() {
		return {
			type: this.type,
			character: this.character,
			age: 0,
			energy: 10,
			iconClass: 'grass',
			reproductionCooldown: 10,
			ai: new Grass(),
			act: function(surroundings, creature) {
				return this.ai.act(surroundings, creature);
			}
		};
	}
};

const tree = {
	character: 'T',
	type: 'tree',
	create() {
		return { type: this.type, character: this.character, iconClass: 'tree' };
	}
};

const elk = {
	character: 'E',
	type: 'elk',
	create() {
		return {
			type: this.type,
			character: this.character,
			age: 0,
			health: 100,
			reproductionCooldown: 0,
			iconClass: 'elk',
			ai: new Elk(),
			act(surroundings, creature) {
				return this.ai.act(surroundings, creature);
			}
		}
	}
};

const elements = new ElementRegistry();
elements.registerElement(empty);
elements.registerElement(wall);
elements.registerElement(horizontalWall);
elements.registerElement(grass);
elements.registerElement(tree);
elements.registerElement(elk);

const options = {
	map: elkWorldMap,
	directions: Directions,
	elements,
};

function getNewElkWorld() {
	return new ElkWorld(options);
}

module.exports = getNewElkWorld;
