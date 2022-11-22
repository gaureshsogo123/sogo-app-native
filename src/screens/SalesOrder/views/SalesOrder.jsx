import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, HelperText, useTheme } from "react-native-paper";
import { TextInput, Text } from "react-native-paper";
import { useAuthContext } from "../../../contexts/authContext";
import { fetchProducts } from "../helpers/salesOrderHelper";

const styles = StyleSheet.create({
  heading: {
    padding: 10,
  },
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
  orderButton: {
    borderRadius: 3,
    paddingVertical: 5,
  },
});

function SalesOrder({ route }) {
  const theme = useTheme();

  const { user } = useAuthContext();

  const { retailerId, retailerName } = route.params;
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    if (!user) return;
    setErrors({ ...errors, products: "" });
    const getProducts = async () => {
      try {
        const products = await fetchProducts(user.userId, 0, "ALL");
        if (products.data.length === 0)
          setErrors({
            ...errors,
            products: "You do not have any products yet",
          });
        else setProducts(products.data);
      } catch (err) {
        setErrors({ ...errors, products: "Failed to get products" });
      }
    };
    getProducts();
  }, [user?.userId]);

  useEffect(() => {
    calculateTotal();
  }, [products]);

  const updateUnits = (amount, id) => {
    setProducts((products) => {
      let obj = [...products];
      let index = obj.findIndex((item) => item.productid === id);
      obj[index].units = parseInt(amount || 0);
      return obj;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * (product.units || 0);
    });
    setTotalPrice(total);
  };

  const renderProduct = useCallback(({ item }) => {
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
          <Text variant="titleSmall">Total: {item.price * item.units} </Text>
        </View>
        <View style={styles.unitSection}>
          <TextInput
            keyboardType="number-pad"
            style={styles.unitInput}
            variant="flat"
            value={item.units === 0 ? "" : item.units + ""}
            onChangeText={(text) => updateUnits(text, item.productid)}
          />
          <Text variant="labelLarge"> units</Text>
        </View>
      </View>
    );
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.productname.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter, products]);

  const productKeyExtractor = useCallback((product) => product.productid);

  return (
    <>
      <View style={styles.heading}>
        <Text style={{ marginBottom: 5 }} variant="titleLarge">
          Outlet: {retailerName}
        </Text>
        <Text style={{ marginBottom: 5 }} variant="titleMedium">
          Total Price: {`\u20B9`} {parseFloat(totalPrice).toFixed(2)}
        </Text>
      </View>

      <TextInput
        value={searchFilter}
        mode="flat"
        placeholder="Search products"
        onChangeText={(text) => setSearchFilter(text)}
      />
      <HelperText visible={errors.products} type="error">
        {errors.products}{" "}
      </HelperText>
      {!products.length ? (
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          There are no products!{" "}
        </Text>
      ) : (
        <FlatList
          removeClippedSubviews={false}
          keyExtractor={productKeyExtractor}
          data={filteredProducts}
          renderItem={renderProduct}
        />
      )}

      <Button mode="contained" style={styles.orderButton}>
        Place Order
      </Button>
    </>
  );
}

export default SalesOrder;
