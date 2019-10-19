import React from 'react'
import { TablePagination } from 'react-pagination-table'

export default props => (
    <div>
        <TablePagination
            title={props.title}
            subTitle={props.subTitle}
            headers={props.headers}
            data={props.data}
            columns={props.columns}
            perPageItemCount={ 5 }
            totalCount={props.data.length}
            arrayOption={ [["size", 'all', ' ']] }
        />
    </div>
)