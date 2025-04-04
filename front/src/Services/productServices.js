import axios from "axios";
export const getProducts = async () => {
  try {
    const prod = await axios.get(`http://localhost:9090/product/allProduct`);
    const data = await prod.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: null, err: error };
  }
};

export const addProduct = async (prodData) => {
  try {
    const response = await axios.post(
      "http://localhost:9090/product/addProduct",
      prodData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data.error);
    return { error: error.response?.data.error || "Insertion fail" };
  }
};

export const getSingle = async (id) => {
  if (!id) {
    console.error("Invalid ID:", id);
    return;
  }
  try {
    const prod = await axios.get(
      `http://localhost:9090/product/getSingleProduct/${id}`
    );
    const data = prod.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return { error: error.response?.data || "Failed to fetch product" };
  }
};
