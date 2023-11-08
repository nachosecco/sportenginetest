import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MyClub = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-2xl mb-5">My Club</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Club
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Logo del Club
          </label>
          <div {...getRootProps()} className="border-dashed border-2 p-4">
            <input {...getInputProps()} />
            <p>Arrastra y suelta la imagen aquí, o haz clic para seleccionar la imagen.</p>
          </div>
          {image && <img src={image} alt="Preview" className="mt-4 h-24 w-24" />}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descripción del Club
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default MyClub;
