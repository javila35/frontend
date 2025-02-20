import { Link } from "react-router";

export const NavBar = () => {
    return <div className="flex w-full pl-2 bg-mine-shaft-500">
        <Link to="/seasons" className="text-white text-xl p-4">Seasons</Link>
        <Link to="/players" className="text-white text-xl p-4">Players</Link>
    </div>
};