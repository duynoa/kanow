const LoadingData = () => {
    return (
        <div className="w-full 3xl:h-[80px] h-[60px] flex justify-center items-center gap-2">
            <div className="text-[#2FB9BD] inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <span className="text-[#2FB9BD] 3xl:text-xl text-base">Loading...</span>
        </div>
    )
}
export default LoadingData