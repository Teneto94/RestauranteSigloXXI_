
import React from 'react';
import {BrowserRouter, Switch , Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu'
import MenuAdminV2 from '../pages/MenuAdminV2';
import ControlProductos from '../pages/ControlProductos';
import ControlReservas from '../pages/ControlReservas';
import ControlProveedores from '../pages/ControlProveedores';
import ControlRecetas from '../pages/ControlRecetas';
import DashboardReservas from '../pages/DashboardReservas';
import HomeAdministrador from '../pages/Home-Roles/HomeAdministrador';
import HomeBodega from '../pages/Home-Roles/HomeBodega';
import HomeCocina from '../pages/Home-Roles/HomeCocina';
import HomeRecepcion from '../pages/Home-Roles/HomeRecepcion';





function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/MenuAdminV2" component={MenuAdminV2} />
        <Route exact path="/ControlProductos" component={ControlProductos}/>
        <Route exact path="/ControlReservas" component={ControlReservas}/>
        <Route exact path="/ControlProveedores" component={ControlProveedores}/>
        <Route exact path="/ControlRecetas" component={ControlRecetas}/>
        <Route exact path="/DashboardReservas" component={DashboardReservas}/>
        <Route exact path="/HomeAdministrador" component={HomeAdministrador}/>
        <Route exact path="/HomeBodega" component={HomeBodega}/>
        <Route exact path="/HomeCocina" component={HomeCocina}/>
        <Route exact path="/HomeRecepcion" component={HomeRecepcion}/>



      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
