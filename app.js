const express = require('express');
const passport = require('passport');
const db = require('./models/account.model');
const cors = require('cors')
// Phần của Khương mới thêm
const flash = require('express-flash');

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
// middlewares
require('./middlewares/session.mdw')(app);
require('./middlewares/locals.mdw')(app);
require('./middlewares/view.mdw')(app);
// đăng nhập bằng google
app.use(passport.initialize());
app.use(passport.session());
require('./passport-setup');
app.use(flash());

// Trang chủ Home
app.use('/', require('./route/home.route'));
app.use('/index.html', require('./route/home.route'));


const {exposeTemplates} = require('./public/js/exposeTemplate');


// route tag
app.use('/tag', require('./route/tag.route'));

// route tag
app.use('/category', require('./route/category.route'));

// route account
const accountRoute = require('./route/account.route');
app.use('/account', accountRoute);
// passport
app.use('/auth', require('./route/auth.route'));

// Trang writer
app.use('/writer', exposeTemplates, require('./Route/Writer'));

// Trang forgot password

app.use('/account', require('./route/ForgotPW'));


//Trang Profile
app.use('/account', exposeTemplates, require('./route/profile'));


app.use('/admin', exposeTemplates, require('./route/admin.route'));

//Trang editor
app.use('/editor', require('./route/editor.route'));

app.use(function (req, res) {
  res.render('404', { layout: false });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('500', { layout: false });
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running at http://localhost:${PORT}`);
});
