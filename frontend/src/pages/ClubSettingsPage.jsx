import { useState } from 'react';

const ClubSettingsPage = () => {
  const [clubName, setClubName] = useState('');
  const [logo, setLogo] = useState(null);

  const handleClubNameChange = (e) => {
    setClubName(e.target.value);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Configuración del Club</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Nombre del Club</label>
          <input 
            type="text"
            value={clubName}
            onChange={handleClubNameChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Subir Logo</label>
          <input 
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="mt-1"
          />
          {logo && <img src={logo} alt="Club Logo" className="mt-2 h-20 w-20 object-cover"/>}
        </div>

        <button className="w-full p-2 text-white bg-blue-500 rounded-md">
          Guardar
        </button>
      </div>
    </div>
  );
};

export default ClubSettingsPage;
