const CustomConfirmationDialog = ({ message, onConfirm, isVisible, setIsVisible }) => {

  const handleConfirm = () => {
    onConfirm();
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">{message}</p>
            <div className="flex justify-end">
              <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Aceptar</button>
              <button onClick={() => setIsVisible(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomConfirmationDialog;