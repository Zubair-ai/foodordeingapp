import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatch } from "../Store/UseContext";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatch();
  if (data?.length === 0 || !data) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }
    const handleCheckOut = async () => {
      let userEmail = localStorage.getItem("useremail");
       console.log("orderData",data,userEmail,new Date())
      let response = await fetch("/api/orderdata", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderData: data,
          email: userEmail,
          orderDate: new Date().toDateString()
        })
      });
      console.log("JSON RESPONSE:::::", response.status)
      if (response.status === 200) {
        dispatch({ type: "DROP" })
      }
    }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div><div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table  ">
          <thead className=" text-white fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-white ">
            {data.map((food, index) => (
              <tr key={food.id} >
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon color="error"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-white mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div></div>
  );
}
