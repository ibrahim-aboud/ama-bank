function NotFound() {
    return (
      <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center overflow-hidden bg-black text-white text-xl">
        <div>500</div>
        <div>Internal server error</div>
      </div>
    );
  }
  
  NotFound.getLayout = function PageLayout(page) {
    return <>{page}</>;
  };
  
  export default NotFound;
  