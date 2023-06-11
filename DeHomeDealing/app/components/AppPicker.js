import {
  StyleSheet,
  Text,
  Modal,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import RegularText from "./texts/RegularText";
import AppButton from "./AppButton";

import colors from "../config/colors";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  items,
  numOfColumns,
  onSelectItem,
  placeholder,
  selectedItem,
  PickerItemComponent = PickerItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <RegularText style={styles.text}>{selectedItem.label}</RegularText>
          ) : (
            <RegularText style={styles.placeholder}>{placeholder}</RegularText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ marginHorizontal: 20 }}>
          <AppButton title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                  console.log(item);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
