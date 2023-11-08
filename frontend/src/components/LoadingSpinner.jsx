

const LoadingSpinner = () => {
  const loaderStyle = {
    animation: 'spin 1s infinite linear',
    borderLeftColor: '#3b82f6'
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="rounded-full border-4 border-t-4 border-sky-500 h-12 w-12 mb-4" style={loaderStyle}></div>
        <p className="mt-4 text-lg font-semibold" style={{ fontFamily: 'Nunito' }}>
          Cargando...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
