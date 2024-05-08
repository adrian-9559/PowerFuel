import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Pagination, Tooltip } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';

function truncateString(str, maxLength) {
    if (typeof str !== 'string' || str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

const AdminTable = ({ dataItems, columns, selectedRows, setSelectedRows, totalPages, page, setPage, onEditClick }) => {

    
    return (
        dataItems && dataItems.length > 0 && (
            <AnimatePresence mode='wait'>
                <motion.div
                    key={dataItems.map(item => item.id).join(',')}
                    initial={{ opacity: 0 , width: '100%'}} // Add overflow: 'hidden'
                    animate={{ opacity: 1}} // Add overflow: 'visible'
                    exit={{ opacity: 0 }} // Add overflow: 'hidden'
                    transition={{ duration: 0.25 }}
                >
                    <Table
                        aria-label="Admin Panel Table"
                        selectedKeys={selectedRows}
                        onSelectionChange={(keys) => {
                            setSelectedRows(keys);
                        }}
                        bottomContent={
                            totalPages > 0 ? (
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={page}
                                        total={totalPages}
                                        onChange={(page) => setPage(page)}
                                    />
                                </div>
                            ) : null
                        }
                        selectionMode="multiple"
                        className="h-full w-full overflow-x-auto overflow-y-auto"
                    >
                        <TableHeader className="flex justify-center items-center">
                            {columns.filter(column => column !== 'id').map((column, columnIndex) => (
                                <TableColumn key={columnIndex} aria-label={`Column ${columnIndex + 1}`}>{dataItems[0][column].display}</TableColumn>
                            ))}
                            <TableColumn aria-label="Edit Column" className='flex justify-center items-center'></TableColumn>
                        </TableHeader>
                        <TableBody onEmptied={'No hay product'}>
                            {dataItems.map((row, rowIndex) => (
                                <TableRow key={row['id']} aria-label={`Row ${rowIndex}`}>
                                    {columns.filter(column => column !== 'id').map((column, columnIndex) => {
                                        const cellData = row[column].value;
                                        const truncatedData = truncateString(cellData, 50);
                                        return (
                                            <TableCell key={columnIndex} aria-label={`Cell ${columnIndex + 1}`}>
                                                {truncatedData}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell className="flex justify-center items-center">
                                        <Tooltip color="success" content="Editar" delay={750} closeDelay={1000} className='text-white'>
                                            <Button  onClick={() => onEditClick(row['id'])} color="success" aria-label="Edit Button" isIconOnly>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </motion.div>
            </AnimatePresence>
        )
    );
};

export default AdminTable;