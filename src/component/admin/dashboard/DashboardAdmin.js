// import React, { useState, useEffect } from "react";
// import statusCards from "../../../assets/JsonData/status-card-data.json";
// import StatusCard from "../status-card/StatusCard";
// import Chart from "react-apexcharts";
// import { Link, NavLink } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
// import {
//   reportByProduct,
//   reportAmountYear,
//   countOrder,
//   countOrderByName,
// } from "../../../api/OrderApi";
// import { countAccount } from "../../../api/AccountApi";
// import { countProduct } from "../../../api/ProductApi";

// const Dashboard = () => {
//   const [product, setProduct] = useState([]);
//   const [year, setYear] = useState([]);
//   const [countOr, setCountOr] = useState();
//   const [total, setTotal] = useState();
//   const [countAcc, setCountAcc] = useState();
//   const [countPro, setCountPro] = useState();
//   const [seri, setSeri] = useState([]);
//   const [option, setOption] = useState({});
//   const history = useHistory();
//   useEffect(() => {
//     reportByProduct(0, 8)
//       .then((resp) => {
//         setProduct(resp.data.content);
//       })
//       .catch((error) => console.log(error));

//     reportAmountYear()
//       .then((resp) => {
//         setYear(resp.data);
//         const result = resp.data.reduce((price, item) => price + item.total, 0);
//         setTotal(result);
//       })
//       .catch((error) => console.log(error));

//     countOrder()
//       .then((resp) => setCountOr(resp.data))
//       .catch((error) => console.log(error));

//     countAccount()
//       .then((resp) => setCountAcc(resp.data))
//       .catch((error) => console.log(error));

//     countProduct()
//       .then((resp) => setCountPro(resp.data))
//       .catch((error) => console.log(error));

//     countOrderByName()
//       .then((resp) => {
//         const x = resp.data.map((item) => item.name);
//         setOption({
//           labels: x,
//         });
//         const y = resp.data.map((item) => item.count);
//         setSeri(y);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <div>
//       <h2 className="page-header">Thống kê</h2>
//       <div className="row">
//         <div className="col-6">
//           <div className="row container-fluid">
//             <div className="col">
//               <StatusCard
//                 icon={statusCards[0].icon}
//                 count={countAcc}
//                 title={`Khách hàng`}
//                 onClick={() => {
//                   console.log("Nhấn vào sản phẩm");
//                   history.push("/admin/customer")
//                 }}
//               />
//               <StatusCard
//                 icon={statusCards[1].icon}
//                 count={countPro}
//                 title={`Sản phẩm`}
//                 onClick={() => {
//                   console.log("Nhấn vào sản phẩm");
//                   history.push("/admin/products")
//                 }}
//               />
//               <StatusCard
//                 icon={statusCards[3].icon}
//                 count={countOr}
//                 title={`Đơn hàng`}
//                 onClick={() => {
//                   console.log("Nhấn vào sản phẩm");
//                   history.push("/admin/orders")
//                 }}
//               />
//               <StatusCard
//                 icon={statusCards[2].icon}
//                 count={total && total.toLocaleString()}
//                 title={`Tổng doanh thu`}

//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-6">
//           <div className="card full-height">
//             <Chart options={option} series={seri} type="donut" height="100%" />
//           </div>
//         </div>
//         <div className="col-6">
//           <div className="card">
//             <div className="card__header">
//               <h3 className="text-primary">Doanh thu theo sản phẩm</h3>
//             </div>
//             <div className="card__body">
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th scope="col">Mã sản phẩm</th>
//                     <th scope="col">Tên sản phẩm</th>
//                     <th scope="col">Số lượng bán</th>
//                     <th scope="col">Doanh thu</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {product &&
//                     product.map((item, index) => (
//                       <tr key={index}>
//                         <th scope="row">
//                           <NavLink to={`/admin/order-product/${item.id}`} exact>
//                             {" "}
//                             {item.id}
//                           </NavLink>
//                         </th>
//                         <td>{item.name}</td>
//                         <td>{item.count}</td>
//                         <td>{item.amount.toLocaleString()} đ</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="card__footer">
//               <Link to="/admin/report-product">Xem chi tiết</Link>
//             </div>
//           </div>
//         </div>
//         <div className="col-6">
//           <div className="card">
//             <div className="card__header">
//               <h3 className="text-primary">Doanh thu theo Năm</h3>
//             </div>
//             <div className="card__body">
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th scope="col">STT</th>
//                     <th scope="col">Năm</th>
//                     <th scope="col">Số lượng đơn</th>
//                     <th scope="col">Doanh thu</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {year &&
//                     year.map((item, index) => (
//                       <tr key={index}>
//                         <th scope="row">
//                           <NavLink exact to={`/admin/report-month/${item.year}`}>
//                             {index + 1}
//                           </NavLink>
//                         </th>
//                         <td>{item.year}</td>
//                         <td>{item.count}</td>
//                         <td>{item.total && item.total.toLocaleString()} đ</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="card__footer">
//               <NavLink exact to={`/admin/report-month/2024`}>
//                 Xem chi tiết
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import statusCards from "../../../assets/JsonData/status-card-data.json";
import StatusCard from "../status-card/StatusCard";
import Chart from "react-apexcharts";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  reportByProduct,
  reportAmountYear,
  countOrder,
  countOrderByName,
} from "../../../api/OrderApi";
import { countAccount } from "../../../api/AccountApi";
import { countProduct } from "../../../api/ProductApi";

