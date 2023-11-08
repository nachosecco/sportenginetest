import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewEvents = ({ event }) => {
  const { auth } = useAuth();
  const { name, _id, client, creator, date } = event;

  const formatDate = (dateString) => {
    const inputDate = new Date(dateString);
    return `${String(inputDate.getUTCDate()).padStart(2, '0')}/${String(inputDate.getUTCMonth() + 1).padStart(2, '0')}/${inputDate.getUTCFullYear()}`;
  };

  return (
    <div className="py-6 my-6 rounded-lg shadow-lg bg-gradient-to-br from-white-100 to-white-200 border-2 border-gradient-to-r from-blue-300 via-blue-300 to-blue-400 hover:from-blue-300 hover:via-blue-400 hover:to-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="p-5 flex flex-col md:flex-row">
        <div className="flex-1 mb-4 md:mb-0">
          <p className="text-lg font-semibold">
            📅 {name}
          </p>
          <span className="text-sm text-gray-900">
            👤 {client}
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-2 md:mb-0 md:mr-4">
            {auth._id !== creator ? (
              <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
                🎟️ Invitado
              </p>
            ) : (
              <p className="p-1 text-xs rounded-lg text-white bg-orange-500 font-bold uppercase">
                🛠️ Admin
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-bold">
              📆 Fecha: {formatDate(date)}
            </span>
            <Link
              to={`${_id}`}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
              style={{ whiteSpace: 'nowrap' }}
            >
              📌Ver evento
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewEvents;
