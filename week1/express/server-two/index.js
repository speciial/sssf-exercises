const pug = require('pug');
const compiledFunction = pug.compileFile('views/index.pug');

const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (_, res) => {
    res.render('index', {});
});

app.get('/catinfo', (_, res) => {
    const cat = {
        'name': 'Frank',
        'age': 6,
        'weight': 5
    };
    res.json(cat);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));