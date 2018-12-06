const ElkWorld = require('./ElkWorld');
const ElementRegistry = require('../../core/ElementRegistry');
const Directions = require('../../core/Directions');
const Elk = require('../../creatures/Elk/Elk');
const Grass = require('../../creatures/Grass/Grass');
const Wolf = require('../../creatures/Wolf/Wolf');
const Den = require('../../creatures/Den/Den');
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
	act: function(data) {
		return this.ai.act(data);
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
	energy: 20,
	reproductionCooldown: 0,
	iconClass: 'elk',
	brain: Elk,
	ai: undefined,
	act(data) {
		return this.ai.act(data);
	},
};

const wolf = {
	character: 'W',
	type: 'wolf',
	age: 0,
	health: 100,
	iconClass: 'wolf',
	brain: Wolf,
	ai: undefined,
	act(data) {
		return this.ai.act(data);
	}
};

const den = {
	character: 'D',
	type: 'den',
	iconClass: 'den',
	brain: Den,
	ai: undefined,
	act(data) {
		return this.ai.act(data);
	}
};

const elements = new ElementRegistry();
elements.registerElement(empty);
elements.registerElement(wall);
elements.registerElement(grass);
elements.registerElement(tree);
elements.registerElement(elk);
elements.registerElement(wolf);
elements.registerElement(den);

const options = {
	map: elkWorldMap,
	directions: Directions,
	elements,
};
console.log('Map width:', options.map[0].length, ' Map height:', options.map.length);

function getNewElkWorld() {
	return new ElkWorld(options);
}

module.exports = getNewElkWorld;
