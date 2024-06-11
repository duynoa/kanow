const BackgroundUiVehicle = ({ children, className, ...props }: { children: React.ReactNode, className?: any }) => {
    return (
        <div {...props} className={`${className} lg:rounded-2xl bg-white lg:p-8 p-4`}>
            {children}
        </div>
    )
}
export default BackgroundUiVehicle