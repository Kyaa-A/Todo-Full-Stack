'use client';

export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto p-12 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200">
        {/* SAAS Empty State Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        {/* SAAS Empty State Text */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to boost your productivity?
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          Create your first task and experience the power of organized workflow management.
        </p>
        
        {/* SAAS Feature Highlights */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Intelligent task organization</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Real-time progress tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
} 