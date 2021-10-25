import React from 'react'
import {Grid, Switch} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
// import Navbar from "../components/Navbar";
import 'fontsource-roboto';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Route } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const useStyles = makeStyles(()=>({
    root:{
        flexGrow:1
    },
    menuButton:{
        marginRight: '16px'
    },
    title:{
        flexGrow : 1
    },
    imagen:{
        borderRadius: '50%'
    }
    }));
const cerrarSesion=()=>{
    cookies.remove('id',{path:"/"});
    cookies.remove('nombre',{path:"/"});
    cookies.remove('apellido',{path:"/"});
    cookies.remove('rol',{path:"/"});
    window.location.href='./'
}


 function HomeBodega() {
    const classes= useStyles();
    return (
        
        <div className={classes.root}>
           <AppBar position="static">
           
               <Toolbar>
                   
                   {/* <IconButton edge="start" className={classes.menuButton} color="inherit" > */}

    
           

{/*    
                       
                       <MenuIcon />
                       <Typography>
                        
                       </Typography> */}

                   {/* </IconButton> */}
                   <Typography variant="h6" className={classes.title}>
                     Administración Bodega Restaurante Siglo XXI
                     
                   </Typography>
                   <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                   </Typography>
                   <Button color="inherit" href="ControlProductos">Control Productos</Button>
                   <Button color="inherit" href="ControlProveedores">Control Proveedores</Button>
                   <Button class="btn btn-primary" href="http://localhost:3000/">Cerrar sesión</Button>

                   <IconButton color="inherit">
                   
                   {/* <img src={require('../css/img/SIGLO.JPG')} width="40px" height="40px" className={classes.imagen}/> */}
                    </IconButton>
                    
               </Toolbar>

           </AppBar>
           

       </div>

    )
}

export default HomeBodega;
