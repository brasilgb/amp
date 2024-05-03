import Profile from "../Profile"

const Header = () => {
    return (
        <header className="bg-gray-50 shadow-sm">
            <div className="px-6 py-4 mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                       
                    </div>
                    <div>
                        <Profile/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header