const Dashboard = () => {
  const [productChartOptions, setProductChartOptions] = useState({});
  const [productChartSeries, setProductChartSeries] = useState([]);
  const [yearChartOptions, setYearChartOptions] = useState({});
  const [yearChartSeries, setYearChartSeries] = useState([]);
  const [countOr, setCountOr] = useState();
  const [total, setTotal] = useState();
  const [countAcc, setCountAcc] = useState();
  const [countPro, setCountPro] = useState();
  const [seri, setSeri] = useState([]);
  const [option, setOption] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Doanh thu theo sản phẩm
    reportByProduct(0, 8)
      .then((resp) => {
        const productNames = resp.data.content.map((item) => item.name);
        const revenues = resp.data.content.map((item) => item.amount);

        setProductChartOptions({
          chart: {
            type: "bar",
          },
          xaxis: {
            categories: productNames,
          },
          title: {
            text: "Doanh thu theo sản phẩm",
            align: "center",
          },
        });

        setProductChartSeries([
          {
            name: "Doanh thu",
            data: revenues,
          },
        ]);
      })
      .catch((error) => console.log(error));

    // Doanh thu theo năm
    reportAmountYear()
      .then((resp) => {
        const years = resp.data.map((item) => item.year);
        const revenues = resp.data.map((item) => item.total);

        setYearChartOptions({
          chart: {
            type: "line",
          },
          xaxis: {
            categories: years,
          },
          title: {
            text: "Doanh thu theo năm",
            align: "center",
          },
        });

        setYearChartSeries([
          {
            name: "Doanh thu",
            data: revenues,
          },
        ]);

        const totalRevenue = resp.data.reduce(
          (sum, item) => sum + item.total,
          0
        );
        setTotal(totalRevenue);
      })
      .catch((error) => console.log(error));

    // Số lượng đơn hàng
    countOrder()
      .then((resp) => setCountOr(resp.data))
      .catch((error) => console.log(error));

    // Số lượng tài khoản
    countAccount()
      .then((resp) => setCountAcc(resp.data))
      .catch((error) => console.log(error));

    // Số lượng sản phẩm
    countProduct()
      .then((resp) => setCountPro(resp.data))
      .catch((error) => console.log(error));

    // Đơn hàng theo danh mục
    countOrderByName()
      .then((resp) => {
        const x = resp.data.map((item) => item.name);
        setOption({
          labels: x,
        });
        const y = resp.data.map((item) => item.count);
        setSeri(y);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2 className="page-header">Thống kê</h2>
      <div className="row">
        <div className="col-6">
          <div className="row container-fluid">
            <div className="col">
              <StatusCard
                icon={statusCards[0].icon}
                count={countAcc}
                title={`Khách hàng`}
                onClick={() => {
                  history.push("/admin/customer");
                }}
              />
              <StatusCard
                icon={statusCards[1].icon}
                count={countPro}
                title={`Sản phẩm`}
                onClick={() => {
                  history.push("/admin/products");
                }}
              />
              <StatusCard
                icon={statusCards[3].icon}
                count={countOr}
                title={`Đơn hàng`}
                onClick={() => {
                  history.push("/admin/orders");
                }}
              />
              <StatusCard
                icon={statusCards[2].icon}
                count={total && total.toLocaleString()}
                title={`Tổng doanh thu`}
              />
            </div>
          </div>
        </div>

        {/* Doanh thu theo sản phẩm */}
        <div className="col-6">
          <div className="card full-height">
            <Chart
              options={productChartOptions}
              series={productChartSeries}
              type="bar"
              height="400"
            />
          </div>
        </div>

        {/* Doanh thu theo năm */}
        <div className="col-6">
          <div className="card full-height">
            <Chart
              options={yearChartOptions}
              series={yearChartSeries}
              type="line"
              height="400"
            />
            <Link to="/admin/report-month/2024" className="btn btn-primary mt-3">
              Xem chi tiết
            </Link>
          </div>
        </div>

        {/* Biểu đồ Donut: Đơn hàng theo danh mục */}
        <div className="col-6">
          <div className="card full-height">
            <Chart options={option} series={seri} type="donut" height="400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
