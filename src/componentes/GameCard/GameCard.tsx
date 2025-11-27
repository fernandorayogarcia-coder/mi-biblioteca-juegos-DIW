import { useState } from 'react';
import './GameCard.css';

interface GameCardProps {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  favorite: boolean;
  rating: number;
  onDelete: (gameId: number) => void;
  onEdit: (gameId: number) => void;
}

export function GameCard({ 
  id, 
  title, 
  category, 
  completed, 
  favorite, 
  rating, 
  onDelete,
  onEdit
}: GameCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${title}"?`)) {
      onDelete(id);
    }
  };

  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <div className="game-card">
      <div className="game-card-header" onClick={toggleDetails}>
        <h3>{title}</h3>
        <button className="toggle-button" onClick={(e) => { e.stopPropagation(); toggleDetails(); }}>
          {showDetails ? '▲' : '▼'}
        </button>
      </div>
      
      <p><strong>Categoría:</strong> {category}</p>
      <p><strong>Estado:</strong> {completed ? '✅ Completado' : '🕓 Pendiente'}</p>
      
      {showDetails && (
        <div className="game-details">
          <p><strong>Favorito:</strong> {favorite ? '⭐ Sí' : '☆ No'}</p>
          <p><strong>Puntuación:</strong> {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} ({rating}/5)</p>
          <div className="details-actions">
            <button className="action-button edit-button" onClick={handleEdit}>
              📝 Editar
            </button>
            <button 
              className="action-button delete-button" 
              onClick={handleDelete}
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}