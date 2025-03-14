import 'bootstrap/dist/css/bootstrap.min.css';

import './Card.module.css'

export const Card = (props) => {
    return (
        <div>
            <img className='bg-white' src={props.src} alt="picture" />
        </div>
    )
}