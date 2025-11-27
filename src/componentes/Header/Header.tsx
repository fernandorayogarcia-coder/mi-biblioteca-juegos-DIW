import './Header.css';

interface HeaderProps {
  totalGames: number;
  completedGames: number;
  favoriteGames: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  completionFilter: string;
  onCompletionFilterChange: (filter: string) => void;
  onClearLibrary?: () => void;
  onResetLibrary?: () => void;
}

export function Header({ 
  totalGames, 
  completedGames, 
  favoriteGames, 
  searchTerm, 
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  completionFilter,
  onCompletionFilterChange,
  onClearLibrary,
  onResetLibrary
}: HeaderProps) {
  const pendingGames = totalGames - completedGames;

  const categories = ['todas', 'Aventura', 'Plataformas', 'RPG', 'Shooter', 'Estrategia', 'Deportes'];

  return (
    <header className="header">
      <h1>🎮 GameHub - Mi Biblioteca</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar juegos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label>Categoría:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'todas' ? 'Todas las categorías' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Estado:</label>
          <select 
            value={completionFilter} 
            onChange={(e) => onCompletionFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los juegos</option>
            <option value="completados">✅ Completados</option>
            <option value="pendientes">🕓 Pendientes</option>
          </select>
        </div>

        <div className="management-buttons">
          <button 
            onClick={onResetLibrary}
            className="management-button reset-button"
            title="Restaurar juegos iniciales"
          >
            🔄 Reset
          </button>
          <button 
            onClick={onClearLibrary}
            className="management-button clear-button"
            title="Limpiar toda la biblioteca"
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="stat-number">{totalGames}</span>
          <span className="stat-label">Total Juegos</span>
        </div>
        <div className="stat">
          <span className="stat-number">{completedGames}</span>
          <span className="stat-label">Completados</span>
        </div>
        <div className="stat">
          <span className="stat-number">{pendingGames}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat">
          <span className="stat-number">{favoriteGames}</span>
          <span className="stat-label">Favoritos</span>
        </div>
      </div>
    </header>
  );
}