import { useState } from 'react';
import Cadastro from "./assets/components/Cadastro";
import Login from "./assets/components/Login";
import Teste from "./assets/components/Teste";
import './App.css'

export default function () {
  const [route, setRoute] = useState("login")

  return <>
    {route == "login" ? <Login setRoute={setRoute} /> : ""}
    {route == "cadastro" ? <Cadastro setRoute={setRoute} /> : ""}
    {route == "teste" ? <Teste /> : ""}
  </>
}
