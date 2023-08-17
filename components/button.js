

export default function Button ({ label, onClick, className, img }) {
    return (
        <>
            <button
            className={`bg-7 border text-white pr-6 pl-6 text-lg font-medium transition-all duration-200 rounded-lg ${className}`}
            onClick={onClick}
            ><img className="w-[25px]" src={img}/>
                {label}
            </button>
        </>
    )
}