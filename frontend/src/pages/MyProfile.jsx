import React from 'react';
import rugbyPlayer from "../assets/player_rugby.jpg";
import { useEffect, useState } from "react";
// import useAuth from '../hooks/useAuth';

const MyProfile = () => {

  useEffect(() => {
    document.body.style.backgroundImage = "url('/backgrounds/page-turner.svg')";
    document.body.style.backgroundSize = "cover";
    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundSize = null;
    };
  }, []);

  // const { auth } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Perfil del jugador: {/*player.name*/}</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Editar Perfil
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            {/*player.image*/}
            <img
              src={rugbyPlayer}
              alt="Foto de perfil"
              className="w-48 h-48 rounded-full mx-auto"
              
            />
          </div>
          <div className="md:col-span-1 bg-blue-300 rounded-lg p-2">
            <h2 className="text-lg font-semibold text-center">Información Personal</h2>
            <p className="mt-2 text-gray-900">Nombre: Felipe Gutierrez {/*auth.name*/}</p>
            <p className="mt-2 text-gray-900">Correo: fgwebdesign0@gmail.com {/*auth.email*/}</p>
            <p className="mt-2 text-gray-900">Ubicación: Montevideo {/*auth.club*/}</p>
            <p className="mt-2 text-gray-900">Teléfono: 123456789 {/*auth.club*/}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
          </div>
          <div className="md:col-span-1 bg-sky-200 rounded-lg p-2">
            <h2 className="text-lg font-semibold text-center">Información Personal</h2>
            <p className="mt-2 text-gray-600">Nombre: {/*auth.name*/}</p>
            <p className="mt-2 text-gray-600">Correo: {/*auth.email*/}</p>
            <p className="mt-2 text-gray-600">Club: {/*auth.club*/}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
