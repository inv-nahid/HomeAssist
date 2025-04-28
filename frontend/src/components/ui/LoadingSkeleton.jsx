const LoadingSkeleton = () => {
    return (
      <div className="animate-pulse space-y-4">
        {/* Header Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        
        {/* Image Skeleton */}
        <div className="h-64 bg-gray-200 rounded-lg"></div>
        
        {/* Content Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        
        {/* Price Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        
        {/* Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded-md w-32"></div>
      </div>
    )
  }
  
  export default LoadingSkeleton