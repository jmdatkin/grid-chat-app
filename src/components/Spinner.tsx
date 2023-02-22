import { BeatLoader } from 'react-spinners';
import '../Spinner.css';

function Spinner() {
    return (
        // <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        <BeatLoader color="rgb(209 213 219)"/>
    );
}

export default Spinner;