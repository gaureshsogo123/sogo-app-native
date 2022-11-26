import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Text, TextInput } from "react-native-paper";

const styles = StyleSheet.create({
  product: {
    margin: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  price: {
    color: "gray",
  },
  unitSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  unitInput: {
    width: 70,
    textAlign: "center",
    paddingHorizontal: 1,
    paddingBottom: 1,
  },
});
function Product({ item, updateQuantity }) {
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.product,
        borderBottomColor: theme.colors.primary,
      }}
    >
      <View>
        <Text variant="titleMedium">{item.productname} </Text>
        <Text style={styles.price} variant="titleSmall">
          Price: {item.price}{" "}
        </Text>
        <Text variant="titleSmall">
          Amount: {(item.price - item.discount) * item.quantity}{" "}
        </Text>
      </View>
      <View style={styles.unitSection}>
        <TextInput
          keyboardType="number-pad"
          style={styles.unitInput}
          variant="flat"
          value={item.quantity === 0 ? "" : item.quantity + ""}
          onChangeText={(text) => updateQuantity(text, item.productid)}
        />
        <Text variant="labelLarge"> units</Text>
      </View>
    </View>
  );
}

export default Product;
