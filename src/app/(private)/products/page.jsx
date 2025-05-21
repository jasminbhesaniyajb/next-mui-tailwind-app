import { getAllProducts } from "@/api/product";
import ProductCard from "@/components/product-card";
import React from "react";

export default async function Products() {
  let products = [];
  let pagination = {
    total: 0,
    skip: 1,
    limit: 8,
  };
  try {
    const params = {
      skip: 1,
      limit: 8,
    };
    const res = await getAllProducts(params);
    if (res.status === 200) {
      const { products: data, total, skip, limit } = res.data;
      products = data;
      pagination = { total, skip, limit };
    } else {
      console.log("res", res);
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
      {products?.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <h3>No data found!</h3>
      )}
    </div>
  );
}
