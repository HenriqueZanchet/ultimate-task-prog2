import { Dispatch, FormEventHandler, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type Login = {
  email?: string;
  password?: string;
}

export default function ({ setRoute }: { setRoute: Dispatch<SetStateAction<string>> }) {
  const enviarDados: FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    const { email, password } = ev.currentTarget
    alert(`email:${email}, password:${password}`)
    const request = await fetch(`/api/login/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const responseData = await request.json()

    if (request.status >= 200 && request.status <= 299) {
      localStorage.setItem("token", responseData.token)
      alert("PARABAEINZ!")
      setRoute("teste")
      return
    }

    if (responseData.error) {
      alert(responseData.error)
      return
    }

    alert("Cara! deu um erro tão foda, que eu nem sei o que foi!")
  }

  const {register, handleSubmit} = useForm<Login>()

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data))
  })

  return <>
    <div className='bg'></div>
    <div className="modal">
      <h1>Login</h1>
      <form onSubmit={onSubmit} id="login">
        <div>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="text" {...register("email")} placeholder="E-mail"/>
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input data-mascara="password" id="password" type="password" {...register("password")} placeholder="Senha"/>
        </div>
      <div className="action">
        <button type="submit" form="login">Entrar</button>
        <button onClick={() => setRoute("cadastro")}>Cadastrar-se</button>
      </div>
      </form>
    </div>
  </>
}