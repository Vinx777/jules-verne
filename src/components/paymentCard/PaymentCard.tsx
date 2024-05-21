import React from "react";

import { Skeleton, Card, Button, Typography, Table } from "antd";
import { DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { handlePrice } from "@/utils";

const { Meta } = Card;
const { Title, Text } = Typography;

interface Item {
  key: number;
  item: string;
  amount: string | number | JSX.Element;
}

const columns: ColumnsType<Item> = [
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

interface PropsType {
  loading: boolean;
  originalPrice: number;
  price: number;
  onShoppingCartClear: () => void;
  onCheckout: () => void;
}

export const PaymentCard: React.FC<PropsType> = React.memo(
  ({ loading, originalPrice, price, onShoppingCartClear, onCheckout }) => {
    const paymentData: Item[] = [
      {
        key: 1,
        item: "original price",
        amount: <Text delete>¥ {handlePrice(originalPrice)}</Text>,
      },
      {
        key: 3,
        item: "current price",
        amount: (
          <Title type="danger" level={2}>
            ¥ {handlePrice(price)}
          </Title>
        ),
      },
    ];

    return (
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <Button type="primary" danger onClick={onCheckout} loading={loading}>
            <CheckCircleOutlined />
            order and pay
          </Button>,
          <Button onClick={onShoppingCartClear} loading={loading}>
            <DeleteOutlined />
            clear
          </Button>,
        ]}
      >
        <Skeleton loading={loading} active>
          <Meta
            title={<Title level={2}>总计</Title>}
            description={
              <Table<Item>
                columns={columns}
                dataSource={paymentData}
                showHeader={false}
                size="small"
                bordered={false}
                pagination={false}
              />
            }
          />
        </Skeleton>
      </Card>
    );
  }
);
