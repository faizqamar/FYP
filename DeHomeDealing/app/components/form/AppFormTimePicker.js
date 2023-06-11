import { StyleSheet } from "react-native";
import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import TimePicker from "../TimePicker";
import ErrorMessage from "../ErrorMessage";

function AppFormTimePicker({ name, placeholder }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  useEffect(() => {
    console.log("Time Changed", values[name]);
  }, []);

  return (
    <>
      <TimePicker
        onSelectTime={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedTime={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormTimePicker;

const styles = StyleSheet.create({});
