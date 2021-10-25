import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../src/css/App.css'
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import {Modal, TextField, Button, Select, MenuItem, FormControl,InputLabel,Data} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { CsvBuilder } from 'filefy';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
const baseUrl = "http://localhost:62856/api/RESERVAs";



const columns=[
    { title: 'Id' , field: 'ID'},
    { title: 'Codigo' , field: 'CODIGO'},
    { title: 'Usuario' , field: 'USUARIOID'},
    { title: 'Mesa' , field: 'MESAID'},
    { title: 'Fecha' , field: 'FECHA', type: 'date'},
    { title: 'Comensales' , field: 'COMENSALES'},
    { title: 'Estado' , field: 'ESTADO'}
    
]
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));
function ControlReservas()
{  const styles= useStyles();
  const [data, setData] = useState([]); 
  const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [selectedRows, setSelectedRows] = useState([])
  const [reservaSeleccionada, setreservaSeleccionada]=useState({
 
    CODIGO: "",
    USUARIOID: "",
    MESAID: "",
    FECHA: "",
    COMENSALES: "",
    ESTADO:" "
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setreservaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }));
    console.log(reservaSeleccionada);
  }
  const exportAllSelectedRows=()=>{
  

    new CsvBuilder("tableData.csv")
     .setColumns(columns.map(col=>col.title))
     .addRows(selectedRows.map(rowData=>columns.map(col=>rowData[col.field])))
     .exportFile();
   
   }
   
  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
      console.log(response.data);
    })
  }
  const peticionPost=async()=>{
    await axios.post(baseUrl, reservaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).then(response=>{
      swal({
        title: "Buen trabajo!",
        text: "Reserva registrada con exito",
        icon: "success",
      });
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+reservaSeleccionada.ID, reservaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(reservar=>{
          if(reservar.ID === reservaSeleccionada.ID){
            reservar.CODIGO = reservaSeleccionada.CODIGO;
            reservar.USUARIOID = reservaSeleccionada.USUARIOID;
            reservar.MESAID = reservaSeleccionada.MESAID;
            reservar.FECHA = reservaSeleccionada.FECHA;
            reservar.COMENSALES = reservaSeleccionada.COMENSALES;
            reservar.ESTADO = reservaSeleccionada.ESTADO;

          }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+reservaSeleccionada.ID)
    .then(response=>{
      setData(data.filter(reserva=>reserva.ID!==reservaSeleccionada.ID));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarReserva=(Reserva, caso)=>{
    setreservaSeleccionada(Reserva);
    (caso==="Editar")?abrirCerrarModalEditar()
    :
    abrirCerrarModalEliminar()
  }
   
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  useEffect(()=>{
    peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Reserva</h3>

        <TextField className={styles.inputMaterial} label="Codigo " name="CODIGO" onChange={handleChange}/>          
        <br />
        <TextField className={styles.inputMaterial} label="Usuario " name="USUARIOID" onChange={handleChange}/>          
        <br />
        <TextField className={styles.inputMaterial} label="Mesa" name="MESAID" onChange={handleChange}/>
        <br />
         <TextField type="date" className={styles.inputMaterial}label="Fecha"  name="FECHA" onChange={handleChange}/>
        <br /> 
        <TextField  className={styles.inputMaterial} label="Comensales" name="COMENSALES" onChange={handleChange}/>
        <br />
        <TextField  className={styles.inputMaterial} label="Estado" name="ESTADO" onChange={handleChange}/>
        <br />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )
  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Reserva</h3>
 <TextField className={styles.inputMaterial} label="Codigo" name="CODIGO" onChange={handleChange} value={reservaSeleccionada&&reservaSeleccionada.CODIGO} />  
 <br />
 <TextField className={styles.inputMaterial} label="Usuario " name="USUARIOID" onChange={handleChange} value={reservaSeleccionada&&reservaSeleccionada.USUARIOID}/>          
<br />
<TextField className={styles.inputMaterial} label="Mesa" name="MESAID" onChange={handleChange} value={reservaSeleccionada&&reservaSeleccionada.MESAID} />
      <br />
<TextField className={styles.inputMaterial} label="Fecha" name="FECHA" onChange={handleChange} value={reservaSeleccionada&&reservaSeleccionada.FECHA}/>
<br />
<TextField className={styles.inputMaterial} label="Comensales" name="COMENSALES" onChange={handleChange} value={reservaSeleccionada&&reservaSeleccionada.COMENSALES}/>
<br />
<TextField className={styles.inputMaterial} label="Estado" name="ESTADO" onChange={handleChange} value={reservaSeleccionada&&reservaSeleccionada.ESTADO}/>
<br />

      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )
  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Reserva? <b>{reservaSeleccionada && reservaSeleccionada.CODIGO}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  return (
              
    <div className="App container">
      
        <Button onClick={()=>abrirCerrarModalInsertar()}> Crear Reserva</Button>
        <br/>
        <MaterialTable
        columns={columns}
        data={data}
        title="Reservas Restaurant Siglo XXI"
        actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Reserva',
              onClick: (event, rowData) => seleccionarReserva(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Proveedor',
              onClick: (event, rowData) => seleccionarReserva(rowData, "Eliminar")
            },
            {
              icon: ()=><SaveAltIcon/>,
              tooltip: "Export all selected rows",
              onClick: () => exportAllSelectedRows()
            }
          ]}
          options={{
            actionsColumnIndex: -1,exportButton:true,exportAllData:true
          }}
          localization={{
            header:{
              actions: "Acciones"
            }
          }}
        />
           
        <Modal
            open={modalInsertar}
            onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
        </Modal>


        <Modal
            open={modalEditar}
            onClose={abrirCerrarModalInsertar}>
                {bodyEditar}
        </Modal>

        <Modal
            open={modalEliminar}
            onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
        </Modal>
    </div>
);
}

export default ControlReservas;