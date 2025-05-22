import { getAllProducts } from "@/api/product";
import PageSizeSelector from "@/components/page-size-selector";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import { PAGE_SIZE } from "@/constant";
import React, { Suspense } from "react";

export default async function Products({ params }) {
  const page = parseInt(params.page) || 1;
  const limit = PAGE_SIZE;
  const skip = (page - 1) * limit;

  let products = [];
  let pagination = {
    total: 0,
    skip: 1,
    limit: PAGE_SIZE,
  };
  try {
    const res = await getAllProducts({ skip, limit });
    if (res.status === 200) {
      const { products: data, total } = res.data;
      products = data;
      pagination = { total, skip, limit };
    } else {
      console.log("res", res);
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Products</h2>
        <PageSizeSelector currentLimit={parseInt(params?.limit || PAGE_SIZE)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
        {products?.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h3>No data found!</h3>
        )}
      </div>
      {/* Pagination */}
      <div className="mt-6 w-full flex justify-center">
        <Pagination
          currentPage={page}
          total={pagination.total}
          limit={pagination.limit}
        />
      </div>
    </Suspense>
  );
}
