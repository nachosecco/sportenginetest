import pitch from "../assets/canchaopcion2.png";
import PlayerLineUpPosition from "./PlayerLineUpPosition";

const RugbyField = ({
  dragOver,
  drop,
  click,
  lineUp,
  onDragPlayer,
  onClearLinedPlayers,
}) => {
  return (
    <div className="relative w-full md:w-9/12 h-full">
      <img
        src={pitch}
        alt="Rugby Field"
        className="w-full rounded-lg shadow-lg"
      />

      <div className="absolute top-0 left-0 p-4 my-4 grid grid-cols-8 grid-rows-5 w-full h-full">
        <PlayerLineUpPosition
          id={"Loosehead_Prop"}
          cols={{ start: 7, end: 8 }}
          rows={{ start: 2, end: 3 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[0]}
          onDragPlayer={onDragPlayer}
          number="1"
        />

        <PlayerLineUpPosition
          id={"Hooker"}
          cols={{ start: 7, end: 8 }}
          rows={{ start: 3, end: 4 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[1]}
          onDragPlayer={onDragPlayer}
          number="2"
        />

        <PlayerLineUpPosition
          id={"Tighthead_Prop"}
          cols={{ start: 7, end: 8 }}
          rows={{ start: 4, end: 5 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[2]}
          onDragPlayer={onDragPlayer}
          number="3"
        />

        <PlayerLineUpPosition
          id={"Lock-1"}
          cols={{ start: 6, end: 7 }}
          rows={{ start: 2, end: 3 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[3]}
          onDragPlayer={onDragPlayer}
          number="4"
        />

        <PlayerLineUpPosition
          id={"Lock-2"}
          cols={{ start: 6, end: 7 }}
          rows={{ start: 4, end: 5 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[4]}
          onDragPlayer={onDragPlayer}
          number="5"
        />

        <PlayerLineUpPosition
          id={"Blindside_Flanker"}
          cols={{ start: 5, end: 6 }}
          rows={{ start: 2, end: 3 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[5]}
          onDragPlayer={onDragPlayer}
          number="6"
        />

        <PlayerLineUpPosition
          id={"Openside_Flanker"}
          cols={{ start: 5, end: 6 }}
          rows={{ start: 4, end: 5 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[6]}
          onDragPlayer={onDragPlayer}
          number="7"
        />

        <PlayerLineUpPosition
          id={"Number_8"}
          cols={{ start: 5, end: 6 }}
          rows={{ start: 3, end: 4 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[7]}
          onDragPlayer={onDragPlayer}
          number="8"
        />

        <PlayerLineUpPosition
          id={"Scrum_Half"}
          cols={{ start: 4, end: 5 }}
          rows={{ start: 3, end: 4 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[8]}
          onDragPlayer={onDragPlayer}
          number="9"
        />

        <PlayerLineUpPosition
          id={"Fly_Half"}
          cols={{ start: 4, end: 5 }}
          rows={{ start: 4, end: 5 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[9]}
          onDragPlayer={onDragPlayer}
          number="10"
        />

        <PlayerLineUpPosition
          id={"Left_Wing"}
          cols={{ start: 2, end: 3 }}
          rows={{ start: 1, end: 2 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[10]}
          onDragPlayer={onDragPlayer}
          number="11"
        />

        <PlayerLineUpPosition
          id={"Inside_Center"}
          cols={{ start: 3, end: 4 }}
          rows={{ start: 3, end: 4 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[11]}
          onDragPlayer={onDragPlayer}
          number="12"
        />

        <PlayerLineUpPosition
          id={"Outside_Center"}
          cols={{ start: 3, end: 4 }}
          rows={{ start: 4, end: 5 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[12]}
          onDragPlayer={onDragPlayer}
          number="13"
        />

        <PlayerLineUpPosition
          id={"Right_Wing"}
          cols={{ start: 2, end: 3 }}
          rows={{ start: 5, end: 6 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[13]}
          onDragPlayer={onDragPlayer}
          number="14"
        />

        <PlayerLineUpPosition
          id={"Full_Back"}
          cols={{ start: 2, end: 3 }}
          rows={{ start: 3, end: 4 }}
          dragOver={dragOver}
          drop={drop}
          click={click}
          player={lineUp[14]}
          onDragPlayer={onDragPlayer}
          number="15"
        />
      </div>

      <button
        onClick={onClearLinedPlayers}
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
    </div>
  );
};

export default RugbyField;
