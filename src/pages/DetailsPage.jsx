import React, { useContext, useEffect, useState } from 'react'
import { productContext } from '../context/ProductContext'
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Container } from '@mui/material';

function DetailsPage() {
  const {getOneProduct, oneProduct}=useContext(productContext);
  const {id}=useParams()                                              // detail #6

  useEffect(()=>{
    getOneProduct(id)
  },[])
  
  return (
    <div>
      {oneProduct ? (
        <Container sx={{mt: 8}}>
          <Card sx={{ maxWidth: "100%", mb: 10 }}>
          <CardActionArea sx={{height: 600, display: 'flex', p: 2}}>
          <CardMedia
          sx={{width: 500, objectFit: 'contain'}}
          component="img"
          height="340"
          image={oneProduct.picture}
          alt="product"
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
            {oneProduct.title}
          </Typography>
          <br />
          <Typography variant="h4" color="text.secondary" component='div'>
              {oneProduct.description}
            </Typography>
            <br />
            <CardContent>
              <Typography variant='h4' component="div" color="text.secondary">${oneProduct.price}</Typography>
            </CardContent>
          </CardContent>
          </CardActionArea>
          <CardActions>
            <Button sx={{m: 2}} size='small' variant='contained'>Add to Bag</Button>
          </CardActions>
          </Card>
        </Container>
      ) : (
        <h1 className='text-center'>Loading...</h1>
      )}
      
    </div>
  )
}

export default DetailsPage