import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { productContext } from '../context/ProductContext';

export default function ProductCard({item}) {
    const {deleteProduct}=useContext(productContext)
    const navigate=useNavigate()

  return (
    <Card sx={{ width: 322, marginRight: 5 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.picture}
        title="picture"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{height: "100px"}}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small" onClick={()=>navigate(`/detail/${item.id}`)}>Buy</Button>       {/* details #1 */}
        <Button variant='contained' color='secondary' size="small" onClick={()=>navigate(`/edit/${item.id}`)}>Edit</Button>    {/* edit #1 */}   
        <Button variant='contained' color='error' size="small" onClick={()=>deleteProduct(item.id)}>Delete</Button>     {/* deleteProduct #2 */}   
      </CardActions>
    </Card>
  );
}
