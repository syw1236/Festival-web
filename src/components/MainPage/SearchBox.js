import React, { useState } from "react";
import festivalsData from "../../data/festivalsData";

// ... (other imports and styled components)

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

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
      .slice(0, 5);

    setAutocompleteResults(results);
  };

  const handleAutocompleteClick = (id, name) => {
    setSearchTerm(name);
    setSelectedId(id);
    setShowAutocomplete(false);
  };

  const handleSearchClick = () => {
    if (selectedId !== null) {
      // 페이지 이동
      window.location.href = `/festival/${selectedId}`;
    } else {
      // 검색 결과만 출력
      search(searchTerm);
    }
  };

  const search = (term) => {
    // 검색 로직 구현 (기존 코드 참조)
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowAutocomplete(true)}
          placeholder="검색어를 입력하세요..."
          style={{ width: "300px", height: "30px" }}
        />
        <button onClick={handleSearchClick}>검색</button>
        {showAutocomplete && autocompleteResults.length > 0 && (
          <ul
            style={{
              background: "red",
              listStyleType: "none",
              padding: 0,
              position: "absolute",
              top: "40px", // Adjust the distance from the input
              left: 0,
              width: "300px", // Set the width to match the input
              maxHeight: "150px",
              overflowY: "auto",
              zIndex: 1,
            }}
          >
            {autocompleteResults.map((result) => (
              <li key={result.id} onClick={() => handleAutocompleteClick(result.id, result.name)}>
                {result.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
