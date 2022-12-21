import React, { useRef } from "react"
import { useAuth } from "../../context"
import styled from "styled-components"

const Login = () => {
  const { login, isLoading, error } = useAuth()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleForm = async (e) => {
    e.preventDefault()
    login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
  }
  return (
    <Form onSubmit={handleForm}>
      {error ? <p>{error}</p> : null}
      <input type="text" placeholder="email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button type="submit">{isLoading ? "loading" : "Login"}</button>
    </Form>
  )
}

export default Login

const Form = styled.form`
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.13);
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 40rem;
  width: 90%;
  transform: translate(-50%, -50%);
  transition: transform 300ms, box-shadow 300ms;
  box-shadow: 5px 10px 10px rgba(rgba(2, 128, 144, 1), 0.2);

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    border-top-left-radius: 40%;
    border-top-right-radius: 45%;
    border-bottom-left-radius: 35%;
    border-bottom-right-radius: 40%;
    z-index: -1;
  }

  &::before {
    left: 40%;
    bottom: -130%;
    background-color: rgba(216, 74, 245, 0.15);
    animation: wawes 6s infinite linear;
  }

  &::after {
    left: 35%;
    bottom: -125%;
    background-color: rgba(216, 74, 245, 0.2);
    animation: wawes 7s infinite;
  }

  input {
    display: block;
    border-radius: 5px;
    font-size: 16px;
    background: #212121;
    width: 100%;
    border: 0;
    padding: 10px 10px;
    margin: 15px -10px;
    transition: border 0.1s linear;
    border: 1px solid transparent;
    &::placeholder {
      color: rgb(249, 249, 249, 0.5);
    }
    &:focus {
      outline: none;
      border: 1px solid rgb(216, 74, 245);
    }
  }

  button {
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;
    width: 80px;
    border: 0;
    padding: 10px 0;
    margin-top: 10px;
    margin-left: -5px;
    border-radius: 5px;
    background-color: rgb(216, 74, 245);
    transition: background-color 300ms;
    &:focus {
      outline: none;
      background-color: rgb(216, 74, 245, 0.7);
    }
    &:hover {
      background-color: rgb(216, 74, 245, 0.7);
    }
  }

  @keyframes wawes {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
