import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Menu extends Component {
    cerrarSesion=()=>{
        cookies.remove('id',{path:"/"});
        cookies.remove('nombre',{path:"/"});
        cookies.remove('apellido',{path:"/"});
        cookies.remove('rol',{path:"/"});
        window.location.href='./'
    }

    // componentDidMount(){
    //     if(!cookies.get('nombre')){
    //         window.location.href="./"
    //     }
    // }

    render() {
            // console.log(`id ` + cookies.get(`id`));
            // console.log(`nombre ` + cookies.get(`nombre`));
            // console.log(`apellido ` + cookies.get(`apellido`));
        return (
            <div>
                Menu principal bodega

                <br />
                <button onClick={()=>this.cerrarSesion()}>Cerrar sesión</button>
            </div>
        );
    }
}

export default Menu;