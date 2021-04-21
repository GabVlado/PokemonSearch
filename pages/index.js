import { useState } from "react";


export default function HomePage(props) {

  
  const {pokemonArr} = props
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')


  const filteredPokemons  = () =>{

    if( search.length === 0 ){
      return pokemonArr.slice(currentPage,currentPage + 5);
    }

    const filtered = pokemonArr.filter(  poke =>  poke.name.includes(search));
    return filtered.slice(currentPage, currentPage + 5)
  }

  const nextPage = (  ) =>{ 
    if(pokemonArr.filter(  poke =>  poke.name.includes(search)).length > currentPage +5)
    setCurrentPage(currentPage + 5)
  }

  const previusPage = (  ) =>{ 
    if(currentPage > 0)
    setCurrentPage(currentPage - 5)
  }

  const  onSearchChange = ( {target} ) =>{ 
    setCurrentPage(0);
    setSearch(target.value)
  }

  return (
    <div className="mt-5 container">
      <h1>Listado de Pokemons</h1>
      <hr/>
      <input 
        type="text"
        className="mb-2 form-control"
        placeholder="Buscar Pokemon"
        value={search}
        onChange={ onSearchChange}
      />

      <button 
        className="btn btn-primary"
        onClick={previusPage}
      >
        Anteriores
      </button>

      &nbsp;

      <button 
        className="btn btn-primary"
        onClick={nextPage}
      >
        Siguientes 
      </button>

      <table className="table">
          <thead>
            <tr>
              <th style={{width:100}}>Nombre</th>
              <th style={{width:150}}>ID</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredPokemons().map( ({ id ,name,pic }) => (
                <tr key ={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>
                    <img 
                      src={pic}
                      alt={name}
                      style={{height: 75}}
                    />
                  </td>
                </tr>  
              ))
            }

            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>

          </tbody>
      </table>
    </div>
  )
}

export const getStaticProps = async (context) => {

  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500')

  const data = await response.json();
  const pokemons = data.results

  const pokemonArr  =  pokemons.map( poke =>{

    const pokeArr =  poke.url.split('/')
    const id = pokeArr[6]
    const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`

    return {
      id,
      name: poke.name,
      pic
    }
    
  })

  if(!pokemonArr){
    return {
      notFound: true
    }
  }

  return {
    props:{
      pokemonArr
    }
  }
}