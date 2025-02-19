type ButtonProps = {
    text: string;
};

export const Button = ({ text }: ButtonProps) => {
    return (
        <button className="bg-norway-400 w-24 h-auto rounded-md text-xl font-medium tracking-wider p-2 border border-black">{text}</button>
    )
}