import { Link } from 'react-router-dom';

const PreviewLineUps = ({lineUp}) => {
    const { name, _id } = lineUp;

    return (
        <div className="bg-sky-100 p-4 border border-gray-100 rounded-t-lg rounded-b-lg">
        <div className="border-b p-5 flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md mb-4 border-2 border-gray-200">
        <div className="flex items-center gap-2">
            <p className="flex-1 text-black-700 font-semibold">
            {name}
            </p>
        </div>

        <Link
            to={`lineups/${_id}`}
            className='text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded uppercase text-sm font-bold'
        >Ver Alineación
        </Link>
        </div>
        </div>
      
    )
}

export default PreviewLineUps