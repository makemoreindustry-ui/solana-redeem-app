import React from 'react';
import { RealRedeem } from '../components/RealRedeem';

const Redeem = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Redemption Portal</h1>
          <p className="text-gray-600 text-center mb-8">Complete your redemption process</p>
          <RealRedeem />
        </div>
      </div>
    </div>
  );
};

export default Redeem;
