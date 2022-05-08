import { Button, Card, Col, Input } from "antd";
import { COFFEESELECT, DOC } from "config";
import React, { useState } from "react";
import { OrderInfo } from "types";
import styled from "styled-components";

const CardWrapper = styled.div`
  .ant-card-head-title {
    font-weight: bold;
    color: #666;
  }
  .ant-card-bordered {
    border: 2px solid #eaedfe;
  }
  .ant-card-head {
    border-bottom: 2px solid #eaedfe;
  }
  .drink {
    font-weight: bold;
    background: #eaedfe;
    margin-left: 5px;
    color: #333;
  }
`;
const ModifyCardWrapper = styled.div`
  .ant-card-bordered {
    border: 2px solid #000;
  }
  .ant-card-actions {
    border-top: 2px solid #000;
  }
  .ant-card-actions > li {
    margin: 6px 0 !important;
  }
  .ant-card-actions > li:not(:last-child) {
    border-right: 2px solid #000;
  }
`;

interface OrderListItemProps {
  orderInfo: OrderInfo[];
  orderKey: string;
  name: string;
  drink: string;
  option: string;
  orderUpdate: (order: OrderInfo[]) => void;
}
export default function OrderListItem({
  orderInfo,
  orderKey,
  name,
  drink,
  option,
  orderUpdate,
}: OrderListItemProps): JSX.Element {
  const [menuChange, setMenuChange] = useState<boolean>(false);
  const [changedOrderInfo, setChangedOrderInfo] = useState<OrderInfo>({
    key: orderKey,
    name,
    drink,
    option,
  });
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChangedOrderInfo({ ...changedOrderInfo, name: e.target.value });
  const onDrinkChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChangedOrderInfo({ ...changedOrderInfo, drink: e.target.value });
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChangedOrderInfo({ ...changedOrderInfo, option: e.target.value });

  const onMenuChange = () => {
    setMenuChange(!menuChange);
  };

  const onChangeOrder = () => {
    const changedOrders = orderInfo.map((data) => {
      if (data.key === orderKey) {
        return {
          key: orderKey,
          name: changedOrderInfo.name,
          drink: changedOrderInfo.drink,
          option: changedOrderInfo.option,
        };
      }
      return data;
    });
    orderUpdate(changedOrders);
    COFFEESELECT.doc(DOC).update({ order: changedOrders });
    onMenuChange();
  };
  const onChangeOrderCencel = () => {
    setChangedOrderInfo({
      key: orderKey,
      name,
      drink,
      option,
    });
    onMenuChange();
  };

  const onorderUpdate = () => {
    const filterOrderInfo = orderInfo.filter((data) => data.key !== orderKey);
    orderUpdate(filterOrderInfo);
    COFFEESELECT.doc(DOC).update({ order: filterOrderInfo });
  };
  return (
    <Col span={12}>
      {!menuChange && (
        <CardWrapper>
          <Card
            title={name}
            size="small"
            extra={
              <>
                <Button type="primary" ghost onClick={onMenuChange}>
                  Modify
                </Button>{" "}
                <Button danger onClick={onorderUpdate}>
                  Remove
                </Button>
              </>
            }
          >
            <div>
              Drink: <span className="drink">{drink}</span>
            </div>
            <div>Option: {option}</div>
          </Card>
        </CardWrapper>
      )}
      {menuChange && (
        <ModifyCardWrapper>
          <Card
            size="small"
            actions={[
              <Button type="primary" ghost onClick={onChangeOrder}>
                OK
              </Button>,
              <Button danger onClick={onChangeOrderCencel}>
                Cancel
              </Button>,
            ]}
          >
            <div>
              Name :
              <Input onChange={onNameChange} value={changedOrderInfo.name} />
            </div>
            <div>
              Drink:
              <Input onChange={onDrinkChange} value={changedOrderInfo.drink} />
            </div>
            <div>
              Option :
              <Input
                onChange={onOptionChange}
                value={changedOrderInfo.option}
              />
            </div>
          </Card>
        </ModifyCardWrapper>
      )}
    </Col>
  );
}
