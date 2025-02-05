import React, { useMemo } from "react";

import { Skeleton, Card, Button, Typography, Table } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { handlePrice, getKey } from "@/utils";

const { Meta } = Card;
const { Title, Text } = Typography;

interface OrderItem {
  key: number;
  item: string;
  amount: string | number | JSX.Element;
}

const columns: ColumnsType<OrderItem> = [
  {
    title: "product",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "price",
    dataIndex: "amount",
    key: "amount",
  },
];

interface PropsType {
  loading: boolean;
  order: any;
  onCheckout: () => void;
}

export const CheckOutCard: React.FC<PropsType> = React.memo(
  ({ loading, order, onCheckout }) => {
    const navigate = useNavigate();

    const getPaymentData = useMemo(() => {
      return order
        ? order.orderItems.map((i, index) => ({
            key: getKey(),
            item: i.touristRoute.title,
            amount: i.discountPresent ? (
              <>
                <Text delete>¥ {handlePrice(i.originalPrice)} </Text>{" "}
                <Text type="danger" strong>
                  ¥ {handlePrice(i.originalPrice * i.discountPresent)}
                </Text>
              </>
            ) : (
              <>
                <Text>¥ {handlePrice(i.originalPrice)} </Text>
              </>
            ),
          }))
        : [];
    }, [order]);

    return (
      <Card
        style={{ width: 600, marginTop: 50 }}
        actions={[
          order && order.state === "Completed" ? (
            <Button
              type="primary"
              onClick={() => {
                navigate("/");
              }}
              loading={loading}
            >
              <HomeOutlined />
                back to the homepage
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              onClick={onCheckout}
              loading={loading}
            >
              <CheckCircleOutlined />
              pay
            </Button>
          ),
        ]}
      >
        <Skeleton loading={loading} active>
          <Meta
            title={
              <Title level={2}>
                {order && order.state === "Completed" ? "支付成功" : "总计"}
              </Title>
            }
            description={
              <Table<OrderItem>
                columns={columns}
                dataSource={getPaymentData}
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
