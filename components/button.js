

export default function Button ({ label, onClick, className }) {
    return (
        <>
            <button
            className={`bg-rose border text-white pr-6 pl-6 text-lg font-medium transition-all duration-200 hover:bg-gray-700 rounded-lg ${className}`}
            onClick={onClick}
            >
                {label}
            </button>
        </>
    )
}