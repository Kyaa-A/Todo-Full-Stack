'use client';

export default function Header() {
  return (
    <div className="text-center mb-12">
      {/* SAAS Brand Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 shadow-xl shadow-blue-500/25">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      {/* SAAS Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
        TaskFlow
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Pro</span>
      </h1>
      
      {/* SAAS Subtitle */}
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Streamline your productivity with our intelligent task management platform
      </p>
    </div>
  );
} 