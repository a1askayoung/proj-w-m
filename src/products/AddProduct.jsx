import { Container } from '@mui/material'
import React from 'react'
import Form from '../forms/Form'

export default function AddProduct() {
  return (
    <Container>
        <Form isEdit={false}/>
    </Container>
  )
}
