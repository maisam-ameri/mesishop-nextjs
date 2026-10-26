export interface PaginationModel {
    page: number,
    totalPages: number,
    shiftIndex: number,
    onClick: (page:number) => void
}