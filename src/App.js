import React, { useState, useEffect } from 'react';

function App() {
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    fetchNewDeck();
  }, []);

  const fetchNewDeck = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeckId(data.deck_id);
      setRemaining(data.remaining);
    } catch (error) {
      console.error('Error fetching new deck:', error);
    }
  };

  const drawCard = async () => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();
      if (data.cards.length === 0) {
        alert('Error: no cards remaining!');
      } else {
        setCardImage(data.cards[0].image);
        setRemaining(data.remaining);
      }
    } catch (error) {
      console.error('Error drawing card:', error);
    }
  };

  const shuffleDeck = async () => {
    try {
      setIsShuffling(true);
      setCardImage(null); // Clear the card image
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      const data = await response.json();
      setRemaining(data.remaining);
      setIsShuffling(false);
    } catch (error) {
      console.error('Error shuffling deck:', error);
      setIsShuffling(false);
    }
  };

  return (
    <div className="App">
      <h1>Click to Draw</h1>
      <button onClick={drawCard} disabled={!remaining || isShuffling}>Draw Card</button>
      <button onClick={shuffleDeck} disabled={!remaining || isShuffling}>Shuffle Deck</button>
      {cardImage && <img src={cardImage} alt="Card" />}
    </div>
  );
}

export default App;
