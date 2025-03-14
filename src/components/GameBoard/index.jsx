import { useState, useEffect } from 'react';
import styles from './GameBoard.module.css';

import { Card } from '../Card';
import unknown from '/unknown.svg';
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
    const [visibleCards, setVisibleCards] = useState(Array(12).fill(unknown));
    const [prevTry, setPrevTry] = useState(null);
    const [prevIndex, setPrevIndex] = useState(null);
    const [disableButtons, setDisableButtons] = useState(false);

    const revealCard = (index) => {
        const newVisibleCards = [...visibleCards];
        newVisibleCards[index] = ocultCard(index);
        setVisibleCards(newVisibleCards);
    };

    const hideCards = (indexes) => {
        const newVisibleCards = [...visibleCards];
        indexes.forEach((i) => {
            newVisibleCards[i] = unknown;
        });
        setVisibleCards(newVisibleCards);
    };

    const ocultCard = (n) => {
        return shufCardIcons[n];
    };

    const equalCards = (indexes) => {
        let cards = [];
        indexes.forEach((i) => { cards.push(ocultCard(i)) })
        return cards.every((i) => i === cards[0])
    };

    const isFirstTry = () => {
        return prevTry === null;
    };

    const processTries = (indexes) => {
        setDisableButtons(true);

        if (equalCards(indexes)) {
            setScoreCount(scoreCount + 1);
            setDisableButtons(false);
        } else {
            setTimeout(() => {
                hideCards(indexes);
                setDisableButtons(false);
            }, 1000);
        }

        setPrevTry(null);
        setPrevIndex(null);
    };

    const click = (index) => {
        if (visibleCards[index] === unknown && !disableButtons) {
            revealCard(index);
            setFlipCount(flipCount + 1);

            if (isFirstTry()) {
                setPrevTry(ocultCard(index));
                setPrevIndex(index);
            } else {
                processTries([prevIndex, index]);
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
                    <td key={index}>
                        <button className={styles.buttons} onClick={() => click(index)} disabled={disableButtons}>
                            <Card className={styles.card} id={index} src={visibleCards[index]} />
                        </button>
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