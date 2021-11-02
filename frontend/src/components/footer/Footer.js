import { FaLinkedinIn } from "react-icons/fa";

function Footer() {

    return (
        <div className="footer p-2">
            <div className="d-flex justify-content-around">
                <div className="p-1">
                    <p>Goode Brill Solutions © 2021</p>
                </div>
                <div className="p-1">
                    <div>
                        <label>Hugh Goode</label>
                        <div><a href="https://www.linkedin.com/in/hugh-goode-2a243946/" target="_blank"><FaLinkedinIn /></a></div>
                    </div>
                    <div>
                        <label>Matthew Brillantes</label>
                        <div><a href="https://www.linkedin.com/in/mattbrill12/" target="_blank"><FaLinkedinIn /></a></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer;