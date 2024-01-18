import { useFormStatus } from 'react-dom';
import LoadingSpinner from './LoadingSpinner';

/**
 * Form 데이터 loading 상태를 보여줄 수 있는 UI
 */
const FormLoading = () => {
  const { pending } = useFormStatus();

  if (!pending) return null;
  return (
    <div className="absolute top-0 h-full w-screen bg-black bg-opacity-50">
      <LoadingSpinner />
    </div>
  );
};

export default FormLoading;
