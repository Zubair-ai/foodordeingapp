import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const userEmail = localStorage.getItem("useremail");

  const fetchMyOrder = async () => {
    try {
      const { data } = await axios.post("/api/myorderdata", {
        email: userEmail,
      });
      if (data) {
        console.log(data)
        setOrderData(data?.myOrderData.orderData);
        setOrderDate(data?.myOrderData.orderData.orderDate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const Date = orderData.map((orderObj) => {
    return orderObj.data[1].orderDate;
  })[0];

  console.log("Orderdata", orderDate);

  const historyRemove =()=>{
    try {
        const res= axios.post("/api/deletehistory",{email:userEmail});
        if(res.success){
            toast.success("history deleted")}
    } catch (error) {
        console.log(error)
    }
    setOrderData([]);
  }
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <table className="table text-white">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item Name</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((orderObj, index) => {
              if (!orderObj.data) return null; // check if orderObj.data exists
              return orderObj.data.map((orderArr, index) => {
                if (!Array.isArray(orderArr)) return null; // check if orderArr is an array
                return orderArr.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{userEmail}</td>
                      <td>{item.name}</td>
                      <td>{item.size}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                });
              });
            })}
            <tr>
              <td colSpan="5" className="text-center">
                Order Date: {Date}
              </td>
            </tr>
          </tbody>
          <button onClick={historyRemove} className="btn btn-warning m-3">Clear History</button>
        </table>
      </div>
      <Footer />
    </div>
  );
}
