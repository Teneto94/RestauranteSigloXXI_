import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../src/css/App.css'
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import {Modal, TextField, Button, Select, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
const baseUrl = "http://localhost:62856/api/PRODUCTOes";


const columns=[
    { title: 'Id' , field: 'ID'},
    { title: 'Nombre' , field: 'NOMBRE'},
    { title: 'Detalle' , field: 'DETALLE'},
    { title: 'Tipo Producto' , field: 'TIPOPRODUCTO.DESCRIPCION'},
    { title: 'Cantidad' , field: 'CANTIDAD'},
    { title: 'Unidad Medida', field: 'UNIDADMEDIDA.CODIGO'},
    { title: 'Precio de Venta', field: 'PRECIOVENTA'},
    { title: 'Precio de Costo', field: 'PRECIOCOSTO'},
    { title: 'Proveedor', field: 'PROVEEDOR.NOMBRE'},
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

  function ControlProductos(){
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [proveedores, setProveedores] = useState({});
  const [productoSeleccionado, setproductoSeleccionado]=useState({
    ID: "",
    NOMBRE: "",
    DETALLE: "",
    TIPOPRODUCTOID: "",
    CANTIDAD: "",
    UNIDADMEDIDAID: "",
    PRECIOCOSTO: "",
    PRECIOVENTA: "",
    PROVEEDORID: ""


  })
    
  const obtenerProveedor= async () => {
    try {
      const response = await axios({
        url: "http://localhost:62856/api/PRODUCTOes",
      });
      setProveedores(response.data);
      console.log(proveedores);
    } catch (error) {
      console.log(error);
    }
  };


    const handleChange=e=>{
        const {name, value}=e.target;
        setproductoSeleccionado(prevState=>({
          ...prevState,
          [name]: value
        }));
      }

      const peticionPost=async()=>{
        delete productoSeleccionado.ID;
        await axios.post(baseUrl, productoSeleccionado)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).then(response=>{
          swal({
            title: "Buen trabajo!",
            text: "Producto registrado con exito",
            icon: "success",
          });
        })
        .catch(error=>{
          console.log(error);
        })
      }


      const peticionPut=async()=>{
        await axios.put(baseUrl+"/"+productoSeleccionado.ID, productoSeleccionado)
        .then(response=>{
          var dataNueva=data;
          dataNueva.map(producto=>{
              if(producto.ID === productoSeleccionado.ID){
                producto.NOMBRE = productoSeleccionado.NOMBRE;
                producto.DETALLE = productoSeleccionado.DETALLE;
                producto.TIPOPRODUCTOID = productoSeleccionado.TIPOPRODUCTOID;
                producto.CANTIDAD = productoSeleccionado.CANTIDAD;
                producto.UNIDADMEDIDAID = productoSeleccionado.UNIDADMEDIDAID;
                producto.PRECIOVENTA = productoSeleccionado.PRECIOVENTA;
                producto.PRECIOCOSTO = productoSeleccionado.PRECIOCOSTO;
                producto.PROVEEDORID = productoSeleccionado.PROVEEDORID;
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
        await axios.delete(baseUrl+"/"+productoSeleccionado.ID)
        .then(response=>{
          setData(data.filter(producto=>producto.ID!==productoSeleccionado.ID));
          abrirCerrarModalEliminar();
        }).catch(error=>{
          console.log(error);
        })
      }


    const seleccionarProducto=(Producto, caso)=>{
        setproductoSeleccionado(Producto);
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
    obtenerProveedor();
},[])
    


    const bodyInsertar=(
        <div className={styles.modal}>
          <h3>Agregar Producto</h3>

     <TextField className={styles.inputMaterial} label="Nombre " name="NOMBRE" onChange={handleChange}/>          
    <br />
    <TextField className={styles.inputMaterial} label="Detalle" name="DETALLE" onChange={handleChange}/>
          <br />
    <TextField className={styles.inputMaterial} label="Cantidad" name="CANTIDAD" onChange={handleChange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Precio Venta" name="PRECIOVENTA" onChange={handleChange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Precio Costo" name="PRECIOCOSTO" onChange={handleChange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Proveedor" name="PROVEEDORID" onChange={handleChange}/>
    <br/> {[proveedores].map((prop)=>{
      return (
        <p>{prop}</p>
      )
    }
    )} 
    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="TIPOPRODUCTOID"
          name="TIPOPRODUCTOID"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">Insumo</MenuItem>
          <MenuItem value="2">Consumible</MenuItem>
    </Select>
          <br /><br />
    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="UNIDADMEDIDAID"
          name="UNIDADMEDIDAID"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">kilogramo</MenuItem>
          <MenuItem value="2">gramo</MenuItem>
          <MenuItem value="3">unitario</MenuItem>
          <MenuItem value="4">litro</MenuItem>
          <MenuItem value="5">mililitro</MenuItem>
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
          <h3>Editar Producto</h3>
     <TextField className={styles.inputMaterial} label="Nombre " name="NOMBRE" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.NOMBRE} />          
    <br />
    <TextField className={styles.inputMaterial} label="Detalle" name="DETALLE" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.DETALLE} />
          <br />
    <TextField className={styles.inputMaterial} label="Cantidad" name="CANTIDAD" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.CANTIDAD}/>
    <br />
    <TextField className={styles.inputMaterial} label="Precio Venta" name="PRECIOVENTA" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.PRECIOVENTA}/>
    <br />
    <TextField className={styles.inputMaterial} label="Precio Costo" name="PRECIOCOSTO" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.PRECIOCOSTO}/>
    <br />
    <TextField className={styles.inputMaterial} label="Proveedor" name="PROVEEDORID" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.PROVEEDORID}/>
    <br />
    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="TIPOPRODUCTOID"
          name="TIPOPRODUCTOID"
          onChange={handleChange}
          value={productoSeleccionado&&productoSeleccionado.TIPOPRODUCTOID}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">Insumo</MenuItem>
          <MenuItem value="2">Consumible</MenuItem>

    </Select>
          <br /><br />
          <br />
    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="UNIDADMEDIDAID"
          name="UNIDADMEDIDAID"
          onChange={handleChange}
          value={productoSeleccionado&&productoSeleccionado.UNIDADMEDIDAID}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">kilogramo</MenuItem>
          <MenuItem value="2">gramo</MenuItem>
          <MenuItem value="3">unitario</MenuItem>
          <MenuItem value="4">litro</MenuItem>
          <MenuItem value="5">mililitro</MenuItem>

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
          <p>Estás seguro que deseas eliminar el Producto? <b>{productoSeleccionado && productoSeleccionado.NOMBRE}</b>? </p>
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
                title="Productos Restaurant Siglo XXI"
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar Producto',
                      onClick: (event, rowData) => seleccionarProducto(rowData, "Editar")
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Eliminar Usuario',
                      onClick: (event, rowData) => seleccionarProducto(rowData, "Eliminar")
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

export default ControlProductos;