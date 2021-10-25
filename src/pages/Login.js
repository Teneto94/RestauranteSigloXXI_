import React, { useState } from 'react';
import '../../src/css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';



function Login(props) {

const baseUrl = "http://localhost:62856/api/USUARIOs";
const cookies = new Cookies();

const [form, setForm] = useState({
    username: '',
    password: ''
});

const handleChange=e=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    });
     }

const iniciarSesion=async()=>{
    await axios.get(baseUrl+`/?username=${form.username}&password=${md5(form.password)}`)
    .then(response=>{
        return response.data
      })
      .then(response=>{
        if(response.ID>0){
            console.log(response.ROLID);
            alert('Bienvenido a Restaurant Siglo XXI');
            props.history.push('/menuAdminV2');
            if(response.ROLID==1){
                props.history.push('/HomeAdministrador');
            } else if (response.ROLID==2){
                props.history.push('/HomeBodega');
              } else if (response.ROLID==3){
                props.history.push('/');
              } else if (response.ROLID==4){
                props.history.push('/HomeCocina');
              } else if (response.ROLID==5){
                props.history.push('/menuProductos');
              } else if (response.ROLID==6){
                props.history.push('/menuProductos');
              } else if (response.ROLID==7){
                props.history.push('/HomeRecepcion');
              } else if (response.ROLID==8){
                props.history.push('/menuProductos');
            } else{
               alert("No tiene un rol asignado a su usuario")
            }

        }else{
          alert('El usuario o la contraseña no son correctos');
        }
      })
      
      .catch(error=>{
        console.log(error);
      })
    }
    
        return (
            <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="box">
                    <h1>Restaurant Siglo XXI</h1>
                    <p className="text-muted"> Porfavor introduce tu Email y contraseña</p>
                     <input type="text" name="username" onChange={handleChange} placeholder="Email" /> 
                     <input type="password" name="password" onChange={handleChange} placeholder="Contraseña" /> 
                     <input type="submit"  defaultValue="Login" onClick={()=>iniciarSesion()} placeholder="Iniciar sesión" />
                    <div className="col-md-12">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }


export default Login;