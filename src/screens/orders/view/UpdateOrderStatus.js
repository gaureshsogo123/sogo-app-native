import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { getOrderStatus, editOrderStatus } from "../helpers/ordersHelper";
import { Alert } from "react-native";
import { Modal, Portal, Provider, Text } from "react-native-paper";

const containerStyle = {
  backgroundColor: "white",
  padding: 20,
  alignItems: "center",
  width: "95%",
  marginLeft: "3%",
};

function UpdateOrderStatus({ value, hideModal, setOrders, visible }) {
  const [orderStatusIdMap, setOrderStatusIdMap] = useState();

  useEffect(() => {
    fetchOrderStatus();
  }, []);

  const fetchOrderStatus = async () => {
    try {
      const response = await getOrderStatus();
      setOrderStatusIdMap(response.data);
    } catch (error) {
      Alert.alert("", "There was an error");
    }
  };

  const updateOrderStatus = async (newStatus) => {
    const statusId = orderStatusIdMap.find(
      (status) => status.orderstatus === newStatus
    ).orderstatusid;
    try {
      const response = await editOrderStatus(
        value.orderid,
        statusId,
        newStatus
      );
      if (response.data) setOrders(response.data);
    } catch (error) {
      Alert.alert("Error", "There was an error");
    } finally {
      hideModal();
    }
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text variant="titleMedium">Select Status</Text>
          <Picker
            style={{ marginVertical: 10, width: 200 }}
            selectedValue={value.currentStatus}
            onValueChange={(val) => updateOrderStatus(val)}
          >
            {orderStatusIdMap?.map((s) => (
              <Picker.Item
                key={s.orderstatusid}
                label={s.orderstatus}
                value={s.orderstatus}
              />
            ))}
          </Picker>
        </Modal>
      </Portal>
    </Provider>
  );
}

export default UpdateOrderStatus;
