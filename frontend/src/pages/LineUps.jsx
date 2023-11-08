import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGenerations } from "../hooks/useGenerations";

import Alerta from "../components/Alerta";
import CustomConfirmationDialog from "../components/CustomConfirmationDialog";
import PlayerDragBanch from "../components/PlayerDragBanch";
import RugbyField from "../components/RugbyField";
import useCoach from "../hooks/useCoach";
import { useLineUps } from "../hooks/useLineUps";

const initialLineUp = [
  { _id: null, name: "", position: "Loosehead Prop" },
  { _id: null, name: "", position: "Hooker" },
  { _id: null, name: "", position: "Tighthead Prop" },
  { _id: null, name: "", position: "Lock-1" },
  { _id: null, name: "", position: "Lock-2" },
  { _id: null, name: "", position: "Blindside Flanker" },
  { _id: null, name: "", position: "Openside Flanker" },
  { _id: null, name: "", position: "Number 8" },

  { _id: null, name: "", position: "Scrum Half" },
  { _id: null, name: "", position: "Fly Half" },
  { _id: null, name: "", position: "Left Wing" },
  { _id: null, name: "", position: "Inside Center" },
  { _id: null, name: "", position: "Outside Center" },
  { _id: null, name: "", position: "Right Wing" },
  { _id: null, name: "", position: "Full Back" },
];

