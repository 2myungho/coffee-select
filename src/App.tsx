import React, { useEffect, useMemo, useState } from "react";
import { OrderInfo, OrderMap } from "types";
import OrderList from "OrderList";
import { Button, Card, Col, Row } from "antd";
import { COFFEESELECT, DOC } from "config";
import AddModal from "AddModal";
import styled from "styled-components";

const Wrapper = styled.div`
  @media ${(props) => props.theme.mobile} {
    width: 350px;
    height: 600px;
    .contentsWrapper {
    }
  }
  width: 1200px;
  height: 800px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  .contentsHeader {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eaedfe;
  }
  .contentsWrapper {
    overflow-y: scroll;
    height: 726px;
    display: flex;
    padding-bottom: 20px;
  }
  .orderList {
  }
  .orderDetails {
    width: 400px;
    background: #fff;
    border-radius: 6px;
  }
  .orderDetail {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .drink {
      font-weight: bold;
      color: #333;
    }
  }
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

  const orderDetailsElement = useMemo(() => {
    const orderDetailsMap: {
      [key: string]: { count: number; options: string[] };
    } = {};
    orderInfo.forEach((data) => {
      if (data.drink) {
        const removeSpacesDrink = data.drink.replace(/(\s*)/g, "");
        if (Object.keys(orderDetailsMap).includes(removeSpacesDrink)) {
          orderDetailsMap[removeSpacesDrink] = {
            ...orderDetailsMap[removeSpacesDrink],
            count: (orderDetailsMap[removeSpacesDrink].count += 1),
            options: [
              ...orderDetailsMap[removeSpacesDrink].options,
              data.option,
            ],
          };
        } else {
          orderDetailsMap[removeSpacesDrink] = {
            count: 1,
            options: [data.option],
          };
        }
      }
    });
    return Object.entries(orderDetailsMap).map((data, index) => (
      <Row key={index} className="orderDetail">
        <Col className="drink">{data[0]}</Col>
        <Col>x {data[1].count}</Col>
        <Col span={24}>
          {data[1].options.map((option, index) => (
            <div key={index}>{option}</div>
          ))}
        </Col>
      </Row>
    ));
  }, [orderInfo]);

  const totalOrderCount = useMemo(() => {
    return orderInfo.filter((data) => data.drink).length;
  }, [orderInfo]);

  return (
    <Wrapper>
      <header className="contentsHeader">
        <Button type="primary" ghost onClick={showModal}>
          Order Add
        </Button>
        <AddModal
          isModalVisible={isModalVisible}
          orderInfo={orderInfo}
          setIsModalVisible={setIsModalVisible}
          setOrderInfo={setOrderInfo}
        />
      </header>
      <Row gutter={[10, 0]} className="contentsWrapper">
        <Col span={16} className="orderList">
          <OrderList orderInfo={orderInfo} orderUpdate={orderUpdate} />
        </Col>
        <Col span={8} className="orderDetails">
          <Card title={"Order details"} extra={`Total ${totalOrderCount}`}>
            {orderDetailsElement}
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default App;
