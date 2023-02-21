import { BeatLoader } from 'react-spinners';
import '../Spinner.css';

function Spinner() {
    return (
        // <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        <BeatLoader/>
    );
}

export default Spinner;