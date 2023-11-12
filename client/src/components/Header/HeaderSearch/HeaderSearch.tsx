import SearchIcon from '@mui/icons-material/SearchOutlined';

function HeaderSearch() {
    return (
        <div className="flex flex-grow items-center justify-center">
            <input
                className="h-10 w-[90%] rounded bg-white px-5 outline-none"
                placeholder="Search"
            ></input>

            <div className="p-2">
                <SearchIcon sx={{ color: 'white' }} fontSize="large" />
            </div>
        </div>
    );
}

export default HeaderSearch;
