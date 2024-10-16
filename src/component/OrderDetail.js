// import React, { useState, useEffect } from "react";
// import { getOrderById, getOrderDetailByOrderId } from "../api/OrderApi";

// const OrderDetail = (props) => {
//   const [orderDetail, setOrderDetail] = useState([]);
//   const [order, setOrder] = useState({});
//   const [amount, setAmount] = useState();
//   const [sale, setSale] = useState();
//   const [total, setTotal] = useState();

//   const url = new URL(window.location.href);
//   const orderId = url.pathname.split('/').pop(); // Lấy ID từ đường dẫn

//   // const encode = atob(
//   //   window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
//   // );

//   useEffect(() => {
//     onLoad();
//   }, []);

//   const onLoad = () => {
//     getOrderById(orderId).then((resp) => {
//       setOrder(resp.data);
//       setSale(resp.data.voucher ? resp.data.voucher.discount : 0);
//       setTotal(resp.data.total);
//     });
//     getOrderDetailByOrderId(orderId).then((resp) => {
//       setOrderDetail(resp.data);
//       const result = resp.data.reduce(
//         (price, item) => price + item.sellPrice * item.quantity,
//         0
//       );
//       setAmount(result);
//     });
//   };

//   return (
//     <div className="container-fluid row padding mb-5">
//       <div className="col-10 offset-1 text ">
//         <p className="display-4 text-primary" style={{ fontSize: "34px", fontWeight: "bolder" }}>
//           Đơn hàng #{order.id}
//         </p>
//       </div>
//       <div className="col-8 welcome mb-5 mt-5">
//         <div className="col-10 offset-1 mb-5">
//           <table className="table table-striped table-bordered">
//             <thead>
//               <tr>
//                 <th scope="col">Mã sản phẩm</th>
//                 <th scope="col">Size</th>
//                 <th scope="col">Giá</th>
//                 <th scope="col">Số lượng</th>
//                 <th scope="col">Tổng</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderDetail &&
//                 orderDetail.map((item, index) => (
//                   <tr key={index}>
//                     <th scope="row">{item.attributeId}</th>
//                     <td>{item.attributeSize}</td>
//                     <td>{item.sellPrice.toLocaleString()}₫</td>
//                     <td>{item.quantity}</td>
//                     <td>
//                       {(item.sellPrice * item.quantity).toLocaleString()}₫
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//           <div className="row mb-5">
//             <div className="col offset-8 text ">
//               <p>Tạm tính: {amount && amount.toLocaleString()} đ</p>
//               <p>
//                 Giảm giá: -{" "}
//                 {sale ? ((amount * sale) / 100).toLocaleString() : 0} đ
//               </p>
//               <p className="text-danger">
//                 Tổng cộng: {total && total.toLocaleString()} đ
//               </p>
//             </div>
//           </div>
//           <div className="row mb-5">
//             <div className="col text ">
//               <p
//                 className="display-4 text-primary"
//                 style={{ fontSize: "24px" }}
//               >
//                 Trạng thái thanh toán
//               </p>
//               <p className="text-danger" style={{ fontWeight: "bolder" }}>
//                 {order && order.isPending ? "Đã thanh toán" : "Chưa thanh toán"}
//               </p>
//             </div>
//             <div className="col text ">
//               <p
//                 className="display-4 text-primary"
//                 style={{ fontSize: "24px" }}
//               >
//                 Trạng thái đơn hàng
//               </p>
//               <p className="text-danger" style={{ fontWeight: "bolder" }}>
//                 {order.orderStatus && order.orderStatus.name}
//               </p>
//             </div>

//           </div>
//           <div className="row">
//             <div className="col text ">
//               <p
//                 className="display-4 text-primary"
//                 style={{ fontSize: "24px" }}
//               >
//                 Phương thức giao hàng
//               </p>
//               <p className="text-danger" style={{ fontWeight: "bolder" }}>
//                 {order && order.payment}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-4 mb-5 mt-5">
//         <div className="col-10 offset-1 text ">
//           <p className="display-4 text-danger" style={{ fontSize: "24px" }}>
//             Thông tin mua hàng
//           </p>
//           <p>Ngày tạo: {order.createDate}</p>
//           <p>Người nhận: {order.fullName}</p>
//           <p>Email: {order.email}</p>
//         </div>
//         <div className="col-10 offset-1 text ">
//           <p className="display-4 text-danger" style={{ fontSize: "24px" }}>
//             Địa chỉ nhận hàng
//           </p>
//           <p>SDT: {order.phone}</p>
//           <p>DC: {order.address}</p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default OrderDetail;

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
