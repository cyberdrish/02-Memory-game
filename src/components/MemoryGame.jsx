import { useEffect, useState } from "react";
const placeholderimage =
  "https://img.freepik.com/free-photo/gray-painted-background_53876-94041.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727654400&semt=ais_hybrid";

function MemoryGame({ images }) {
  const [shuffledImg, setShuffledImages] = useState([]);
  const [placeholderList, setPlaceHolderList] = useState([]);
  const [sameImageCheck, setSameImageCheck] = useState(null);
  const [startflag, setStartFlag] = useState(0);

  useEffect(() => {
    const doubled = [...images, ...images];
    const shuffled = shuffle(doubled);
    setShuffledImages(shuffled);
    setPlaceHolderList(new Array(shuffled.length).fill(placeholderimage));
  }, [images]);

  function shuffle(array) {
    let currentI = array.length;
    while (currentI !== 0) {
      let randomI = Math.floor(Math.random() * currentI);
      currentI--;
      [array[currentI], array[randomI]] = [array[randomI], array[currentI]];
    }
    return array;
  }

  const handleShowImage = (e, i) => {
    if (placeholderList[i] !== placeholderimage) return;
    setStartFlag((prev) => prev + 1);

    if (sameImageCheck == null) {
      setSameImageCheck({ src: shuffledImg[i], index: i });
      const newList = [...placeholderList];
      newList[i] = shuffledImg[i];
      setPlaceHolderList(newList);
    } else {
      if (i === sameImageCheck.index) return;
      const newList = [...placeholderList];
      newList[i] = shuffledImg[i];
      setPlaceHolderList(newList);

      if (shuffledImg[i] === sameImageCheck.src) {
        setSameImageCheck(null);
      } else {
        setTimeout(() => {
          setPlaceHolderList((prev) => {
            const resetList = [...prev];
            resetList[sameImageCheck.index] = placeholderimage;
            resetList[i] = placeholderimage;
            return resetList;
          });
          setSameImageCheck(null);
        }, 500);
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Memory Game</h1>
        <h1>Total Moves: {startflag}</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {placeholderList.map((img, i) => (
          <img
            src={img}
            key={i}
            alt="card"
            style={{ width: 300, height: 300, padding: 2, cursor: "pointer" }}
            onClick={(e) => handleShowImage(e, i)}
          />
        ))}
      </div>
    </>
  );
}

export default MemoryGame;
