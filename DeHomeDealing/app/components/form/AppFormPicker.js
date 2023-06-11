import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {useFormikContext} from 'formik';
import AppPicker from '../AppPicker';
import ErrorMessage from '../ErrorMessage';

function AppFormPicker({
  items,
  numOfColumns,
  name,
  placeholder,
  PickerItemComponent,
}) {
  const {errors, setFieldValue, touched, values} = useFormikContext();

  return (
    <>
      <AppPicker
        PickerItemComponent={PickerItemComponent}
        numOfColumns={numOfColumns}
        items={items}
        onSelectItem={item => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;

const styles = StyleSheet.create({});
