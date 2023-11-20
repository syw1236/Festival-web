import React, { useState, useEffect, useRef } from "react";
import festivalsData from "../../data/festivalsData";
import { FaSearch } from "react-icons/fa";
import "../../css/SearchBox.css";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.trim() !== "") {
      createAutocompleteResults(newSearchTerm);
      setShowAutocomplete(true);
    } else {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    }
  };

  const createAutocompleteResults = (term) => {
    const results = festivalsData
      .filter((festival) => festival.name.toLowerCase().includes(term))
      .map((festival) => ({ id: festival.id, name: festival.name }))
      .slice(0, 10);

    setAutocompleteResults(results);
  };

  const handleAutocompleteClick = (id, name) => {
    setSearchTerm(name);
    setSelectedId(id);
    setShowAutocomplete(false);
  };

  const handleSearchClick = () => {
    if (selectedId !== null) {
      window.location.href = `/festival_detail/${selectedId}`;
    } else {
      search(searchTerm);
    }
  };

  const handleMoreSearchClick = () => {
    window.location.href = "/SearchList";
  };

  const search = (term) => {};

  return (
    <div ref={searchContainerRef} className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowAutocomplete(true)}
        placeholder="어떤 축제로 떠나볼까요?"
        className="search-input"
      />
      <FaSearch onClick={handleSearchClick} className="search-icon" />
      <button onClick={handleMoreSearchClick}>더 많은 축제 검색해보기</button>
      {showAutocomplete && autocompleteResults.length > 0 && (
        <ul className="autocomplete-list">
          {autocompleteResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleAutocompleteClick(result.id, result.name)}
            >
              <span className="search-icon">
                <FaSearch />
              </span>
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
