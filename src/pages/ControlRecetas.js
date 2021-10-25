import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../src/css/App.css'
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import {Modal, TextField, Button, Select, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { CsvBuilder } from 'filefy';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
const baseUrl = "http://localhost:62856/api/RECETAs";


const columns=[
    { title: 'Id' , field: 'ID'},
    { title: 'Nombre' , field: 'NOMBRE'},
    { title: 'Precio' , field: 'PRECIO'},
    { title: 'Detalle' , field: 'DETALLE'},
    { title: 'Tiempo de preparacion' , field: 'TIEMPOPREPARACION'},
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

function ControlRecetas(){
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [selectedRows, setSelectedRows] = useState([])
  const [recetaSeleccionada, setrecetaSeleccionada]=useState({
    ID: "",
    NOMBRE: "",
    PRECIO: "",
    DETALLE: "",
    TIEMPOPREPARACION: ""
  })
    

    const handleChange=e=>{
        const {name, value}=e.target;
        setrecetaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }));
      }
      const exportAllSelectedRows=()=>{
  

        new CsvBuilder("tableData.csv")
         .setColumns(columns.map(col=>col.title))
         .addRows(selectedRows.map(rowData=>columns.map(col=>rowData[col.field])))
         .exportFile();
       
       }
      const peticionPost=async()=>{
        delete recetaSeleccionada.ID;
        await axios.post(baseUrl, recetaSeleccionada)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).then(response=>{
          swal({
            title: "Buen trabajo!",
            text: "Receta registrada con exito",
            icon: "success",
          });
        })
        .catch(error=>{
          console.log(error);
        })
      }


      const peticionPut=async()=>{
        await axios.put(baseUrl+"/"+recetaSeleccionada.ID, recetaSeleccionada)
        .then(response=>{
          var dataNueva=data;
          dataNueva.map(receta=>{
              if(receta.ID === recetaSeleccionada.ID){
                receta.NOMBRE = recetaSeleccionada.NOMBRE;
                receta.DETALLE = recetaSeleccionada.PRECIO;
                receta.TIPOPRODUCTO = recetaSeleccionada.DETALLE;
                receta.CANTIDAD = recetaSeleccionada.TIEMPOPREPARACION;
              }
          });
          setData(dataNueva);
          abrirCerrarModalEditar();
        }).catch(error=>{
          console.log(error);
        })
      }
    

    const peticionGet=async()=>{
      await  axios.get(baseUrl)
        .then(response=>{
             setData(response.data);
        })
    }


    const peticionDelete=async()=>{
        await axios.delete(baseUrl+"/"+recetaSeleccionada.ID)
        .then(response=>{
          setData(data.filter(receta=>receta.ID!==receta.ID));
          abrirCerrarModalEliminar();
        }).catch(error=>{
          console.log(error);
        })
      }


    const seleccionarReceta=(Receta, caso)=>{
        setrecetaSeleccionada(Receta);
        (caso==="Editar")?abrirCerrarModalEditar()
        :
        abrirCerrarModalEliminar()
      }


      const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
    
      
      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
    
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }

    useEffect(()=>{
         peticionGet();
    },[])



    const bodyInsertar=(
        <div className={styles.modal}>
          <h3>Agregar Receta</h3>

     <TextField className={styles.inputMaterial} label="Nombre " name="NOMBRE" onChange={handleChange}/>          
    <br />
    <TextField className={styles.inputMaterial} label="Precio" name="PRECIO" onChange={handleChange}/>
          <br />
    <TextField className={styles.inputMaterial} label="Detalle" name="DETALLE" onChange={handleChange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Tiempo de Preparación" name="TIEMPOPREPARACION" onChange={handleChange}/>
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
          <h3>Editar Receta</h3>
     <TextField className={styles.inputMaterial} label="Nombre " name="NOMBRE" onChange={handleChange} value={recetaSeleccionada&&recetaSeleccionada.NOMBRE} />          
    <br />
    <TextField className={styles.inputMaterial} label="Precio" name="PRECIO" onChange={handleChange} value={recetaSeleccionada&&recetaSeleccionada.PRECIO} />
          <br />
    <TextField className={styles.inputMaterial} label="Detalle" name="DETALLE" onChange={handleChange} value={recetaSeleccionada&&recetaSeleccionada.DETALLE}/>
    <br />
    <TextField className={styles.inputMaterial} label="Tiempo de Preparación" name="TIEMPOPREPARACION" onChange={handleChange} value={recetaSeleccionada&&recetaSeleccionada.TIEMPOPREPARACION}/>
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
          <p>Estás seguro que deseas eliminar la Receta? <b>{recetaSeleccionada && recetaSeleccionada.NOMBRE}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )


    return (
              
            <div className="App container">
              
                <Button variant="contained" onClick={()=>abrirCerrarModalInsertar()}> Crear Producto</Button>
                <br/>
                <MaterialTable
                columns={columns}
                data={data}
                title="Recetas Restaurant Siglo XXI"
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar Receta',
                      onClick: (event, rowData) => seleccionarReceta(rowData, "Editar")
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Eliminar Usuario',
                      onClick: (event, rowData) => seleccionarReceta(rowData, "Eliminar")
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

export default ControlRecetas;