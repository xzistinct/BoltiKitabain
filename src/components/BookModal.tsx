import { useState } from "react";
import {
  Modal,
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback
} from "react-native";

import {GuestureRecognizerView} from "react-native-gesture-handler"

export default function BookModal() {
  const { width, height } = useWindowDimensions();

  const [modalVisble, setModalVisible] = useState(true);
  return (
    <GestureRec
    <Modal
      animationType="slide"
      visible={modalVisble}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          height: height / 2,
          width: width,
        }}
      >
        <Text>Hello</Text>
      </View>
    </Modal>
  );
}
