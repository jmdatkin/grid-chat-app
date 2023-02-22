import { faArrowRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import '../styles/Tagline.css';

function Tagline(props: any) {

    const lines = [
        "Log in",
        "Join now",
        "Hit the griddy",
        "Join the conversation",
        "Achieve dreams",
        "Hurdle obstacles",
        "Find balance",
        "Cultivate joy",
        "Practice gratitude",
    ];

    const [currentLine, setCurrentLine] = useState(0);

    const [active, setActive] = useState(true);

    const FADE_DURATION = 200;

    useEffect(() => {
        const iid = setInterval(() => {
            let newIdx = currentLine;
            while (newIdx === currentLine)
                newIdx = Math.floor(Math.random() * lines.length);

            setActive(false);
            setTimeout(() => {
                setCurrentLine(newIdx);
                setActive(true);
            }, FADE_DURATION);
        }, 6000);

        return () => clearInterval(iid);
    }, []);

    return (
        <div className={`Tagline ${active ? 'active' : ''} ${props.className} flex items-center space-x-2 transition-opacity duration-${FADE_DURATION}`}>
            <span>{lines[currentLine]}</span>
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
        </div>
    );
}

export default Tagline;