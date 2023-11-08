import { Link } from 'react-router-dom';

const PreviewGenerations = ({generation}) => {
    const { name, _id } = generation;

    return (
        <div className="border-b p-5 flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-2">
                <p className="flex-1">
                    {name}
                </p>
            </div>

            <Link
                to={`${_id}`}
                className='text-white bg-green-700 p-3 rounded-xl hover:text-gray-100 hover:bg-green-900 uppercase text-sm font-bold'
            >Ver Categoría</Link>
        </div>
    )
}

export default PreviewGenerations