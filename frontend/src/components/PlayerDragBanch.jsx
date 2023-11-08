import React from "react";

const PlayerDragBanch = ({
  name,
  players,
  draggedPlayer,
  onDragPlayer,
  handleOnClickSelect,
  onDropIntoBench,
  onDragOver,
}) => {
  return (
    <div
      className="w-full md:w-3/12 bg-green-100 rounded-lg p-5 border border-gray-400"
      onDrop={onDropIntoBench}
      onDragOver={onDragOver}
    >
      <div>
        <h2 className="text-center uppercase text-l font-bold">
          {name}
        </h2>
        <h1 className="text-center text-l my-2">
        Jugadores disponibles:
        </h1>

      </div>

      <div className="flex md:flex-col w-full gap-1">
        {players?.length > 0 ? (
          players.map((player) => (
            <div
              className={`${draggedPlayer?._id === player?._id
                  ? "bg-green-500 text-black"
                  : "bg-green-700 text-white"
                }
                                    w-fit md:w-full p-1 text-start rounded-lg hover:cursor-pointer transition-colors`}
              key={player._id}
              draggable="true"
              onDragStart={() => onDragPlayer(player)}
              onClick={() => handleOnClickSelect(player)}
            >
              <p className={"font-black text-sm"}>{player.name}</p>
            </div>
          ))
        ) : (
          <p className="text-center p-5">No hay jugadores disponibles</p>
        )}
      </div>
    </div>
  );
};

export default PlayerDragBanch;
