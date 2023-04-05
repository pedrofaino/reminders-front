

export default function Button ({ label, onClick, className }) {
    return (
        <>
            <button
            className={`bg-rose border text-white pt-2 pr-6 pb-2 pl-6 text-lg font-medium transition-all duration-200 hover:bg-gray-700 rounded-lg ${className}`}
            onClick={onClick}
            >
                {label}
            </button>
        </>
    )
}