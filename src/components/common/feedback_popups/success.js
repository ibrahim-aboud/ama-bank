import { BsCheckCircleFill } from 'react-icons/bs'

export default function SuccessFeedback({message, isVisible, isSuccessful}) {
    
    return (
        <div>
            <div className={`fixed bottom-0 left-0 right-0 bg-opacity-0 flex items-center justify-center z-[60] transform transition duration-150 ease-in-out ${isVisible && isSuccessful ? "translate-y-[-20px]" : "translate-y-full"}`}>
                <div className="">
                    <div className='flex drop-shadow-lg items-center font-semibold bg-[#79c428e0] text-white rounded-t-md p-2 sm:p-4'>
                        <BsCheckCircleFill size={18} />
                        <h2 className="ml-2">{message}</h2>
                    </div>
                    <div className="block bg-[#8a997b] h-[3px]" />
                </div>
            </div>
        </div>
    );
}