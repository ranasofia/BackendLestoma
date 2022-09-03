import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import frameRoutes from './routes/frame.routes'
import upaRoutes from './routes/upa.routes'
import {createRoles} from './libs/inicialSetUp';

const app = express()

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

app.get('/',(req,res) =>{
    res.json({
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.set('pkg').version
    })
})

app.use('/api/auth', authRoutes);

app.use('/frame', frameRoutes);

app.use('/upa', upaRoutes);

export default app;
