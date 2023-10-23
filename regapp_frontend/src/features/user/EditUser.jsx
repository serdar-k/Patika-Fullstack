/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useResetPassword } from "../../authentication/useResetPassword";
import styled from "styled-components";
import { BiSave } from "react-icons/bi";
import { useMemo, useState } from "react";

const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: end;
`;

const Form = styled.form`
  font-size: 1rem;
`;

function EditUser() {
  const [newPass, setNewPass] = useState("");
  const [newPassAgain, setNewPassAgain] = useState("");

  const { register, handleSubmit } = useForm();

  const { resetPasswordAsync, isLoading, axiosError } = useResetPassword();

  function handleResetPassword({ oldpassword, newpassword, newpasswordagain }) {
    resetPasswordAsync({ oldpassword, newpassword });
  }

  const passwordMismatchError = useMemo(() => {
    if (newPass != newPassAgain) {
      return true;
    }
    return false;
  }, [newPass, newPassAgain]);

  return (
    <Form onSubmit={handleSubmit(handleResetPassword)}>
      <FormRow label={"Old password"}>
        <Input {...register("oldpassword")} type="password" />
      </FormRow>
      <FormRow label={"New password"}>
        <Input
          {...register("newpassword")}
          type="password"
          onChange={(e) => setNewPass(e.target.value)}
          mismatch={passwordMismatchError && "mismatch"}
        />
      </FormRow>
      <FormRow label={"New password again"}>
        <Input
          {...register("newpasswordagain")}
          type="password"
          onChange={(e) => setNewPassAgain(e.target.value)}
          mismatch={passwordMismatchError && "mismatch"}
        />
      </FormRow>
      <ButtonRow>
        <Button
          size={"xsmall"}
          variation={"primary"}
          style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
        >
          <BiSave />
          Save
        </Button>
        <Button size={"xsmall"} variation={"primary"}>
          Cancel
        </Button>
      </ButtonRow>
    </Form>
  );
}

export default EditUser;
