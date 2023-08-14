import { Container } from '@mui/material'
import React from 'react'
import Form from '../forms/Form'

export default function EditProduct() {
  
  return (
    <Container>
        <Form isEdit={true}/>
    </Container>
  )
}
