function HeaderSearch() {
    return (
        <div className="hidden flex-grow items-center justify-center md:flex">
            <input
                className="h-10 w-[90%] rounded bg-white px-5 outline-none placeholder:text-neutral-700 dark:bg-neutral-200 dark:text-black"
                placeholder="Поиск"
            ></input>
        </div>
    );
}

export default HeaderSearch;
