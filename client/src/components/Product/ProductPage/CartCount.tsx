function CartCount() {
    return (
        <div className="flex bg-black w-[200px] rounded-xl border-black border-2">
            <button className="flex-1 text-white">-</button>
            <input
                className="flex-1 flex w-[50px] h-[50px] text-center border-x-2"
                defaultValue="1"
            ></input>
            <button className="flex-1 text-white">+</button>
        </div>
    );
}

export default CartCount;
