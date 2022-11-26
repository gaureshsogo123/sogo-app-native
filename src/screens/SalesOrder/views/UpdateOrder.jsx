import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import { Button, HelperText } from "react-native-paper";
import { TextInput, Text } from "react-native-paper";
import { useAuthContext } from "../../../contexts/authContext";
import {
  fetchProducts,
  saveOrder,
  getOrderDetails,
} from "../helpers/salesOrderHelper";
import { calculateTotal } from "../helpers/calculateTotal";
import Product from "./Product";

const styles = StyleSheet.create({
  heading: {
    padding: 10,
  },
  orderButton: {
    borderRadius: 3,
    paddingVertical: 5,
  },
});

function UpdateOrder({ navigation, route }) {
  const { user } = useAuthContext();
  const { order } = route.params;

  const { retailerId } = route.params;
  const [refreshing, setRefreshing] = useState(true);
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
        price.finalPrice,
        "cash",
        price.total,
        orderProducts,
        price.discount,
        retailerId
      );
      if (!result.error) {
        Alert.alert("Success", "Your order has been successfully placed!");
        navigation.navigate("Orders");
      } else setErrors({ ...errors, saveOrder: result.error });
    } catch (error) {
      setErrors({ ...errors, saveOrder: "Failed to save order" });
    }
  };

  useEffect(() => {
    if (!user) return;
    setErrors({ ...errors, products: "" });
    getProducts();
  }, [user?.userId, order.orderid]);

  const getProducts = async () => {
    setRefreshing(true);
    try {
      const products = await fetchProducts(user.userId, 0, "ALL");
      const orderDetails = await getOrderDetails(user.userId, order.orderid);
      if (orderDetails.data) {
        // map product quantity to product quantity in order
        products.data = products.data.map((product) => ({
          ...product,
          quantity:
            orderDetails.data.find(
              (oProduct) => oProduct.productid == product.productid
            )?.productquantity || 0,
          discount: product.discount || 0,
        }));
        setProducts(products.data);
      }
    } catch (err) {
      setErrors({ ...errors, products: "Failed to get products" });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setPrice(calculateTotal(products));
  }, [products]);

  const updateQuantity = (amount, id) => {
    setProducts((products) => {
      let obj = [...products];
      let index = obj.findIndex((item) => item.productid === id);
      obj[index].quantity = parseInt(amount || 0);
      return obj;
    });
  };

  const renderProduct = useCallback(({ item }) => {
    return <Product item={item} updateQuantity={updateQuantity} />;
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.productname.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter, products]);

  const productKeyExtractor = useCallback((product) => product.productid, []);

  return (
    <>
      <View style={styles.heading}>
        <Text style={{ marginBottom: 5 }} variant="titleLarge">
          <Text style={{ color: "gray" }}>Outlet:</Text> {order.name}
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
      {errors.products && (
        <HelperText visible={errors.products} type="error">
          {errors.products}{" "}
        </HelperText>
      )}
      <FlatList
        removeClippedSubviews={false}
        keyExtractor={productKeyExtractor}
        data={filteredProducts}
        renderItem={renderProduct}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getProducts()}
          />
        }
      />

      <Button onPress={placeOrder} mode="contained" style={styles.orderButton}>
        Update Order
      </Button>
    </>
  );
}

export default UpdateOrder;
