import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function PokemonModal({ open, handleClose, pokemon }) {
  if (!pokemon) return null;
  console.log(pokemon)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {pokemon.name}
        </Typography>
        <img src={pokemon.image} alt={pokemon.name} style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Modal>
    </div>
  );
}

export default PokemonModal;