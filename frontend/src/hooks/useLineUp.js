import { useEffect, useState } from "react";
import { useGenerations } from "./useGenerations";
import { useLineUps } from "./useLineUps";

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

const positions = [
  "Loosehead Prop",
  "Hooker",
  "Thighthead Prop",
  "Lock-1",
  "Lock-2",
  "Blindside Flanker",
  "Openside Flanker",
  "Number 8",
  "Scrum Half",
  "Fly Half",
  "Left Wing",
  "Inside Center",
  "Outside Center",
  "Right Wing",
  "Full Back",
];

export const useLineUp = ({ generationId, lineUpId }) => {
  const { generation, handleGeneration, showAlert } = useGenerations();
  const { handleNewLineUp, getLineUp, lineUp } = useLineUps();

  const { players } = generation;

  const [generationPlayers, setGenerationPlayers] = useState([]);
  const [playersLineUp, setPlayersLineUp] = useState(initialLineUp);
  const [playersAlternates, setPlayersAlternates] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    handleGeneration(generationId);
    handleNewLineUp();

    if (lineUpId) getLineUp(lineUpId);

    return () => {
      setPlayersLineUp(initialLineUp);
      setPlayersAlternates([]);
      setSelectedPlayer(null);
      setName("");
    };
  }, [generationId, lineUpId]);

  useEffect(() => {
    setGenerationPlayers(players);

    return () => {
      setGenerationPlayers([]);
    };
  }, [players]);

  useEffect(() => {
    if (!lineUp?.players) return;

    const dbAlternates = lineUp.players.filter(
      (player) => player.position === "Alternate"
    );

    setPlayersAlternates(
      dbAlternates.map((alternate) => ({
        _id: alternate.player,
        name: alternate.name,
        position: alternate.position,
      }))
    );

    return () => {
      setPlayersAlternates([]);
    };
  }, [lineUp]);

  useEffect(() => {
    if (!lineUp?.players) return;

    const dbPlayers = lineUp.players.filter(
      (player) => player.position !== "Alternate"
    );

    const updatedPlayers = playersLineUp.map((linedPlayer) => {
      if (
        dbPlayers.some((dbPlayer) => dbPlayer.position !== linedPlayer.position)
      ) {
        return linedPlayer;
      }

      return dbPlayers.find(
        (dbPlayer) => dbPlayer.position === linedPlayer.position
      );
    });

    setPlayersLineUp(updatedPlayers);

    return () => {
      setPlayersLineUp([]);
    };
  }, [lineUp]);

  useEffect(() => {
    let allPlayers = [...playersLineUp, ...playersAlternates].map(
      (player) => player._id
    );

    setGenerationPlayers(
      generationPlayers.filter(
        (genPlayer) => !allPlayers.includes(genPlayer._id)
      )
    );
  }, [playersAlternates, playersLineUp]);

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onSelectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const onClickBench = ({ event, player }) => {
    if (selectedPlayer) {
      onDropInto(event);
    }

    onSelectPlayer(player);
  };

  const onClickLineUpOrAlternates = (event) => {
    if (selectedPlayer) {
      onDropInto(event);
      return;
    }
  };

  const onClickRemovePlayer = (player) => {
    addIntoBench(player);
  };

  const onDropInto = (event) => {
    const position = event.target.id;
    const positionRefactor = position.replace("_", " ");

    if (positionRefactor === "Alternate") {
      addIntoAlternates();
    } else if (positionRefactor === "Bench") {
      addIntoBench(selectedPlayer);
    } else if (positions.includes(positionRefactor)) {
      addIntoLineUp(positionRefactor);
    }

    setSelectedPlayer(null);
  };

  const addIntoLineUp = (position) => {
    if (
      playersLineUp.some(
        (linedPlayer) =>
          linedPlayer.position === position && linedPlayer._id !== null
      )
    ) {
      showAlert({
        msg: "La posición ya está ocupada",
        error: true,
      });
      setSelectedPlayer(null);
      return;
    }

    if (
      playersLineUp.some(
        (linedPlayer) => linedPlayer._id === selectedPlayer._id
      ) ||
      playersAlternates.some(
        (alternatePlayer) => alternatePlayer._id === selectedPlayer._id
      )
    ) {
      showAlert({
        msg: "El jugador ya esta alineado",
        error: true,
      });
      setSelectedPlayer(null);
      return;
    }

    setGenerationPlayers(
      generationPlayers.filter(
        (generationPlayer) => generationPlayer._id !== selectedPlayer._id
      )
    );

    setPlayersAlternates(
      playersAlternates.filter(
        (alternatePlayer) => alternatePlayer._id !== selectedPlayer._id
      )
    );

    setPlayersLineUp(
      playersLineUp.map((linedPlayer) =>
        linedPlayer.position !== position
          ? linedPlayer
          : { _id: selectedPlayer._id, name: selectedPlayer.name, position }
      )
    );

    setSelectedPlayer(null);
  };

  const addIntoBench = (player) => {
    setPlayersAlternates(
      playersAlternates.filter(
        (alternatePlayer) => alternatePlayer._id !== player._id
      )
    );

    setPlayersLineUp(
      playersLineUp.filter((linedPlayer) => linedPlayer._id !== player._id)
    );

    setGenerationPlayers([
      ...generationPlayers,
      { _id: player._id, name: player.name },
    ]);
  };

  const addIntoAlternates = () => {
    if (
      playersLineUp.some(
        (linedPlayer) => linedPlayer._id === selectedPlayer._id
      ) ||
      playersAlternates.some(
        (alternatePlayer) => alternatePlayer._id === selectedPlayer._id
      )
    ) {
      showAlert({
        msg: "El jugador ya esta alineado",
        error: true,
      });
      setSelectedPlayer(null);
      return;
    }

    setGenerationPlayers(
      generationPlayers.filter(
        (generationPlayer) => generationPlayer._id !== selectedPlayer._id
      )
    );

    setPlayersLineUp(
      playersLineUp.filter(
        (linedPlayer) => linedPlayer._id !== selectedPlayer._id
      )
    );

    setPlayersAlternates([
      ...playersAlternates,
      {
        _id: selectedPlayer._id,
        name: selectedPlayer.name,
        position: "Alternate",
      },
    ]);
    setSelectedPlayer(null);
  };

  const getLinedPlayer = (id) => {
    const position = id.replace("_", " ");

    const playerWithPosition = playersLineUp.find(
      (linedPlayer) => linedPlayer.position === position
    );

    return playerWithPosition ? playersLineUp : {};
  };

  return {
    generationPlayers,
    playersLineUp,
    playersAlternates,
    selectedPlayer,
    name,
    setName,
    onDragOver,
    onSelectPlayer,
    onClickBench,
    onClickLineUpOrAlternates,
    onDropInto,
    getLinedPlayer,
    onClickRemovePlayer,
  };
};
