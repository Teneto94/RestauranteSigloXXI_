import React from 'react';
import {Grid,AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from "../components/Navbar";
import 'fontsource-roboto';
import '../css/Dashboard.css';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PublicIcon from '@material-ui/icons/Public';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import CardsHeader from '../components/CardsHeader';
import Cards from '../components/Cards';

const useStyles = makeStyles(()=>({
root:{
    flexGrow:1
},
iconos:{
    color: 'white'
},
container:{
    paddingTop: '40px',
    alignItems: 'center'
}
}));
function DashboardReservas(props){
    const classes= useStyles();

    return(
        <div className={classes.root}>
            <AppBar position="static">
           
           <Toolbar>

               <Typography variant="h6" className={classes.title}>
                 Restaurante Siglo XXI
                 
               </Typography>
               <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
               </Typography>

               <Button class="btn btn-primary" href="http://localhost:3000/">Cerrar sesión</Button>

               <IconButton color="inherit">
                   
               
               {/* <img src={require('../css/img/SIGLO.JPG')} width="40px" height="40px" className={classes.imagen}/> */}
                </IconButton>
                
           </Toolbar>
           
       </AppBar>
       <div></div>
              <br></br>
              <Grid item xs={12} sm={20} md={20} lg={20} xl={20}>
              <iframe width="1900" height="800" src="https://app.powerbi.com/view?r=eyJrIjoiNjhkYWMxNjQtMGZkMi00OTIzLWEyNGUtMDYxNGZkZWYxNmEzIiwidCI6IjcyZmQwYjVhLThhNmEtNGNmZi04OWY2LWJkZTk2MWY3ZTI1MCIsImMiOjR9&pageName=ReportSection89dd33b0a18b7ea5a348" frameborder="0" allowFullScreen="true"></iframe>
                
                    

            </Grid>
              
        </div>
    );

}
export default DashboardReservas;