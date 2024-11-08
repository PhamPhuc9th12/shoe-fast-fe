
import React, { useState, useEffect } from "react";
import { getOrderById, getOrderDetailByOrderId } from "../api/OrderApi";
import { Card, Button } from "react-bootstrap";
import { FaTruck, FaMoneyCheckAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons
import '../index.css'; // Custom CSS

const OrderDetail = (props) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [order, setOrder] = useState({});
  const [amount, setAmount] = useState();
  const [sale, setSale] = useState();
  const [total, setTotal] = useState();

  const url = new URL(window.location.href);
  const orderId = url.pathname.split("/").pop(); // Get order ID from URL

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getOrderById(orderId).then((resp) => {
      setOrder(resp.data);
      setSale(resp.data.voucher ? resp.data.voucher.discount : 0);
      setTotal(resp.data.total);
    });
    getOrderDetailByOrderId(orderId).then((resp) => {
      setOrderDetail(resp.data);
      const result = resp.data.reduce(
        (price, item) => price + item.sellPrice * item.quantity,
        0
      );
      setAmount(result);
    });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Order Information */}
        <div className="col-lg-8">
          <Card className="order-card mb-4">
            <Card.Body>
              <h4 className="text-primary">
                <FaTruck className="mr-2" /> Đơn hàng #{order.id}
              </h4>
              <table className="table table-striped table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Size</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td>{item.attributeId}</td>
                      <td>{item.attributeSize}</td>
                      <td>{item.sellPrice.toLocaleString()}₫</td>
                      <td>{item.quantity}</td>
                      <td>{(item.sellPrice * item.quantity).toLocaleString()}₫</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right">
                <p>Tạm tính: {amount && amount.toLocaleString()} đ</p>
                <p>Giảm giá: - {sale ? ((amount * sale) / 100).toLocaleString() : 0} đ</p>
                <h5 className="text-danger">Tổng cộng: {total && total.toLocaleString()} đ</h5>
              </div>
            </Card.Body>
          </Card>

          {/* Order Status and Payment */}
          <div className="row">
            <div className="col-md-6">
              <Card className="mb-4 order-card">
                <Card.Body>
                  <h5 className="text-primary">
                    <FaMoneyCheckAlt className="mr-2" /> Trạng thái thanh toán
                  </h5>
                  <p className={`text-${order.isPending ? "success" : "danger"}`}>
                    {order.isPending ? (
                      <>
                        <FaCheckCircle className="mr-2" /> Đã thanh toán
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="mr-2" /> Chưa thanh toán
                      </>
                    )}
                  </p>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="mb-4 order-card">
                <Card.Body>
                  <h5 className="text-primary">
                    Trạng thái đơn hàng
                  </h5>
                  <p className="text-info">
                    {order.orderStatus && order.orderStatus.name}
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Delivery Method */}
          <Card className="mb-4 order-card">
            <Card.Body>
              <h5 className="text-primary">
                Phương thức giao hàng
              </h5>
              <p className="text-info">{order.payment}</p>
            </Card.Body>
          </Card>
        </div>

        {/* Customer Information */}
        <div className="col-lg-4">
          <Card className="mb-4 order-card">
            <Card.Body>
              <h5 className="text-danger">Thông tin mua hàng</h5>
              <p>Ngày tạo: {order.createDate}</p>
              <p>Người nhận: {order.fullName}</p>
              <p>Email: {order.email}</p>
            </Card.Body>
          </Card>

          <Card className="mb-4 order-card">
            <Card.Body>
              <h5 className="text-danger">Địa chỉ nhận hàng</h5>
              <p>SDT: {order.phone}</p>
              <p>DC: {order.address}</p>
            </Card.Body>
          </Card>

          {/* Buttons for actions */}
          <div className="text-center">
            <Button variant="primary" className="mr-2">
              In đơn hàng
            </Button>
            <Button variant="outline-danger">Đặt lại</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
