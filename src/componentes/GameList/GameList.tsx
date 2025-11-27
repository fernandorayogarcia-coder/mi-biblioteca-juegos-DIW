import { GameCard } from '../GameCard/GameCard';
import './GameList.css';

interface Game {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  favorite: boolean;
  rating: number;
}

interface GameListProps {
  games: Game[];
  onDeleteGame: (gameId: number) => void;
  onEditGame: (gameId: number) => void; // ← AÑADIR esta línea
}

export function GameList({ games, onDeleteGame, onEditGame }: GameListProps) {
  return (
    <div className="game-list">
      <h2>Mi Biblioteca de Juegos ({games.length})</h2>
      {games.length === 0 ? (
        <p className="no-games">No se encontraron juegos. ¡Agrega algunos!</p>
      ) : (
        <div className="games-container">
          {games.map(game => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              category={game.category}
              completed={game.completed}
              favorite={game.favorite}
              rating={game.rating}
              onDelete={onDeleteGame}
              onEdit={onEditGame} // ← Esta prop ya existe
            />
          ))}
        </div>
      )}
    </div>
  );
}