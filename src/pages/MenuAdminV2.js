import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../src/css/App.css'
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import {Modal, TextField, Button, Select, MenuItem, options} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { CsvBuilder } from 'filefy';
const baseUrl = "http://localhost:62856/api/USUARIOs";


const columns=[
    { title: 'Id' , field: 'ID'},
    { title: 'Nombre' , field: 'NOMBRE'},
    { title: 'Apellido' , field: 'APELLIDO'},
    { title: 'Email' , field: 'EMAIL'},
    // { title: 'Contraseña' , field: 'CONTRASENA'},
    // { title: 'Direccion' , field: 'DIRECCION'},
    { title: 'Telefono' , field: 'TELEFONO'},
    { title: 'Rol' , field: 'ROL.DESCRIPCION'},
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

function MenuAdminV2(){
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [selectedRows, setSelectedRows] = useState([])
  const [usuarioSeleccionado, setusuarioSeleccionado]=useState({
    ID: "",
    NOMBRE: "",
    APELLIDO: "",
    EMAIL: "",
    CONTRASENA: "",
    DIRECCION: "",
    TELEFONO: "",
    ROLID: ""
  })
    

    const handleChange=e=>{
        const {name, value}=e.target;
        setusuarioSeleccionado(prevState=>({
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
        delete usuarioSeleccionado.ID;
        await axios.post(baseUrl, usuarioSeleccionado)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).then(response=>{
          swal({
            title: "Buen trabajo!",
            text: "Usuario registrado con exito",
            icon: "success",
          });
        })
        .catch(error=>{
          console.log(error);
        })
      }


      const peticionPut=async()=>{
        await axios.put(baseUrl+"/"+usuarioSeleccionado.ID, usuarioSeleccionado)
        .then(response=>{
          var dataNueva=data;
          dataNueva.map(usuario=>{
              if(usuario.ID === usuarioSeleccionado.ID){
                usuario.NOMBRE = usuarioSeleccionado.NOMBRE;
                usuario.APELLIDO = usuarioSeleccionado.APELLIDO;
                usuario.EMAIL = usuarioSeleccionado.EMAIL;
                usuario.CONTRASENA = usuarioSeleccionado.CONTRASENA;
                usuario.TELEFONO = usuarioSeleccionado.TELEFONO;
                usuario.ROLID = usuarioSeleccionado.ROLID;
              
              }
          });
          console.log(dataNueva);
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
        await axios.delete(baseUrl+"/"+usuarioSeleccionado.ID)
        .then(response=>{
          setData(data.filter(usuario=>usuario.ID!==usuarioSeleccionado.ID));
          abrirCerrarModalEliminar();
        }).catch(error=>{
          console.log(error);
        })
      }


    const seleccionarUsuario=(Usuario, caso)=>{
        setusuarioSeleccionado(Usuario);
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
          <h3>Agregar Nuevo Artista</h3>

     <TextField className={styles.inputMaterial} label="Nombre " name="NOMBRE" onChange={handleChange}/>          
    <br />
    <TextField className={styles.inputMaterial} label="Apellido" name="APELLIDO" onChange={handleChange}/>
          <br />
    <TextField className={styles.inputMaterial} label="Email" name="EMAIL" onChange={handleChange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Contraseña" name="CONTRASENA" onChange={handleChange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Direccion" name="DIRECCION" onChange={handleChange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Telefono" name="TELEFONO" onChange={handleChange}/>
    <br />
    {/* <TextField className={styles.inputMaterial} label="Rol" name="ROLID" onChange={handleChange}/> */}

    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="ROLID"
          name="ROLID"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Administrador</MenuItem>
          <MenuItem value={2}>Bodega</MenuItem>
          <MenuItem value={3}>Finanzas</MenuItem>
        </Select>

          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
          </div>
        </div>
      )


      const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar Nuevo Artista</h3>
     <TextField className={styles.inputMaterial} label="Nombre " name="NOMBRE" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.NOMBRE} />          
    <br />
    <TextField className={styles.inputMaterial} label="Apellido" name="APELLIDO" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.APELLIDO} />
          <br />
    <TextField className={styles.inputMaterial} label="Email" name="EMAIL" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.EMAIL}/>
    <br />
    <TextField className={styles.inputMaterial} label="Contraseña" name="CONTRASENA" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.CONTRASENA}/>
    <br />
    <TextField className={styles.inputMaterial} label="Direccion" name="DIRECCION" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.DIRECCION}/>
    <br />
    <TextField className={styles.inputMaterial} label="Telefono" name="TELEFONO" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.TELEFONO}/>
    <br />
    {/* <TextField className={styles.inputMaterial} label="Rol" name="ROLID" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.ROLID} /> */}
    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="ROLID"
          name="ROLID"
          onChange={handleChange}
          value={usuarioSeleccionado&&usuarioSeleccionado.ROLID}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">Administrador</MenuItem>
          <MenuItem value="2">Bodega</MenuItem>
          <MenuItem value="3">Finanzas</MenuItem>
          <MenuItem value="4">Cocina</MenuItem>
          <MenuItem value="5">Garzon</MenuItem>
          <MenuItem value="6">Cliente</MenuItem>
          <MenuItem value="7">Recepción</MenuItem>
          <MenuItem value="8">Mesa</MenuItem>
        </Select>

          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )


      const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar al Usuario <b>{usuarioSeleccionado && usuarioSeleccionado.NOMBRE}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )


    return (
              
            <div className="App container">
              
                <Button onClick={()=>abrirCerrarModalInsertar()}> Crear Usuario</Button>
                <br/>
                <MaterialTable
                columns={columns}
                data={data}
                title="Usuarios Restaurant Siglo XXI"
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar Usuario',
                      onClick: (event, rowData) => seleccionarUsuario(rowData, "Editar")
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Eliminar Usuario',
                      onClick: (event, rowData) => seleccionarUsuario(rowData, "Eliminar")
                    },
                    //  {
                    // icon: ()=><SaveAltIcon/>,
                    // tooltip: "Export all selected rows",
                    // onClick: () => exportAllSelectedRows()
                    //  }
                    
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

export default MenuAdminV2;
