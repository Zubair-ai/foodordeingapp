import React, { useEffect, useState, useCallback } from "react";
import Carousels from "../components/Carousels";
import Footer from "../components/Footer";
import MealCard from "../components/MealCard";
import Navbar from "../components/Navbar";
import { CartContextProvider } from "../Store/UseContext";
import axios from "axios";

export default function Home() {
  const [foodcate, setFoodCate] = useState([]);
  const [fooditem, setFoodItem] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const loadData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/displaydata`);
      if (data?.success) {
        setFoodItem(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadCate = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/displaydatacate`);
      if (data?.success) {
        setFoodCate(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log("outside useeffect");
  useEffect(() => {
    loadData();
    loadCate();
    console.log("inside useeffect");
  }, [loadData, loadCate]);

  console.log("fooditem", fooditem);
  console.log("foodcate", foodcate);

  return (
    <CartContextProvider>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <Carousels setSearchItem={setSearchItem} />
        </div>
        <div className="contnainer ">
          {foodcate?.length !== 0 &&
            foodcate?.map((data) => {
              return (
                <div className="row">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {fooditem?.length !== 0 &&
                    fooditem
                      .filter((fooddata) => {
                        return (
                          fooddata.CategoryName === data.CategoryName &&
                          fooddata.name
                            .toLowerCase()
                            .includes(searchItem.toLowerCase())
                        );
                      })
                      .map((item) => {
                        return (
                          <div
                            className="col-12 col-md-6 col-lg-4 "
                            key={item._id}
                          >
                            <MealCard
                              foodname={item.name}
                              id={item._id}
                              image={item.img}
                              description={item.description}
                              options={item.options}
                            />
                          </div>
                        );
                      })}
                </div>
              );
            })}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </CartContextProvider>
  );
}
