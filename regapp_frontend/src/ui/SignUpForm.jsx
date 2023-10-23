/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import FormRow from "./FormRow";
import Input from "./Input";
import Button from "./Button";
import { useSignup } from "../authentication/useSignup";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { delay } from "../helpers/helpers";
import { storeRefreshToken } from "../context/localStore";

function SignUpForm() {
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const navigate = useNavigate();

  const { t: translate } = useTranslation();

  // FORM VERILERI REACT HOOK FORM ILE ALINACAK
  const { register, formState, getValues, handleSubmit, reset } = useForm();

  const { signup, isLoading, axiosError } = useSignup();

  async function handleSignUp({ username, email, password }) {
    const response = await signup({ username, email, password });
    await delay();
    if (response.status === 200) {
      toast.promise(delay(), {
        loading: "Redirect to login page",
      });
      storeRefreshToken(response.data.refresh_token);
      console.log(response.data.refresh_token);
      await delay();
      toast.dismiss();
      navigate("/login");
    }
  }

  const passwordMismatchError = useMemo(() => {
    if (password && password !== passwordRepeat) {
      return true;
    }
    return false;
  }, [password, passwordRepeat]);

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <FormRow label={`${translate("username")}`}>
        <Input
          placeholder={`${translate("username")}`}
          type="text"
          id="username"
          {...register("username")}
        />
      </FormRow>
      <FormRow label={`${translate("email")}`}>
        <Input
          placeholder={`${translate("email")}`}
          type="text"
          id="email"
          formNoValidate
          {...register("email")}
        />
      </FormRow>
      <FormRow label={`${translate("password")}`}>
        <Input
          placeholder={`${translate("password")}`}
          type="password"
          id="password"
          {...register("password")}
          onChange={(e) => setPassword(e.target.value)}
          mismatch={passwordMismatchError && "mismatch"}
        />
      </FormRow>
      <FormRow label={`${translate("passwordRepeat")}`}>
        <Input
          placeholder={`${translate("passwordRepeat")}`}
          type="password"
          id="repassword"
          {...register("repassword")}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          mismatch={passwordMismatchError && "mismatch"}
        />
      </FormRow>
      <FormRow>
        <Button size="small" variation="form">
          {translate("signup")}
        </Button>
      </FormRow>
    </form>
  );
}

export default SignUpForm;
