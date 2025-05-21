'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
          <p className="text-sm text-red-500 my-2">{error?.message}</p>
          <Button
            onClick={() => router.push('/products')}
            variant="contained"
          >
            Go Home
          </Button>
        </div>
      </div>
  );
}
