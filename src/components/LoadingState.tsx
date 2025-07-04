'use client';

export default function LoadingState() {
  return (
    <div className="text-center py-20">
      <div className="inline-flex flex-col items-center gap-6 p-12 rounded-2xl bg-white border border-gray-200 shadow-sm">
        {/* SAAS Loading Animation */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-indigo-600 rounded-full animate-spin-reverse"></div>
        </div>
        
        {/* SAAS Loading Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Loading your workspace</h3>
          <p className="text-gray-600">Syncing your tasks across all devices...</p>
        </div>
        
        {/* SAAS Loading Progress */}
        <div className="w-48 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 