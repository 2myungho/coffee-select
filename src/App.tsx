import React, { useEffect, useState } from "react";
import { OrderInfo, OrderMap } from "types";
import OrderList from "OrderList";
import { Button } from "antd";
import { COFFEESELECT, DOC } from "config";
import AddModal from "AddModal";
import styled from "styled-components";

const ContentsWrapper = styled.div`
  min-width: 800px;
  height: 800px;
  overflow-y: scroll;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 6px;
`;
const ContentsHeader = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eaedfe;
`;

function App(): JSX.Element {
  const [orderInfo, setOrderInfo] = useState<OrderInfo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const orderUpdate = (orders: OrderInfo[]) => {
    setOrderInfo(orders);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    COFFEESELECT.doc(DOC)
      .get()
      .then((data) => {
        const orderMap = data.data() as OrderMap;
        setOrderInfo(orderMap.order);
      });
  }, []);

  return (
    <ContentsWrapper>
      <ContentsHeader>
        <Button type="primary" ghost onClick={showModal}>
          Order Add
        </Button>
      </ContentsHeader>
      <AddModal
        isModalVisible={isModalVisible}
        orderInfo={orderInfo}
        setIsModalVisible={setIsModalVisible}
        setOrderInfo={setOrderInfo}
      />
      <OrderList orderInfo={orderInfo} orderUpdate={orderUpdate} />
    </ContentsWrapper>
  );
}

export default App;
