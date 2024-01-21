import { useFormStatus } from 'react-dom';

const FormButton = ({ text = 'Submit' }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-20 rounded-md bg-slate-400"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? 'wait...' : text}
    </button>
  );
};

export default FormButton;
