import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import frameRoutes from './routes/frame.routes'
import upaRoutes from './routes/upa.routes'
import userRoutes from './routes/user.routes'
import chatRoutes from './routes/chat.routes'
import {createRoles} from './libs/inicialSetUp';
import { createInitialData} from './libs/inicialSetUpUpa'
const cors = require('cors');
const { swaggerDocs } = require('./routes/swagger');

const app = express()
createInitialData();
createRoles();

app.use(cors({origin:'*'}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/*app.use(function(req, res, next) {
  if(req.headers["x-forwarded-proto"] == "https") {
    res.redirect("http://" + req.headers.host + req.url);
  } else {
    next();
  }
});*/


swaggerDocs(app);

app.use(express.json())
app.use(morgan('dev'));


//app.get('/',(req,res) =>{
  //  res.json({
    //    author: app.get('pkg').author,
      //  description: app.get('pkg').description,
       // version: app.set('pkg').version
   // })
//})

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/frame', frameRoutes);

app.use('/api/upa', upaRoutes);

app.use('/api/chat', chatRoutes);

app.use(function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
});

app.use(function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
});

app.use(function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
});

export default app;
