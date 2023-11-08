import jersey from "../assets/jersey.png";

const PlayerLineUpPosition = ({
  id,
  cols,
  rows,
  dragOver,
  drop,
  click,
  player,
  onDragPlayer,
  number,
}) => {
  return (
    <div
      className="w-full h-full rounded-sm"
      style={{
        gridColumnStart: `${cols?.start}`,
        gridColumnEnd: `${cols?.end}`,
        gridRowStart: `${rows?.start}`,
        gridRowEnd: `${rows?.end}`,
      }}
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => drop(e)}
      onClick={(e) => click(e)}
      draggable="true"
      onDragStart={() => onDragPlayer(player)}
    >
      <div
        id={`${id && id}`}
        className="relative w-5/6 h-4/6 mx-auto p-1 flex flex-col text-center
              bg-green-800 hover:bg-green-600 transition-colors
              hover:cursor-pointer border border-green-500 shadow-lg rounded-lg"
        style={{
          fontSize: "0.75rem",
          backgroundImage: `url(${player?._id && jersey})`,
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> 
          <span className="text-white font-bold" style={{ fontSize: '1.3rem' }}>{number}</span>
        </div>
      </div>

      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: "700",
          textAlign: "center",
          lineHeight: "0.75rem",
        }}
      >
        {player?._id && player.name}
      </p>
    </div>
  );
};

export default PlayerLineUpPosition;
