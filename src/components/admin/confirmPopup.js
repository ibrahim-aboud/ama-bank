export default function ConfirmPopup({
  title,
  icon,
  color,
  message,
  onConfirm,
  onExit,
}) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50`}
    >
      <div className="w-[350px] sm:w-[500px]">
        <div
          className={`py-4 rounded-t-md text-white flex justify-center items-center`}
          style={{
            backgroundColor: color,
          }}
        >
          {icon}
          <h2>{title}</h2>
        </div>

        <div className="bg-white rounded-b-md pt-4 sm:pt-8 flex flex-col justify-center items-center">
          <h2 className="mb-8 font-semibold">{message}</h2>

          <div className="w-full">
            <button
              className="w-1/2 bg-gray-200 p-2 rounded-bl-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
              onClick={onConfirm}
            >
              Confirmer
            </button>

            <button
              className="w-1/2 bg-gray-200 p-2 rounded-br-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
              onClick={onExit}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
