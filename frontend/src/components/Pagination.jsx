const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    return (
      <div className='flex justify-end mt-4'>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={`mx-1 w-8 h-8 flex items-center justify-center rounded-full ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  