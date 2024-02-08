import {render, screen} from '@testing-library/react';
import App from '../App'

describe ('General mounting compononents',() =>{

it ('mounting Welcome component', ()=>{

    render(<App/>)

    const alertWelcome = screen.getByRole('alert')
    expect (alertWelcome).toBeInTheDocument()
})








})


