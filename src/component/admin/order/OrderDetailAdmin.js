import React, { useState, useEffect } from "react";
import { getOrderById, getOrderDetailByOrderId, updateShip } from "../../../api/OrderApi";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const history = useHistory();
  const [orderDetail, setOrderDetail] = useState([]);
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const [amount, setAmount] = useState();
  const [sale, setSale] = useState();
  const [total, setTotal] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [shipment, setShipment] = useState("");
  const [code, setCode] = useState("");
  const [shipDate, setShipDate] = useState("");

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getOrderById(id).then((resp) => {
      setOrder(resp.data);
      setSale(resp.data.discount ? resp.data.discount : 0);
      setTotal(resp.data.total);
    });

    getOrderDetailByOrderId(id).then((resp) => {
      setOrderDetail(resp.data);
      const result = resp.data.reduce(
        (price, item) => price + item.sellPrice * item.quantity,
        0
      );
      setAmount(result);
    });
  };

  const goBack = () => {
    history.goBack();
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleUpdateShip = async () => {
    if (!shipment || !code || !shipDate) {
      alert("Vui lòng nhập đầy đủ thông tin vận chuyển.");
      return;
    }

    setIsUpdating(true);
    try {
      await updateShip({ id, shipment, code, shipDate });
      toast.success("Cập nhật trạng thái đơn hàng thành công!")
      onLoad();
      handleCloseModal();
    } catch (error) {
      alert("Cập nhật thất bại. Vui lòng thử lại.");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container-fluid row padding mb-5 card" style={{ marginTop: "25px" }}>
      <button style={{ width: 60 }} onClick={goBack}>
        <i
          className="fa fa-arrow-left"
          style={{ fontSize: 18 }}
          aria-hidden="true"
        ></i>
      </button>
      <div className="col-12 welcome mb-5 mt-5">
        <div className="col-10 offset-1 text-center ">
          <p
            className="display-4 text-danger"
            style={{ fontSize: "34px", fontWeight: "bolder" }}
          >
            Đơn hàng #{order && order.id}
          </p>
        </div>
        <div className="col-12 row mb-5 mt-5">
          <div className="col-6 text ">
            <p className="display-4 text-primary" style={{ fontSize: "24px" }}>
              Thông tin mua hàng
            </p>
            <p>Ngày tạo: {order && order.createDate}</p>
            <p>Người nhận: {order && order.fullName}</p>
            <p>Email: {order && order.email}</p>
          </div>
          <div className="col-6 text ">
            <p className="display-4 text-primary" style={{ fontSize: "24px" }}>
              Địa chỉ nhận hàng
            </p>
            <p>SDT: {order && order.phone}</p>
            <p>DC: {order && order.address}</p>
          </div>
        </div>
        <div className="col-12 mb-5">
          <p className="display-4 text-primary" style={{ fontSize: "24px" }}>
            Chi tiết đơn hàng
          </p>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Size</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.attribute.name}</th>
                  <td>{item.attribute.size}</td>
                  <td>{item.sellPrice.toLocaleString()}₫</td>
                  <td>{item.quantity}</td>
                  <td>{(item.sellPrice * item.quantity).toLocaleString()}₫</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row mb-5">
            <div className="col-12 text ">
              <p style={{ fontWeight: "bolder" }}>
                Tạm tính: {amount && amount.toLocaleString()} đ
              </p>
              <p style={{ fontWeight: "bolder" }}>
                Giảm giá: - {sale ? ((amount * sale) / 100).toLocaleString() : 0} đ
              </p>
              <p className="text-danger" style={{ fontWeight: "bolder" }}>
                Tổng cộng: {total && total.toLocaleString()} đ
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col text ">
              <p
                className="display-4 text-primary"
                style={{ fontSize: "24px" }}
              >
                Trạng thái thanh toán
              </p>
              <p className="text-danger" style={{ fontWeight: "bolder" }}>
                {order.isPending ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
            </div>
            <div className="col text " style={{ marginLeft: "500px" }}>
              <p
                className="display-4 text-primary"
                style={{ fontSize: "24px" }}
              >
                Trạng thái đơn hàng
              </p>
              <p className="text-danger" style={{ fontWeight: "bolder" }}>
                {order.orderStatusName}
              </p>
            </div>
            {/* {order.orderStatusName !== "Đã giao" && order.orderStatusName !== "Đã hủy" && (
              <div className="d-flex justify-content-center mb-3">
                {order.orderStatusName !== "Đang vận chuyển" && (
                  <>
                    <button className="btn btn-success mx-2" onClick={handleShowModal}>
                      Xác nhận đơn hàng
                    </button>
                    <button className="btn btn-danger mx-2" onClick={handleShowModal}>
                      Hủy đơn hàng
                    </button>
                  </>
                )}
              </div>
            )} */}
            {order.orderStatusName !== "Đã giao" && order.orderStatusName !== "Đã hủy" && (
              <div className="d-flex justify-content-center mb-3">
                {order.orderStatusName === "Chờ xác nhận" && (
                  <button className="btn btn-success mx-2" onClick={handleShowModal}>
                    Xác nhận đơn hàng
                  </button>
                )}
                {order.orderStatusName === "Đang xử lý" && (
                  <button className="btn btn-primary mx-2" onClick={handleShowModal}>
                    Xác nhận vận chuyển
                  </button>
                )}
                {order.orderStatusName === "Đang vận chuyển" && (
                  <button className="btn btn-warning mx-2" onClick={handleShowModal}>
                    Xác nhận đã giao hàng
                  </button>
                )}
                {order.orderStatusName !== "Đang vận chuyển" && (
                  <button className="btn btn-danger mx-2" onClick={handleShowModal}>
                    Hủy đơn hàng
                  </button>
                )}
              </div>
            )}


          </div>
        </div>
      </div>

      {/* Modal for shipment details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật trạng thái vận chuyển</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="shipment">Hãng vận chuyển:</label>
            <Form.Select
              style={{ height: 40, width: 300, marginBottom: 20 }}
              onChange={(e) => setShipment(e.target.value)}
            >
              <option value={null}></option>
              <option value="ViettelPost">ViettelPost</option>
              <option value="J&T">J&T</option>
              <option value="Gojek">Gojek</option>
              <option value="AhaMove">AhaMove</option>
            </Form.Select>
          </div>
          <div className="form-group">
            <label htmlFor="code">Mã vận chuyển:</label>
            <input
              type="text"
              className="form-control"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipDate">Ngày giao hàng dự kiến:</label>
            <input
              type="date"
              className="form-control"
              id="shipDate"
              value={shipDate}
              onChange={(e) => setShipDate(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdateShip} disabled={isUpdating}>
            {isUpdating ? "Đang xử lý..." : "Cập nhật"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderDetail;

