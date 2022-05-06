import { Col, Modal, Row } from "antd";
import { COFFEESELECT, DOC } from "config";
import React, { useState } from "react";
import { OrderInfo } from "types";

interface AddModalProps {
  isModalVisible: boolean;
  orderInfo: OrderInfo[];
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderInfo: React.Dispatch<React.SetStateAction<OrderInfo[]>>;
}
export default function AddModal({
  isModalVisible,
  orderInfo,
  setIsModalVisible,
  setOrderInfo,
}: AddModalProps): JSX.Element {
  const [changedOrderInfo, setChangedOrderInfo] = useState<OrderInfo>({
    key: "",
    name: "",
    drink: "",
    option: "",
  });

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChangedOrderInfo({ ...changedOrderInfo, name: e.target.value });
  const onDrinkChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChangedOrderInfo({ ...changedOrderInfo, drink: e.target.value });
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChangedOrderInfo({ ...changedOrderInfo, option: e.target.value });

  const handleOk = () => {
    const newOrderInfo: OrderInfo[] = [...orderInfo];
    const lastKey =
      orderInfo.length === 0
        ? "0"
        : String(Number(orderInfo[orderInfo.length - 1].key) + 1);
    newOrderInfo.push({
      key: lastKey,
      name: changedOrderInfo.name,
      drink: changedOrderInfo.drink,
      option: changedOrderInfo.option,
    });
    setOrderInfo(newOrderInfo);
    COFFEESELECT.doc(DOC).update({ order: newOrderInfo });
    setIsModalVisible(false);
    setChangedOrderInfo({ key: "", name: "", drink: "", option: "" });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setChangedOrderInfo({ key: "", name: "", drink: "", option: "" });
  };

  return (
    <Modal
      title="Modify Order"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <Row gutter={[10, 0]}>
        <Col>
          <span> Name : </span>{" "}
          <input onChange={onNameChange} value={changedOrderInfo.name} />
        </Col>
        <Col>
          <span> Drink: </span>{" "}
          <input onChange={onDrinkChange} value={changedOrderInfo.drink} />
        </Col>
        <Col>
          <span> Option : </span>{" "}
          <input onChange={onOptionChange} value={changedOrderInfo.option} />
        </Col>
      </Row>
    </Modal>
  );
}
