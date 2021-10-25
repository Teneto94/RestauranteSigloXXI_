import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../src/css/App.css'
import MaterialTable from 'material-table';
import {Modal, TextField, Button, Select, MenuItem, FormControl,InputLabel} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
const baseUrl = "http://localhost:62856/api/PROVEEDORs";



const columns=[
    { title: 'Id' , field: 'ID'},
    { title: 'Nombre' , field: 'NOMBRE'},
    { title: 'Dirección' , field: 'DIRECCION'},
    { title: 'Telefono' , field: 'TELEFONO'},
    { title: 'Email' , field: 'EMAIL'}
    
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

function ControlProveedores(){
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [proveedorSeleccionado, setproveedorSeleccionado]=useState({
    ID: "",
    NOMBRE: "",
    DIRECCION: "",
    TELEFONO: "",
    EMAIL: "",
    
  })
    

    const handleChange=e=>{
        const {name, value}=e.target;
        setproveedorSeleccionado(prevState=>({
          ...prevState,
          [name]: value
        }));
      }

      const peticionPost=async()=>{
        await axios.post(baseUrl, proveedorSeleccionado)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
      }


      const peticionPut=async()=>{
        await axios.post(baseUrl+"/"+proveedorSeleccionado.ID, proveedorSeleccionado)
        .then(response=>{
          var dataNueva=data;
          dataNueva.map(proveedor=>{
              if(proveedor.ID === proveedorSeleccionado.ID){
                proveedor.NOMBRE = proveedorSeleccionado.NOMBRE;
                proveedor.DIRECCION = proveedorSeleccionado.DIRECCION;
                proveedor.TELEFONO = proveedorSeleccionado.TELEFONO;
                proveedor.EMAIL = proveedorSeleccionado.EMAIL;
                proveedor.ACTIVO = proveedorSeleccionado.ACTIVO;

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
        await axios.delete(baseUrl+"/"+proveedorSeleccionado.ID)
        .then(response=>{
          setData(data.filter(proveedor=>proveedor.ID!==proveedorSeleccionado.ID));
          abrirCerrarModalEliminar();
        }).catch(error=>{
          console.log(error);
        })
      }


    const seleccionarProveedor=(Proveedor, caso)=>{
        setproveedorSeleccionado(Proveedor);
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
          <h3>Agregar Nuevo Proveedor</h3>

     <TextField className={styles.inputMaterial} label="Nombre " name="NOMBRE" onChange={handleChange}/>          
    <br />
    <TextField className={styles.inputMaterial} label="Dirección" name="DIRECCION" onChange={handleChange}/>
          <br />
    <TextField className={styles.inputMaterial} label="Telefono" name="TELEFONO" onChange={handleChange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Email" name="EMAIL" onChange={handleChange}/>
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
          <h3>Editar Usuario</h3>
     <TextField className={styles.inputMaterial} label="Nombre " name="NOMBRE" onChange={handleChange} value={proveedorSeleccionado&&proveedorSeleccionado.NOMBRE} />          
    <br />
    <TextField className={styles.inputMaterial} label="Dirección" name="DIRECCION" onChange={handleChange} value={proveedorSeleccionado&&proveedorSeleccionado.DIRECCION} />
          <br />
    <TextField className={styles.inputMaterial} label="Telefono" name="TELEFONO" onChange={handleChange} value={proveedorSeleccionado&&proveedorSeleccionado.TELEFONO}/>
    <br />
    <TextField className={styles.inputMaterial} label="Email" name="EMAIL" onChange={handleChange} value={proveedorSeleccionado&&proveedorSeleccionado.EMAIL}/>
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
          <p>Estás seguro que deseas eliminar al Proveedor <b>{proveedorSeleccionado && proveedorSeleccionado.NOMBRE}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )


    return (
              
            <div className="App container">
              
                <Button onClick={()=>abrirCerrarModalInsertar()}> Crear Proveedor</Button>
                <br/>
                <MaterialTable
                columns={columns}
                data={data}
                title="Proveedores Restaurant Siglo XXI"
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar Proveedor',
                      onClick: (event, rowData) => seleccionarProveedor(rowData, "Editar")
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Eliminar Proveedor',
                      onClick: (event, rowData) => seleccionarProveedor(rowData, "Eliminar")
                    }
                  ]}
                  options={{
                    actionsColumnIndex: -1,
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

export default ControlProveedores;