const express = require('express');
const exp_handlebars = require('express-handlebars');
const getNewElkWorld = require('./worlds/ElkWorld/elk_world_setup');

let world = getNewElkWorld();

const PORT = 3000;
const app = express();

app.engine('handlebars', exp_handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('./public/images'));

app.get('/', (req, res) => {
	res.render('home', { initialWorld: world.toString() });
});

app.get('/step', (req, res) => {
	const board = world.step();
	res.status(200).send(board);
});

app.get('/reset', (req, res) => {
	world = getNewElkWorld();
	res.status(200).send(world.toString());
});

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
});
