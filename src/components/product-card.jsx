"use client";

import { Card, CardContent, Typography, Rating } from "@mui/material";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
       <div className="relative w-full aspect-square">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardContent className="bg-white space-y-2">
        <Typography variant="h6" className="font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </Typography>

        <Typography variant="body2" className="text-sm text-gray-500 capitalize">
          {product.category} &middot; {product.brand}
        </Typography>

        <Rating
          name="read-only"
          value={product.rating}
          precision={0.1}
          readOnly
          size="small"
        />

        <div className="flex items-center gap-2">
          <Typography variant="h6" className="text-green-600 font-bold">
            ${product.price}
          </Typography>
          <Typography
            variant="body2"
            className="text-xs text-red-500 font-medium"
          >
            {product.discountPercentage}% OFF
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
