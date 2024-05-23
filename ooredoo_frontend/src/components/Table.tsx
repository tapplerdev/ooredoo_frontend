type TableProps = {
    id: number;
    channel: string;
    price: number;
}

const Table = () => {
    return (
        <div className="p-5 h-screen bg-gray-100">
            <h1 className="text-xl mb-2">Your orders</h1>
            <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-300">
                    <tr>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Details</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <a href="#">10001</a>
                        </td>
                        <td>
                            Kring New Office Chair
                        </td>
                        <td>
                            Delivered
                        </td>
                        <td>16/10/2021</td>
                        <td>$200.0</td>    
                    </tr>
                </tbody>
            </table>
        </div>
    )

}


export default Table;

