/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Button from "../ui/Button";
import FormRow from "./FormRow";
import Input from "./Input";
import { useLogin } from "../authentication/useLogin";
import { useForm } from "react-hook-form";
import {
  useAuthDispatch,
  useAuthState,
} from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { delay } from "../helpers/helpers";
import { setToken } from "../lib/http";

function LoginForm() {
  const { login, isLoading, axiosError } = useLogin();
  const dispatch = useAuthDispatch();

  const { register, handleSubmit } = useForm();

  async function handleLogin({ email, password }) {
    const response = await login({
      email,
      password,
    });
    await delay();
    if (response.status === 200) {
      dispatch({ type: "login-success", payload: response.data });
      setToken(response.data.access_token);
      navigate("/welcome");
    }
  }

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <FormRow label={"Email"}>
        <Input
          placeholder="Email"
          type="text"
          id="email"
          {...register("email")}
        />
      </FormRow>
      <FormRow label={"Password"}>
        <Input
          placeholder="Password"
          type="password"
          id="password"
          {...register("password")}
        />
      </FormRow>
      <FormRow>
        <Button size="small" variation="form">
          Login
        </Button>
      </FormRow>
    </form>
  );
}

export default LoginForm;
