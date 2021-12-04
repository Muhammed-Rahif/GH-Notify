import React from "react";
import RegisterContent from "../components/RegisterContent/RegisterContent";

function Register() {
    return (
        <div>
            {/* Header section */}
            <header>
                <h1 className="mb-0">GitHub Notify</h1>
                <small>Register from here!</small>
            </header>
            <hr />
            <RegisterContent />
        </div>
    );
}

export default Register;
