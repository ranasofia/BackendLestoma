import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import frameRoutes from './routes/frame.routes'
import upaRoutes from './routes/upa.routes'
import userRoutes from './routes/user.routes'
import dataRoutes from './routes/data.routes'
import {createRoles} from './libs/inicialSetUp';
import { createInitialData} from './libs/inicialSetUpUpa'

const app = express()
createInitialData();
createRoles();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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



export default app;
