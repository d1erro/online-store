function CartCount() {
    return (
        <div className="flex w-[200px] rounded-xl border-2 border-black bg-black">
            <button className="flex-1 text-white">-</button>
            <input
                className="flex h-[50px] w-[50px] flex-1 border-x-2 text-center"
                defaultValue="1"
            ></input>
            <button className="flex-1 text-white">+</button>
        </div>
    );
}

export default CartCount;
