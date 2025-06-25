import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export function PokemonCard({name, image, types, onClick}) {

  const typeHandler = () =>{
    if (types[1]){
      return types[0].type.name + " | " + types[1].type.name
    }
    return types[0].type.name
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {typeHandler()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokemonCard;