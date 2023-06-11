import { StyleSheet } from "react-native";
import React from "react";

import { useFormikContext } from "formik";
import DatePicker from "../DatePicker";
import ErrorMessage from "../ErrorMessage";

function AppFormDatePicker({ name, placeholder }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <DatePicker
        onSelectDate={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedDate={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormDatePicker;

const styles = StyleSheet.create({});
