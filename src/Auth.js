import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // Para exibir erros

  const handleAuth = async () => {
    try {
      console.log("Iniciando autenticação...");
      if (isLogin) {
        console.log("Tentando login...");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login bem-sucedido:", userCredential.user);
        onLogin(userCredential.user);
      } else {
        console.log("Tentando registro...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registro bem-sucedido:", userCredential.user);
        onLogin(userCredential.user);
      }
      setErrorMessage(""); // Limpar mensagens de erro em caso de sucesso
    } catch (error) {
      console.error("Erro na autenticação:", error.message);
      setErrorMessage(error.message); // Exibir mensagem de erro
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Registro"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>{isLogin ? "Entrar" : "Registrar"}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
      </p>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Exibe erros */}
    </div>
  );
}

export default Auth;
