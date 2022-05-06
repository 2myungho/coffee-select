import { Row } from "antd";
import OrderListItem from "OrderListItem";
import React from "react";
import { OrderInfo } from "types";

interface OrderListProps {
  orderInfo: OrderInfo[];
  orderUpdate: (order: OrderInfo[]) => void;
}
export default function OrderList({
  orderInfo,
  orderUpdate,
}: OrderListProps): JSX.Element {
  const orderInfoListItem = orderInfo.map((data) => (
    <OrderListItem
      orderInfo={orderInfo}
      orderUpdate={orderUpdate}
      key={data.key}
      orderKey={data.key}
      name={data.name}
      drink={data.drink}
      option={data.option}
    />
  ));

  return <Row gutter={[10, 10]}>{orderInfoListItem}</Row>;
}
