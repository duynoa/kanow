const BackgroundUiProfile = ({ children, className, ...props }: { children: React.ReactNode, className?: any }) => {
    return (
        <div {...props} className={`${className} rounded-2xl bg-white md:p-8 p-6`}>
            {children}
        </div>
    )
}
export default BackgroundUiProfile