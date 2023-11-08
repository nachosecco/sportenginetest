
import { useParams } from 'react-router-dom';


const PlayerProfile = () => {
    const { playerId } = useParams();
  return (
    <div className="flex">
      <div className="flex-1 p-8">
        <h1 className="text-3xl mb-4">Perfil del Jugador</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl mb-2">Estadísticas</h2>
            <p>Partidos jugados: 30</p>
            <p>Puntos anotados: 120</p>
            {/* ...más estadísticas */}
          </div>
          <div>
            <h2 className="text-2xl mb-2">Gráficas</h2>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