const LineUps = () => {
  const params = useParams();
  const coach = useCoach();
  const { handleGeneration, generation, loading, alert, showAlert } =
    useGenerations();
  const {
    createLineUp,
    lineUp,
    getLineUp,
    editLineUp,
    handleNewLineUp,
    setDeleteLineUpVisible,
    deleteLineUpVisible,
    deleteLineUp,
  } = useLineUps();

  const initialGeneration = () => {
    if (players) {
      return players;
    }

    return [];
  };
  const [generationPlayers, setGenerationPlayers] = useState([]);
  const [linedPlayers, setLinedPlayers] = useState(initialLineUp);
  const [alternates, setAlternates] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [name, setName] = useState("");
  const [draggedPlayer, setDraggedPlayer] = useState(null);

  useEffect(() => {
    handleGeneration(params.generation);
    handleNewLineUp();
    setName("");

    if (params.id) {
      getLineUp(params.id);
      setName(lineUp.name);
    }
  }, []);

  useEffect(() => {
    setGenerationPlayers(generation.players);
  }, [generation.players]);

  useEffect(() => {
    if (!lineUp.players) {
      setLinedPlayers(initialLineUp);
      return;
    }
    const dbPlayers = lineUp.players.filter(
      (player) => player.position !== "Alternate"
    );

    const updatedPlayers = linedPlayers.map((player) => {
      const isPlayer = dbPlayers.find(
        (dbPlayer) => dbPlayer.position === player.position
      );

      return isPlayer
        ? {
            _id: isPlayer.player,
            name: isPlayer.name,
            position: isPlayer.position,
          }
        : player;
    });

    const updatedPlayersId = updatedPlayers.map(
      (updatedPlayer) => updatedPlayer._id
    );

    setGenerationPlayers((generationPlayers) =>
      generationPlayers?.filter(
        (player) => !updatedPlayersId.includes(player._id)
      )
    );

    setLinedPlayers(updatedPlayers);
  }, [lineUp]);

  useEffect(() => {
    if (!lineUp.players) {
      setAlternates([]);
      return;
    }
    const dbAlternates = lineUp.players.filter(
      (player) => player.position === "Alternate"
    );

    const updatedAlternates = dbAlternates.map((player) => {
      return {
        _id: player.player,
        name: player.name,
        position: player.position,
      };
    });

    const updatedPlayersId = updatedAlternates.map(
      (updatedPlayer) => updatedPlayer._id
    );

    setGenerationPlayers((generationPlayers) =>
      generationPlayers.filter(
        (player) => !updatedPlayersId.includes(player._id)
      )
    );

    setAlternates(updatedAlternates);
  }, [lineUp]);

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDragPlayer = (item) => {
    setDraggedPlayer(item);
  };

  const addAlternate = () => {
    if (alternates.some((alternate) => alternate._id === draggedPlayer._id)) {
      return;
    }
    setLinedPlayers(
      linedPlayers.map((player) =>
        player._id === draggedPlayer._id
          ? { _id: null, name: null, position: draggedPlayer.position }
          : player
      )
    );

    setGenerationPlayers(
      generationPlayers.filter((player) => player._id !== draggedPlayer._id)
    );

    setAbsentees(
      absentees.filter((player) => player._id !== draggedPlayer._id)
    );

    setAlternates([
      ...alternates,
      {
        _id: draggedPlayer._id,
        name: draggedPlayer.name,
        position: "Alternate",
      },
    ]);

    setDraggedPlayer(null);
  };

  const addAbsentees = () => {
    if (absentees.some((player) => player._id === draggedPlayer._id)) {
      return;
    }

    setLinedPlayers(
      linedPlayers.map((player) =>
        player._id === draggedPlayer._id
          ? { _id: null, name: null, position: draggedPlayer.position }
          : player
      )
    );

    setGenerationPlayers(
      generationPlayers.filter((player) => player._id !== draggedPlayer._id)
    );

    setAlternates(
      alternates.filter((player) => player._id !== draggedPlayer._id)
    );

    setAbsentees([
      ...absentees,
      {
        _id: draggedPlayer._id,
        name: draggedPlayer.name,
        position: "Absent",
      },
    ]);

    setDraggedPlayer(null);
  };

  const onClickToSelect = (item) => {
    if (!draggedPlayer) {
      setDraggedPlayer(item);
      return;
    }

    setDraggedPlayer(null);
  };

  const onClickInBanch = () => {
    if (draggedPlayer) {
      addAlternate();
    }
  };

  const onClickInAbsentees = () => {
    if (draggedPlayer) {
      addAbsentees();
    }
  };

  const onClickLinedPlayer = (event) => {
    if (draggedPlayer) {
      addPlayerInLineUp(event);
      return;
    }

    const position = event.target.id;
    const positionRefactor = position.replace("_", " ");

    const removedPlayer = linedPlayers.find(
      (p) => p.position === positionRefactor
    );

    if (removedPlayer?._id === null) {
      return;
    }

    const updatedLineUp = linedPlayers.map((p) =>
      p.position === positionRefactor
        ? { _id: null, name: "", position: positionRefactor }
        : p
    );

    setGenerationPlayers([...generationPlayers, removedPlayer]);
    setLinedPlayers(updatedLineUp);
  };

  const onClearLinedPlayers = () => {
    const realPlayers = linedPlayers.filter((p) => p._id !== null);
    setGenerationPlayers([...generationPlayers, ...realPlayers]);
    setLinedPlayers(initialLineUp);
  };

  const onClickLinedAlternate = (player) => {
    const updatedAlternates = alternates.filter((p) => p._id !== player._id);

    setGenerationPlayers([...generationPlayers, player]);
    setAlternates(updatedAlternates);
  };

  const onClearLinedAlternates = () => {
    setGenerationPlayers([...generationPlayers, ...alternates]);
    setAlternates([]);
  };

  const onClickLinedAbsentees = (player) => {
    const updatedAbsentees = absentees.filter((p) => p._id !== player._id);

    setGenerationPlayers([...generationPlayers, player]);
    setAbsentees(updatedAbsentees);
  };

  const onClearLinedAbsentees = () => {
    setGenerationPlayers([...generationPlayers, ...absentees]);
    setAbsentees([]);
  };

  const addPlayerInLineUp = (event) => {
    const position = event.target.id;
    const positionRefactor = position.replace("_", " ");

    if (
      linedPlayers.some(
        (linedPlayer) =>
          linedPlayer._id === draggedPlayer._id &&
          linedPlayer.position === positionRefactor
      )
    ) {
      return;
    }
    if (
      linedPlayers.some(
        (arrayPlayer) =>
          arrayPlayer._id !== null && arrayPlayer.position === positionRefactor
      )
    ) {
      showAlert({
        msg: "La posición ya está ocupada",
        error: true,
      });
      setDraggedPlayer(null);
      return;
    }

    let updatedPlayers = linedPlayers.map((arrayPlayer) => {
      if (arrayPlayer.position === positionRefactor) {
        return { ...draggedPlayer, position: positionRefactor };
      }
      return arrayPlayer;
    });

    updatedPlayers = updatedPlayers.map((arrayPlayer) => {
      if (arrayPlayer.position === draggedPlayer.position) {
        return { _id: null, name: null, position: draggedPlayer.position };
      }
      return arrayPlayer;
    });

    setAlternates(
      alternates.filter((player) => player._id !== draggedPlayer._id)
    );

    setAbsentees(
      absentees.filter((player) => player._id !== draggedPlayer._id)
    );

    setGenerationPlayers(
      generationPlayers.filter((player) => player._id !== draggedPlayer._id)
    );

    setLinedPlayers(updatedPlayers);
    setDraggedPlayer(null);
  };

  const onDropIntoBench = () => {
    if (!draggedPlayer) {
      return;
    }

    if (
      generationPlayers.some(
        (generationPlayer) => generationPlayer._id === draggedPlayer._id
      )
    ) {
      return;
    }

    setGenerationPlayers([...generationPlayers, draggedPlayer]);

    setAlternates(
      alternates.filter((player) => player._id !== draggedPlayer._id)
    );

    setLinedPlayers(
      linedPlayers.map((linedPlayer) =>
        linedPlayer.position === draggedPlayer.position
          ? { _id: null, name: null, position: draggedPlayer.position }
          : linedPlayer
      )
    );

    setDraggedPlayer(null);
  };

  const onSubmitLineUp = async () => {
    if (name === "") {
      showAlert({
        msg: "El nombre de la alineación es necesario",
        error: true,
      });
      return;
    }

    if (name.length < 3) {
      showAlert({
        msg: "El nombre de la alineación requiere al menos 3 caracteres",
        error: true,
      });
      return;
    }

    const lineUpFiltered = linedPlayers.filter((player) => player._id !== null);
    const alternatesFiltered = alternates.filter(
      (player) => player._id !== null
    );

    const players = [...lineUpFiltered, ...alternatesFiltered];

    const reqPlayers = players.map((player) => {
      return {
        player: player._id,
        name: player.name,
        position: player.position,
      };
    });

    if (!lineUp._id) {
      await createLineUp({
        name,
        generation: params.generation,
        players: reqPlayers,
      });
      return;
    }

    await editLineUp({ name, players: reqPlayers });
  };

  if (loading) {
    return (
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { msg } = alert;

  return (
    <>
      <div className="flex items-center my-2">
        <img
          src="/icons/icons8-formation.png"
          alt="Icono de Alineaciones"
          className="w-12 h-12 mr-4"
        />
        <h1 className="text-4xl font-black text-center md:text-left md:mb-0">
          Crear alineación
        </h1>
      </div>

      <div className="flex flex-col w-full p-2 rounded-md my-2">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 mb-2 flex-grow">
            <label
              htmlFor="name"
              className="text-1xl font-bold text-black flex-shrink-0"
            >
              Nombre de la alineación:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Escribe aquí el nombre de tu alineación"
              className="py-2 px-1 rounded-md flex-grow border border-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="py-2 px-2 bg-green-600 rounded-lg font-bold text-white uppercase flex-shrink-0"
              onClick={onSubmitLineUp}
            >
              {lineUp._id ? "Guardar" : "Crear"}
            </button>
            <button
              onClick={() => setDeleteLineUpVisible(true)}
              className="py-2 px-2 bg-red-600 rounded-lg font-bold text-white uppercase flex-shrink-0"
            >
              Borrar
            </button>
          </div>
          {params.id && coach && (
            <div className="flex justify-end items-center gap-2 text-gray-500 hover:text-black"></div>
          )}
        </div>

        {msg && <Alerta alerta={alert} />}

        <div className="flex flex-col md:flex-row w-full h-[75%] gap-2 my-6">
          <RugbyField
            dragOver={onDragOver}
            drop={addPlayerInLineUp}
            click={onClickLinedPlayer}
            lineUp={linedPlayers}
            onDragPlayer={onDragPlayer}
            onClearLinedPlayers={onClearLinedPlayers}
          />
          <PlayerDragBanch
            name={generation.name}
            players={generationPlayers}
            draggedPlayer={draggedPlayer}
            onDragPlayer={onDragPlayer}
            handleOnClickSelect={onClickToSelect}
            onDropIntoBench={onDropIntoBench}
            onDragOver={onDragOver}
          />
        </div>
        <div
          className="relative w-full lg:min-h-[8rem] min-h-[5rem] bg-green-200 rounded-lg px-2 py-2 border border-gray-400"
          onDragOver={(e) => onDragOver(e)}
          onDrop={addAlternate}
          onClick={onClickInBanch}
        >
          <h2 className="text-center text-xl font-bold">Suplentes</h2>

          <button
            onClick={onClearLinedAlternates}
            className="absolute top-1 right-1 cursor-pointer bg-red-500 rounded-2xl p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
          <div id="Alternate" className="flex gap-1 md:text-center">
            {alternates?.length > 0 &&
              alternates.map((player) => (
                <div
                  className="p-1 bg-green-700 text-center rounded-lg hover:cursor-pointer"
                  key={player._id}
                  onClick={() => onClickLinedAlternate(player)}
                  onDragStart={() => onDragPlayer(player)}
                  draggable="true"
                >
                  <p className="font-black text-white text-sm">{player.name}</p>
                </div>
              ))}
          </div>
        </div>

        <div
          className="relative w-full lg:min-h-[8rem] min-h-[5rem] bg-orange-200 rounded-lg px-2 py-2 mt-4 border border-gray-400"
          onDragOver={(e) => onDragOver(e)}
          onDrop={addAbsentees}
          onClick={onClickInAbsentees}
        >
          <h2 className="text-center text-xl font-bold">Ausentes</h2>

          <button
            onClick={onClearLinedAbsentees}
            className="absolute top-1 right-1 cursor-pointer bg-red-500 rounded-2xl p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>

          <div id="Absent" className="flex gap-1 md:text-center">
            {absentees?.length > 0 &&
              absentees.map((player) => (
                <div
                  className="p-1 bg-green-700 text-center rounded-lg hover:cursor-pointer"
                  key={player._id}
                  onClick={() => onClickLinedAbsentees(player)}
                  onDragStart={() => onDragPlayer(player)}
                  draggable="true"
                >
                  <p className="font-black text-white text-sm">{player.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <CustomConfirmationDialog
        message="¿Estás seguro de que deseas eliminar esta Alineación?"
        onConfirm={deleteLineUp}
        isVisible={deleteLineUpVisible}
        setIsVisible={setDeleteLineUpVisible}
      />
    </>
  );
};

export default LineUps;
