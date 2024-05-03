import { Link } from '@inertiajs/react'

interface LinkProps {
    url?: any;
    openSide: any;
    icon: any;
    label: string;
    active: boolean;
}
const SideLink = (props: LinkProps) => {
    return (
        <li>
            <Link
                className={`flex items-center p-2 text-base font-medium gap-x-2 rounded-md hover:bg-white hover:bg-opacity-40
                ${props.active ? "bg-white text-gray-800" : "text-white"}`}
                href={props.url}
            >
                <div className={`${!props.openSide && 'py-0'}`}>
                    {props.icon}
                </div>
                <div className={`${!props.openSide && "hidden"} origin-left duration-300`}>{props.label}</div>
            </Link>
        </li>
    )
}

export default SideLink