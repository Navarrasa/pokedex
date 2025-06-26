import { useEffect, useState } from "react";
import axios from "axios";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';
import { PokemonModal } from '../../components/PokemonModal/PokemonModal';
import { Filtros } from '../../components/Filtros/Filtros';

export function Home(){

  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);


  useEffect(() => {
      getPokemons();
  }, []);

  const getPokemons = () => {
    let pokemonQuantity = prompt("Quantos Pokemons deseja carregar?? (1-151)");
    let endpoints = [];
    for (let i = 1; i <=pokemonQuantity; i++){
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    }

    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setAllPokemons(res);
        setPokemons(res);
      })
      .catch((err) => console.log(err));
  };

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPokemon(null);
  };

  const pokemonFilter = (name) =>{
    if(name === ""){
      setPokemons(allPokemons);
    } else {
      const filteredPokemons = allPokemons.filter(p => p.data.name.includes(name.toLowerCase()));
      setPokemons(filteredPokemons);
    }
  };

  const handleSelectType = (type) => {
    if(type === "all"){
      setPokemons(allPokemons);
    } else {
      const filteredPokemons = allPokemons.filter(p => p.data.types.some(t => t.type.name === type)
      );
      setPokemons(filteredPokemons);
    }};

  return(
  <>
    <Navbar pokemonFilter={pokemonFilter} handleSelectType={handleSelectType}/>
    <Container maxWidth="false" sx={{ mt: 3, mb: 3 }}>
      <Grid container spacing={3}>
        {pokemons.map((pokemon, index) => {
          const data = {
            name: pokemon.data.name,
            image: pokemon.data.sprites.front_default,
            types: pokemon.data.types,
          };
          return (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
              <PokemonCard 
                name={data.name} 
                image={data.image}
                types={data.types}
                onClick={() => handleCardClick(data)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
    <PokemonModal open={open} handleClose={handleClose} pokemon={selectedPokemon}/>
    <Footer />
  </>
  );
}

export default Home;
