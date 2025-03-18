import { use, useState } from 'react';
import { Card } from '../Card';
import { Victory } from '../Victory';
import pon from '/pieces/pon.svg';
import king from '/pieces/king.svg';
import queen from '/pieces/queen.svg';
import bishop from '/pieces/bishop.svg';
import knight from '/pieces/knight.svg';
import tower from '/pieces/tower.svg';

// import './GameBoard.module.css';

// TODO: add ocult icon, ocult incorrect pair, add a timer, add a reset button, add animations
const CARDS_NUM = 12;
const ordCardIcons = [pon, king, queen, bishop, knight, tower];
let shufCardIcons = [].concat(ordCardIcons, ordCardIcons);

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

shufCardIcons = shuffle(shufCardIcons);

export const GameBoard = () => {
    const [flipCount, setFlipCount] = useState(0);
    const [scoreCount, setScoreCount] = useState(0);
    const [flippedCards, setFlippedCards] = useState(Array(CARDS_NUM).fill(false));
    const [prevIndex, setPrevIndex] = useState(null);
    const [disabledButtons, setDisabledButtons] = useState(false);
    const [victory, setVictory] = useState(false)

    const ocultCard = (n) => {
        return shufCardIcons[n];
    };

    const toggleCard = (i) => {
        const newFlippedCards = flippedCards;
        newFlippedCards[i] = !flippedCards[i];
        setFlippedCards(newFlippedCards);
    };

    const equalCards = (indexes) => {
        let cards = [];
        indexes.forEach((i) => { cards.push(ocultCard(i)); });
        return cards.every((i) => i === cards[0]);
    };

    const isFirstTry = () => {
        return prevIndex === null;
    };

    const processTries = (prev, act) => {
        setDisabledButtons(true);

        if (equalCards([prev, act])) {
            setScoreCount(scoreCount + 1);
            setDisabledButtons(false);
            verifyVictory();
        } else {
            setTimeout(() => {
                toggleCard(prev);
                toggleCard(act);
                setDisabledButtons(false);
            }, 1000);
        }

        setPrevIndex(null);
    };

    const handleClick = (i) => {
        if (flippedCards[i] === false && !disabledButtons) {
            toggleCard(i);
            setFlipCount(flipCount + 1);

            if (isFirstTry()) {
                setPrevIndex(i);
            } else {
                processTries(prevIndex, i);
            }
        }
    };

    const verifyVictory = () => {
        if (flippedCards.every((i) => i === true)) {
            setVictory(true)
        }
    }

    const renderVictory = () => {
        if (victory === true) {
            return (
                <Victory />
            )
        }
    }

    const resetBoard = () => {
        const newFlippedCards = Array(CARDS_NUM).fill(false);
        setFlippedCards(newFlippedCards);
        shufCardIcons = shuffle(shufCardIcons);
        setFlipCount(0);
        setScoreCount(0);
        setVictory(false);
    }

    const rowSize = CARDS_NUM / 3;
    const rowCount = CARDS_NUM / 4;
    const renderButtons = () => {
        let buttons = [];
        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < rowSize; j++) {
                const index = i * rowSize + j;
                row.push(
                    <td key={index} className="m-1 p-1" onClick={() => handleClick(index)}>
                        <Card src={ocultCard(index)} flipped={flippedCards[index]} />
                    </td>
                );
            }
            buttons.push(<tr key={i}>{row}</tr>);
        }
        return buttons;
    };

    return (
        <div>
            <div className="justify-content-center">
                <div className="text-center">
                    <h2>Flips: {flipCount}</h2>
                </div>
                <div className="text-center">
                    <h2>Score: {scoreCount}</h2>
                </div>
            </div>
            <table className="d-flex m-3 p-3 justify-content-center">
                <tbody>
                    {renderButtons()}
                </tbody>
            </table>
            <div className="m-1 p-1 text-center justify-content-center">
                <button className="btn btn-warning" onClick={resetBoard}>
                    Reset
                </button>
            </div>
            <div>
                {renderVictory()}
            </div>
        </div>
    );
};