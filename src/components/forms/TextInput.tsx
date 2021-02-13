import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldValidator, useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  required?: boolean;
};

const TextInput = ({ label, size: _, required, ...props }: Props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} isRequired={required ?? false}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default TextInput;
