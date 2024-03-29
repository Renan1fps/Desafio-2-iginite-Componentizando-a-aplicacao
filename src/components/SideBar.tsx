import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface CategoryId{
  onCategory: (id: number)=> void;
}

export function SideBar({onCategory}: CategoryId) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleChangeSelectedGenreId(id: number){
    setSelectedGenreId(id)
  }

  return(
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>
        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => {onCategory(genre.id), handleChangeSelectedGenreId(genre.id)}}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
  )
}