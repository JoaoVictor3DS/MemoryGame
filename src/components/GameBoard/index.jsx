import { useState, useEffect } from 'react';
import styles from './GameBoard.module.css';

import { Card } from '../Card';
import pon from '/pieces/pon.svg';
import king from '/pieces/king.svg';
import queen from '/pieces/queen.svg';
import bishop from '/pieces/bishop.svg';
import knight from '/pieces/knight.svg';
import tower from '/pieces/tower.svg';

import './GameBoard.module.css';

// TODO: add ocult icon, ocult incorrect pair, add a timer, add a reset button, add animations

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
    const [flippedCards, setFlippedCards] = useState(Array(12).fill(false));
    const [prevIndex, setPrevIndex] = useState(null);
    const [disabledButtons, setDisabledButtons] = useState(false);

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

    const rowSize = 4;
    const rowCount = 3;
    const renderButtons = () => {
        let buttons = [];
        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < rowSize; j++) {
                const index = i * rowSize + j;
                row.push(
                    <td key={index} onClick={() => handleClick(index)}>
                        <Card src={ocultCard(index)} flipped={flippedCards[index]} />
                    </td>
                );
            }
            buttons.push(<tr key={i}>{row}</tr>);
        }
        return buttons;
    };

    return (
        <div className='GameBoard'>
            <h2>Flips: {flipCount}</h2>
            <h2>Score: {scoreCount}</h2>
            <table>
                <tbody>
                    {renderButtons()}
                </tbody>
            </table>
        </div>
    );
};