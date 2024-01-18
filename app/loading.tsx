import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div role="status" className="flex h-full w-fit p-6">
      <LoadingSpinner />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
