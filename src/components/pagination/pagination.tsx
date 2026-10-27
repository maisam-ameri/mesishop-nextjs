import { PaginationModel } from "@/domain/paginationModel";

interface PaginationProps {
    paginationModel: PaginationModel
}

export default function Pagination(paginationModel: PaginationProps) {

    let prevContinue = false;
    let nextContinue = false;
    const page = paginationModel.paginationModel.page;
    const onClick = paginationModel.paginationModel.onClick;
    const shiftIndex = paginationModel.paginationModel.shiftIndex;
    const totalPages = paginationModel.paginationModel.totalPages;
    const indexes = getIndexes();
    page === 0 ? 1 : page;

    function createButtons() {

        return (
            indexes.map(index => {
                return (
                    <button
                        className={index === page ? "btn btn-primary" : "btn"}
                        key={index}
                        onClick={() => onClick(index)}
                        disabled = {index === page}
                    >{index}</button>
                )
            })

        )
    }

    function getIndexes() {

        let indexes = [];
        let currentPage = page;

        if (shiftIndex > totalPages) {

            for (let index = 1; index <= totalPages; index++) {
                indexes.push(index);
            }

            return indexes;
        }

        if (page > shiftIndex) {
            const count = page < totalPages
                ? shiftIndex
                : shiftIndex + 1;

            for (let index = 1; index <= count; index++) {
                indexes.push(currentPage--);
            }

            indexes = indexes.reverse();
        }
        else {
            for (let index = 1; index <= shiftIndex; index++) {
                indexes.push(index);
            }
        }

        if (page < totalPages && totalPages > shiftIndex)
            indexes.push(indexes[indexes.length - 1] + 1);


        if (indexes[indexes.length - 1] < totalPages)
            nextContinue = true;

        if (page > shiftIndex + 1)
            prevContinue = true;

        return indexes;
    }

    return (
        <div className="pagination">

            <button 
            className="btn btn-outline"
            disabled={page <= 1} 
            onClick={() => onClick(page !== 0 ? page - 1 : page)}>
                Prev
            </button>

            {prevContinue &&
                <>
                    <button className="btn" onClick={() => onClick(1)}>
                        {1}
                    </button>
                    <span>...</span>
                </>
            }
            {createButtons()}

            {nextContinue &&
                <>
                    <span>...</span>
                    <button className="btn" onClick={() => onClick(totalPages)}>
                        {totalPages}
                    </button>
                </>
            }
            <button 
            className="btn btn-outline"
            disabled={page === totalPages} 
            onClick={() => onClick(page < totalPages ? page + 1 : page)}>
                Next
            </button>

        </div>
    );

}