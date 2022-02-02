import { useState, useEffect } from "react";
import { useLocation, useNavigate  } from 'react-router-dom';

import Card from "../components/card/Card";
import Autocomplete from "../components/autocomplete/Autocomplete";
import Loading from "../components/loading/Loading";
import NotFound from "../components/notfound/NotFound";

export default function Pokemon() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.pathname.split('/')[2];

  const [pokemon, setPokemon] = useState(null);
  const [names, setNames] = useState(null);

  useEffect(() => {
    const getPokemon = () => {
      setPokemon(null);
      fetch(`http://localhost:3001/pokemon/byname/${name}`, {
        method: "GET",
        credentials: "include"
      }).then(response => {
        if (response.status === 200)
          return response.json();
        else if (response.status === 404)
          setPokemon({success : false});
        else
          throw new Error("Authentication has failed!");
      }).then(p => {
        p.success = true;
        if (p.front == null) {
          setPokemon(p);
        } else {
          const image = new Image();
          image.onload = () => {
            setPokemon(p);    
          }
          image.src = p.front;
        }
      }).catch(err => {
        console.log(err);
      })
    };
    getPokemon();
  }, [name]);

  useEffect(() => {
    const getNames = () => {
      fetch(`http://localhost:3001/pokemon/names`, {
        method: "GET",
        credentials: "include"
      }).then(response => {
        if (response.status === 200)
          return response.json();
        else
          throw new Error("Authentication has failed!");
      }).then(l => {
        setNames(l);
      }).catch(err => {
        console.log(err);
      })
    };
    getNames();
  }, []);
  
  const random = () => {
    fetch(`http://localhost:3001/pokemon/randoname`, {
      method: "GET",
      credentials: "include"
    }).then(response => {
      if (response.status === 200)
        return response.json();
    }).then(resObject => {
        navigate(`/pokemon/${resObject}`, { replace: false } );
    }).catch(err => {
      console.log(err);
    })
  }

  if (pokemon?.success) {
    return (
      <div className='wrapper'>
        <Card pokemon={pokemon} />
        <Autocomplete names={names} />
        {/* <div className="line">
          <div>
            <input type="text" />
            <button>Submit</button>
          </div>
          <div>
            <button onClick={random}>Random</button>
          </div>
        </div> */}
      </div>
    )
  } else if (pokemon?.success) {
    return <NotFound />
  } else {
    return <Loading />
  }
}