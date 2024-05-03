import React from "react";
import { IoSearch } from "react-icons/io5";
import { useForm } from "@inertiajs/react";

interface SearchProps {
    placeholder: string;
    url: string;
    date?: boolean;
}

const InputSearch = ({ placeholder, url, date }: SearchProps) => {
    const { data, setData, post, get, processing, errors } = useForm({
        q: "",
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        get(route(url));
    }

    return (
        <div className=" w-96 border border-gray-300 rounded-md pl-2 py-1">
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-between"
            >
                <div className="w-full">
                    <input
                        name="search"
                        value={data.q}
                        onChange={(e) => setData("q", e.target.value)}
                        className="w-full p-1 ring-0 focus:ring-0 shadow-none focus:shadow-none focus:outline-none border-none focus:border-none text-gray-500 placeholder:text-gray-400"
                        type={date ? "date" : "search"}
                        placeholder={placeholder}
                        autoComplete="off"
                    />
                </div>
                <button type="submit" disabled={processing}>
                    <div className="mx-2 text-gray-500">
                        <IoSearch size={20} />
                    </div>
                </button>
            </form>
        </div>
    );
};

export default InputSearch;
