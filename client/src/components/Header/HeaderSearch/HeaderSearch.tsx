import SearchIcon from '@mui/icons-material/SearchOutlined';

function HeaderSearch() {
    return (
        <div className="flex flex-grow justify-center items-center">
            <input
                className="w-[90%] rounded outline-none bg-white h-10 px-5"
                placeholder="Search"
            ></input>

            <div className="p-2">
                <SearchIcon sx={{ color: 'white' }} fontSize="large" />
            </div>
        </div>
    );
}

export default HeaderSearch;
