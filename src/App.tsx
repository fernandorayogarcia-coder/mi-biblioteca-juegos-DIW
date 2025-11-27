import { useState, useEffect } from 'react';
import { Header } from './componentes/Header/Header';
import { GameList } from './componentes/GameList/GameList';
import { GameForm } from './componentes/GameForm/GameForm';
import './App.css';

interface Game {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  favorite: boolean;
  rating: number;
}

const initialGames: Game[] = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    category: "Aventura",
    completed: true,
    favorite: true,
    rating: 5
  },
  {
    id: 2,
    title: "Super Mario Odyssey",
    category: "Plataformas",
    completed: false,
    favorite: true,
    rating: 4
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    category: "RPG",
    completed: false,
    favorite: false,
    rating: 3
  }
];

function App() {
  const [games, setGames] = useState<Game[]>(() => {
    const savedGames = localStorage.getItem('gamehub-games');
    return savedGames ? JSON.parse(savedGames) : initialGames;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [completionFilter, setCompletionFilter] = useState('todos');

  useEffect(() => {
    localStorage.setItem('gamehub-games', JSON.stringify(games));
  }, [games]);

  const handleDeleteGame = (gameId: number) => {
    setGames(prevGames => prevGames.filter(game => game.id !== gameId));
  };

  const handleEditGame = (gameId: number) => {
    const gameToEdit = games.find(game => game.id === gameId);
    if (gameToEdit) {
      alert(`Modo edición para: ${gameToEdit.title}\n\n(Para el prototipo, esta funcionalidad se implementaría con un formulario de edición)`);
    }
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || game.category === selectedCategory;
    const matchesCompletion = 
      completionFilter === 'todos' || 
      (completionFilter === 'completados' && game.completed) ||
      (completionFilter === 'pendientes' && !game.completed);
    
    return matchesSearch && matchesCategory && matchesCompletion;
  });

  const handleAddGame = (newGameData: Omit<Game, 'id'>) => {
    const newGame: Game = {
      id: Date.now(),
      ...newGameData
    };
    setGames(prevGames => [...prevGames, newGame]);
  };

  const handleClearLibrary = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar toda tu biblioteca? Esta acción no se puede deshacer.')) {
      setGames([]);
    }
  };

  const handleResetLibrary = () => {
    if (window.confirm('¿Restaurar biblioteca a los juegos iniciales?')) {
      setGames(initialGames);
    }
  };

  // ✅ CORRECCIÓN: Calcular estadísticas con TODOS los juegos, no solo los filtrados
  const totalGames = games.length; // ← Cambiado de filteredGames.length
  const completedGames = games.filter(game => game.completed).length; // ← Cambiado
  const favoriteGames = games.filter(game => game.favorite).length; // ← Cambiado

  return (
    <div className="app">
      <Header 
        totalGames={totalGames}
        completedGames={completedGames}
        favoriteGames={favoriteGames}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        completionFilter={completionFilter}
        onCompletionFilterChange={setCompletionFilter}
        onClearLibrary={handleClearLibrary}
        onResetLibrary={handleResetLibrary}
      />
      
      <main className="main-content">
        <GameForm onAddGame={handleAddGame} />
        <GameList 
          games={filteredGames} 
          onDeleteGame={handleDeleteGame}
          onEditGame={handleEditGame}
        />
      </main>
    </div>
  );
}

export default App;