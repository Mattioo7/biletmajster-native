import {Pressable, Text, View} from "react-native"
import {FlatList} from "react-native-gesture-handler"
import {ActivityIndicator, Button, Surface, TextInput} from "react-native-paper"
import Modal from 'react-native-modal';
import React, {useState} from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const ModalSelect = <T,>(
  props: {
    items: T[],
    renderItem: (arg0: T) => string,
    selectedIndex: number | undefined,
    setSelectedIndex?: (arg0: number | undefined) => void,
    refreshItems?: () => void,
    loading?: boolean,
    disabled?: boolean,
    label?: string
  }) => {

  const [open, setOpen] = useState(false);

  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <Modal isVisible={open}>
        <Surface style={{ borderRadius: 10, padding: 10 }}>
          {props.loading ? 
            <View style={{ paddingVertical: 10 }}>
              <ActivityIndicator animating={true} size={40} />
            </View>
          :
            <FlatList
              style={{ maxHeight: 500 }}
              data={props.items}
              renderItem={row =>
                <Pressable
                  style={{
                    padding: 5,
                    paddingVertical: 10,
                    alignContent: "center",
                    borderTopWidth: row.index === 0 ? 0 : 2,
                    borderTopColor: "#00000030"
                  }}
                  onPress={() => {
                    (props.setSelectedIndex ?? (() => { console.log("EmptyFunction") }))(row.index);
                    setOpen(false);
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    fontWeight: props.selectedIndex === row.index ? "bold" : "normal",
                    textAlign: "center"
                  }}>
                    {props.selectedIndex === row.index ?
                      <>
                        <MaterialCommunityIcons name="check-bold" size={16} />
                        &nbsp;
                      </>
                      : undefined}
                    {props.renderItem(row.item)}
                  </Text>
                </Pressable>
              } />
          }
          <View style={{ flexDirection: "row", gap: 5, marginTop: 5 }}>
            {
              props.selectedIndex === undefined ? undefined :
                <View style={{ flex: 1 }}>
                  <Button
                    icon={"trash-can"}
                    onPress={() => {
                      (props.setSelectedIndex ?? (() => { console.log("EmptyFunction") }))(undefined);
                      setOpen(false);
                    }}
                  >
                    Remove selection
                  </Button>
                </View>
            }
            <View style={{ flex: 1 }}>
              <Button
                icon={"keyboard-backspace"}
                onPress={() => setOpen(false)}
              >
                Return
              </Button>
            </View>
          </View>
        </Surface>
      </Modal>
      <TextInput
        label={props.label}
        mode="outlined"
        value={
          props.selectedIndex === undefined ? null as any :
            props.renderItem(props.items[props.selectedIndex])}
        right={
          <TextInput.Icon
            icon="chevron-down"
            onPress={() => setOpen(true)}
          />
        }
        focusable={false}
        editable={false}
        onChange={() => { console.log("EmptyFunction") }}
        style={{ width: "100%" }}
      />
    </View>
  );
} 