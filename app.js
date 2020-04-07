'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const handlebars = require('handlebars');
const layouts = require('handlebars-layouts');
const path = require('path');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('views/layouts/layout.handlebars', 'utf8'));
handlebars.registerPartial('header', fs.readFileSync('views/partials/header.handlebars', 'utf8'));
handlebars.registerPartial('campaign-detail/tab-overview', fs.readFileSync('views/partials/campaign-detail/tab-overview.handlebars', 'utf8'));
handlebars.registerPartial('campaign-detail/tab-project', fs.readFileSync('views/partials/campaign-detail/tab-project.handlebars', 'utf8'));
handlebars.registerPartial('campaign-detail/tab-financial', fs.readFileSync('views/partials/campaign-detail/tab-financial.handlebars', 'utf8'));
handlebars.registerPartial('campaign-detail/tab-issuer', fs.readFileSync('views/partials/campaign-detail/tab-issuer.handlebars', 'utf8'));
handlebars.registerPartial('campaign-detail/tab-compliance', fs.readFileSync('views/partials/campaign-detail/tab-compliance.handlebars', 'utf8'));
handlebars.registerPartial('campaign-detail/tab-legal', fs.readFileSync('views/partials/campaign-detail/tab-legal.handlebars', 'utf8'));

const app = express();

app.engine('handlebars', exphbs({
  handlebars: handlebars,
}));
app.set('view engine', 'handlebars');
app.disable('view cache');

app.use('', express.static(path.join(__dirname, 'styleguide')));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts')));

app.get('/', function (req, res) {
  res.render('portfolio');
});

app.get('/portfolio', function (req, res) {
  res.render('portfolio');
});

app.get('/investments', function (req, res) {
  res.render('campaign-list');
});

app.get('/campaign-detail', function (req, res) {
  res.render('campaign-detail');
});

const port = process.env.PORT || 9191;
app.listen(port);
// eslint-disable-next-line no-console
console.log(`Listening on port: ${port}`);
