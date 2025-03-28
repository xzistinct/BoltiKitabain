import BookImage from "@/components/BookImage";
import BookModal from "@/components/BookModal";
import { GREY, LIGHTBROWN } from "@/constants/colors";
import { book } from "@/constants/types";
import { endpoints } from "@/helpers/endpoints";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const SHELFBOTTOM = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        width: 5 * (width / 100),
        height: 0,
        borderTopWidth: 10,
        borderTopColor: LIGHTBROWN,

        borderLeftWidth: 1 * (width / 100),
        borderLeftColor: "transparent",
        borderRightWidth: 1 * (width / 100),
        borderRightColor: "transparent",
        borderStyle: "solid",
      }}
    />
  );
};

export default function Shelf({
  books,
  behaviour,
  emptyMessage,
}: {
  books: book[] | null;
  behaviour: "Open" | "Modal";
  emptyMessage: string;
}) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<book | null>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        width: 90 * (width / 100),
        marginHorizontal: "auto",
      }}
    >
      <View
        style={{
          paddingHorizontal: 5 * (width / 100),
          marginBottom: 0.5 * (height / 100),
          height: 20 * (height / 100),
        }}
      >
        {books !== null && books.length > 0 ? (
          <FlatList
            horizontal
            data={books}
            style={{ width: "100%" }}
            nestedScrollEnabled
            renderItem={(item) => (
              <TouchableOpacity
                style={{
                  backgroundColor: GREY,
                  marginRight: 5 * (width / 100),
                }}
                onPress={() => {
                  if (behaviour === "Open") {
                    //@ts-ignore
                    navigation.navigate("Player", { bookId: item.item.id });
                  } else if (behaviour === "Modal") {
                    setSelectedBook(item.item);
                    setModalVisible(true);
                  }
                }}
              >
                <BookImage id={item.item.image} height={0.2 * height} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text
            style={{
              fontSize: 5 * (width / 100),
              textAlign: "center",
              marginVertical: "auto",
            }}
          >
            {emptyMessage}
          </Text>
        )}
      </View>
      <View
        style={{
          width: "100%",
          height: 2 * (height / 100),
          backgroundColor: LIGHTBROWN,
          borderRadius: 5,
          marginHorizontal: "auto",
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <SHELFBOTTOM />
        <SHELFBOTTOM />
      </View>
      {modalVisible && selectedBook && (
        <BookModal
          book={selectedBook}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
}
