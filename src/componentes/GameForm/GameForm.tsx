import { useState } from 'react';
import './GameForm.css';

interface GameFormProps {
  onAddGame: (game: {
    title: string;
    category: string;
    completed: boolean;
    favorite: boolean;
    rating: number;
  }) => void;
}

export function GameForm({ onAddGame }: GameFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Aventura');
  const [completed, setCompleted] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Por favor, ingresa un título para el juego');
      return;
    }

    onAddGame({
      title: title.trim(),
      category,
      completed,
      favorite,
      rating
    });

    setTitle('');
    setCategory('Aventura');
    setCompleted(false);
    setFavorite(false);
    setRating(3);
  };

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <h3>➕ Agregar Nuevo Juego</h3>
      
      <div className="form-group">
        <label>Título del Juego:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: The Legend of Zelda"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Categoría:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="Aventura">Aventura</option>
          <option value="Plataformas">Plataformas</option>
          <option value="RPG">RPG</option>
          <option value="Shooter">Shooter</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Deportes">Deportes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Puntuación:</label>
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              className={`rating-star ${star <= rating ? 'active' : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
          <span className="rating-text">{rating} estrellas</span>
        </div>
      </div>

      <div className="form-checkboxes">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          ✅ Completado
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={favorite}
            onChange={(e) => setFavorite(e.target.checked)}
          />
          ⭐ Favorito
        </label>
      </div>

      <button type="submit" className="submit-button">
        Agregar a la Biblioteca
      </button>
    </form>
  );
}