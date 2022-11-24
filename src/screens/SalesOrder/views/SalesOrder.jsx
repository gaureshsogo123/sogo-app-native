import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Button, HelperText, useTheme } from "react-native-paper";
import { TextInput, Text } from "react-native-paper";
import { useAuthContext } from "../../../contexts/authContext";
import { fetchProducts, saveOrder } from "../helpers/salesOrderHelper";

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

function SalesOrder({ route, navigation }) {
  const theme = useTheme();

  const { user } = useAuthContext();

  const { retailerId, retailerName } = route.params;
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [price, setPrice] = useState({ total: 0, discount: 0, finalPrice: 0 });
  const [searchFilter, setSearchFilter] = useState("");

  const placeOrder = async () => {
    setErrors({ ...errors, saveOrder: "" });
    const orderProducts = products.filter((product) => product.quantity !== 0);
    if (orderProducts.length === 0) return;
    try {
      const result = await saveOrder(
        user.userId,
        orderProducts.length,
        price.total,
        "cash",
        price.finalPrice,
        orderProducts,
        price.discount,
        retailerId
      );
      if (!result.error)navigation.navigate("My Orders")        
      else setErrors({ ...errors, saveOrder: result.error });
    } catch (error) {
      setErrors({ ...errors, saveOrder: "Failed to save order" });
    }
  };

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
        else {
          products.data = products.data.map((product) => ({
            ...product,
            quantity: product.quantity || 0,
            discount: product.discount || 0,
          }));
          setProducts(products.data);
        }
      } catch (err) {
        setErrors({ ...errors, products: "Failed to get products" });
      }
    };
    getProducts();
  }, [user?.userId]);

  useEffect(() => {
    calculateTotal();
  }, [products]);

  const updateQuantity = (amount, id) => {
    setProducts((products) => {
      let obj = [...products];
      let index = obj.findIndex((item) => item.productid === id);
      obj[index].quantity = parseInt(amount || 0);
      return obj;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    let discount = 0;
    let finalPrice = 0;
    products.forEach((product) => {
      finalPrice +=
        (product.price - product.discount) * (product.quantity || 0);
      discount += product.discount * (product.quantity || 0);
      total += product.price * (product.quantity || 0);
    });
    setPrice({ total, discount, finalPrice });
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
         <Text style={{color:"gray"}}>Outlet:</Text> {retailerName}
        </Text>
        <Text style={{ marginBottom: 5 }} variant="titleMedium">
          Total Amount : {`\u20B9`} {parseFloat(price.total).toFixed(2)}
        </Text>
      </View>

      <TextInput
        value={searchFilter}
        mode="flat"
        placeholder="Search Products"
        onChangeText={(text) => setSearchFilter(text)}
      />
      <HelperText visible={errors.products} type="error">
        {errors.products}{" "}
      </HelperText>
      <HelperText visible={errors.saveOrder} type="error">
        {errors.saveOrder}{" "}
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

      <Button onPress={placeOrder} mode="contained" style={styles.orderButton}>
        Place Order
      </Button>
    </>
  );
}

export default SalesOrder;
