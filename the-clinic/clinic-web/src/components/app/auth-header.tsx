type AuthHeaderProps = {
    title: string
    message: string
}

export default function AuthHeader({title, message} : AuthHeaderProps) {
    return (
        <>
            <h1 className="text-2xl mb-3">{title}</h1>
            <p className="text-gray-500">{message}</p>
        </>
    )
}