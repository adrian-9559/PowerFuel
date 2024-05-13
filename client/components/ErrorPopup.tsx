// En tu archivo ErrorPopup.tsx

import { useAppContext } from '@context/AppContext';

export const ErrorPopup = () => {
  const { errorMessage, setErrorMessage } = useAppContext();

  if (!errorMessage) return null;

  return (
    <div>
      {errorMessage}
      <button onClick={() => setErrorMessage(null)}>Cerrar</button>
    </div>
  );
};