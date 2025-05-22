import { getProductDetail } from "@/api/product";
import Image from "next/image";
import { Box, Typography, Rating, Divider, Button } from "@mui/material";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  let product;
  try {
    const res = await getProductDetail(slug);
    product = res.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Box className="flex flex-col md:flex-row gap-8 md:gap-16 mt-2">
        <Box className="md:w-1/2 flex flex-col gap-4">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-300">
            <Image
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex gap-4 mt-2 overflow-x-auto">
            {product.images?.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20 flex-shrink-0 rounded-md border border-gray-300 overflow-hidden">
                <Image src={img} alt={`${product.title} - ${idx + 1}`} fill className="object-cover" sizes="80px" />
              </div>
            ))}
          </div>
        </Box>

        <Box className="md:w-1/2 flex flex-col gap-4">
          <Typography variant="h4" fontWeight="bold" className="mb-2">
            {product.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Brand: {product.brand} | Category: {product.category}
          </Typography>

          <Box className="flex items-center gap-2">
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.rating.toFixed(1)})
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" fontWeight="bold">
            ${product.price.toFixed(2)}{" "}
            <span className="text-red-500 text-lg font-semibold ml-2">
              -{product.discountPercentage.toFixed(0)}%
            </span>
          </Typography>

          <Typography variant="body1" className="mt-4 text-gray-700">
            {product.description}
          </Typography>

          <Divider className="my-4" />

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Specifications:
            </Typography>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>SKU: {product.sku}</li>
              <li>Weight: {product.weight} g</li>
              <li>
                Dimensions: {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
              </li>
              <li>Stock: {product.stock}</li>
              <li>Warranty: {product.warrantyInformation}</li>
              <li>Shipping: {product.shippingInformation}</li>
              <li>Availability: {product.availabilityStatus}</li>
              <li>Return Policy: {product.returnPolicy}</li>
              <li>Minimum Order Quantity: {product.minimumOrderQuantity}</li>
            </ul>
          </Box>

          <Button variant="contained" color="primary" size="large" className="mt-6 max-w-xs">
            Add to Cart
          </Button>
        </Box>
      </Box>

      <Box className="mt-12">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Customer Reviews
        </Typography>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review, i) => (
              <Box key={i} className="border border-gray-300 rounded-lg p-4">
                <Box className="flex items-center justify-between mb-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.reviewerName}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" className="mb-1">
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">{review.comment}</Typography>
              </Box>
            ))}
          </div>
        ) : null}
      </Box>
    </>
  );
}
