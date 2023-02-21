import { useRef } from "react";

function RandomEmoji(props: any) {

    const EMOJIS = [
        '😀',
        '😁',
        '😎',
        '😊',
        '🤗',
        '🥰',
        '😄',
        '😴',
        '🤑',
        '🥶',
        '🤠',
        '😈',
        '👽',
        '👾',
        '🐸'
    ];

    const emoji = useRef(EMOJIS[Math.floor(Math.random()*EMOJIS.length)]);

    return ( 
        <span>
            {emoji.current}
        </span>
     );
}

export default RandomEmoji;