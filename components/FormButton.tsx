import { useFormStatus } from 'react-dom';

const FormButton = ({ text = 'Submit' }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className=""
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? 'Please wait...' : text}
    </button>
  );
};

export default FormButton;
