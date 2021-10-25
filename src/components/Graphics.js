import React from 'react'
import {Line} from 'react-chartjs-2';
const baseUrl = "http://localhost:62856/api/USUARIOs";

function Graphics(props) {

    const data={
        labels:[{ title: 'Rol' , field: 'ROL.DESCRIPCION'},],
        datasets:[
            {
            label="Cantidad de Registros por Rol",
            fill= false,
            backgroundColor:'rgba(73,155,234,1)',
            borderColor:'rgba(73,155,234,1)',
            pointBorderColor='rgba(73,155,234,1)',
            pintBoderWidth:1,
            pintHoverRadius:5,
            pintHoverBackgroundColor:'rgba(73,155,234,1)',
            pintHoverBordergroundColor:'rgba(73,155,234,1)',
            pointRadius:1,
            pointRadiusRadius: 10,
            data: [{ title: 'Rol' , field: 'ROL.DESCRIPCION'},]
        }
        
        ]
    }

    return (
        <div>

        </div>
    )
}

export default Graphics;

