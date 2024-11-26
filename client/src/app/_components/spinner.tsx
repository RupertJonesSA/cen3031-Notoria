const Spinner = () =>{
  return(
    <div className="flex absolute justify-center items-center h-full w-full z-10 bg-black">
      <div className="animate-spin h-32 w-32 rounded-full border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default Spinner;
