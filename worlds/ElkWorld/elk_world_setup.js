const ElkWorld = require('./ElkWorld');
const ElementRegistry = require('../../core/ElementRegistry');
const Directions = require('../../core/Directions');
const Elk = require('../../creatures/Elk/Elk');
const Grass = require('../../creatures/Grass');
const elkWorldMap = require('../../maps/elk_world_map');

const empty = {
	character: ' ',
	type: 'empty',
};

const wall = {
	character: '#',
	type: 'wall',
	iconClass: 'wall',
};

const grass = {
	character: '.',
	type: 'grass',
	age: 0,
	energy: 10,
	iconClass: 'grass',
	reproductionCooldown: 10,
	brain: Grass,
	ai: undefined,
	act: function(surroundings, creature) {
		return this.ai.act(surroundings, creature);
	},
};

const tree = {
	character: 'T',
	type: 'tree',
	iconClass: 'tree',
};

const elk = {
	character: 'E',
	type: 'elk',
	age: 0,
	health: 100,
	reproductionCooldown: 0,
	iconClass: 'elk',
	brain: Elk,
	ai: undefined,
	act(surroundings, creature) {
		return this.ai.act(surroundings, creature);
	},
};

const elements = new ElementRegistry();
elements.registerElement(empty);
elements.registerElement(wall);
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
