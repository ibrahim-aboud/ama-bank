export default function ConfirmPopup({ message, onConfirm, onExit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
      <div className="w-[400px]">
        <div className="bg-white rounded p-10 flex flex-col justify-center items-center">
          <h2 className="mb-10 font-semibold">{message}</h2>
          <div>
            <button
              className="bg-gray-200 p-2 rounded border mr-10 hover:bg-green-100 font-medium"
              onClick={onConfirm}
            >
              Confirmer
            </button>

            <button
              className="bg-gray-200 p-2 rounded border hover:bg-red-100 font-medium"
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
