import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

export class Contact extends Component {
    render() {
        return (
            <div>
                <div className="w-100">
                    <div className="h-100 w-75 p-5 bg-secondary text-dark border rounded-3 m-auto mt-5">
                        <h2 className="mt-3">Skontaktuj się z nami!</h2>
                        <p>W razie jakichkolwiek problemów lub komentarzy, zgłoś je do nas na adres mailowy:<br/> <br/> <i> <a style={{textDecoration:'none'}} href="mailto:matfizowski@gmail.com" className="text-light"> doesnotmatter@gmail.com </a></i></p>
                        <Link className="btn btn-dark mt-3" type="button" to="/">Powrót do strony głównej</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
