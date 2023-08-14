import React, { useContext, useEffect, useState } from 'react'
import { productContext } from '../context/ProductContext'
import ProductCard from './ProductCard'
import { Box } from '@mui/material'
import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'
import FilterProduct from './FilterProduct'

export default function ProductList() {
    const {getProducts, products, productsTotalCount}=useContext(productContext)        //GET #5        //! PAGINATION #10
    const [paginateParams, setPaginateParams]=useSearchParams()             //! PAGINATION #2
    
    const [page, setPage]=useState(
        paginateParams.get('_page') ? paginateParams.get('_page') : 1           //! PAGINATION #3
    )

    const [limit, setLimit]=useState(
        paginateParams.get('_limit') ? paginateParams.get('_limit') : 3             //! PAGINATION #4
    )

    useEffect(()=>{
        setPaginateParams({                                                                 //! PAGINATION #5
            _limit: limit,
            _page: page,
        })
    }, [limit, page])

    useEffect(()=>{
        getProducts()                           //GET #6
    },[paginateParams])                                                         //! PAGINATION #6 [paginateParams]  
                                                                                //! pagination. next step is in the context
  return (
      <Box>
        <FilterProduct/>
        <div className='d-flex flex-wrap justify-around' style={{width: "1100px", margin: "0 auto", rowGap: "20px"}}>
            {products ? (
                products.map((item)=>
                    (
                        <ProductCard key={item.id} item={item}/>  // GET #7 
                    )
                )
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', m: 5}}>
            <Pagination onChange={(page, limit)=>{                                                              {/* PAGINATION #1 */}
                setPage(page);                                                                                  {/* PAGINATION #11 onChange, current, pageSize, defaultCurrent, total */}
                setLimit(limit);
            }}
                current={page}
                pageSize={limit}
                defaultCurrent={1}
                total={productsTotalCount}
            />                                                                                              
        </Box>
    </Box>
  )
}
