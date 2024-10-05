import { TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const debounceTimer = 2000;
const schema = yup.object({
  searchValue: yup
    .string()
    .required("Search field can not be empty, type in something"),
});

export default function useSearchInputBuilder() {
  const [submittedValue, setSubmittedValue] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    trigger,
  } = useForm<{ searchValue: string }>({
    defaultValues: {
      searchValue: "",
    },
    resolver: yupResolver(schema),
  });

  // Initial focus and validation
  useEffect(() => {
    trigger(["searchValue"]);
  }, [trigger]);

  const searchValue = watch("searchValue");
  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const timer = setTimeout(() => {
      handleSubmit(handleSearch)();
    }, debounceTimer);
    return () => clearTimeout(timer);
  }, [handleSubmit, searchValue, errors?.searchValue?.message]);

  const handleSearch = (data: { searchValue: string }) => {
    setSubmittedValue(data.searchValue);
  };

  const fieldErrorMsg = errors?.searchValue?.message;

  const searchNode = (
    <form
      role="search"
      onSubmit={handleSubmit(handleSearch)}
      onBlur={fieldErrorMsg ? undefined : handleSubmit(handleSearch)}
    >
      <TextField
        fullWidth
        id="search-input"
        label="Search"
        variant="outlined"
        {...register("searchValue")}
      />
      {fieldErrorMsg ? <p>{fieldErrorMsg}</p> : null}
    </form>
  );

  return {
    inputNode: searchNode,
    inputValue: submittedValue,
  };
}
