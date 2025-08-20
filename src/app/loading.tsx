import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header skeleton */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full bg-purple-200 dark:bg-purple-800" />
              <Skeleton className="h-8 w-24 bg-blue-200 dark:bg-blue-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-6 mb-12">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 animate-spin">
              <div className="absolute inset-3 bg-gray-50 dark:bg-gray-950 rounded-full"></div>
            </div>
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 animate-ping"></div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Loading...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we prepare your content
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-4 border border-purple-100 dark:border-purple-900"
            >
              <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800" />
              <Skeleton className="h-20 w-full rounded-xl bg-purple-100 dark:bg-purple-900" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center space-y-2 border border-purple-100 dark:border-purple-900"
            >
              <Skeleton className="h-8 w-12 mx-auto rounded-full bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-700 dark:to-blue-700" />
              <Skeleton className="h-4 w-16 mx-auto bg-purple-200 dark:bg-purple-800" />
              <Skeleton className="h-3 w-20 mx-auto bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
