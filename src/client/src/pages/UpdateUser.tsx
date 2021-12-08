import React from "react";
import UpdateUserContent from "../components/UpdateUserContent/UpdateUserContent";

function UpdateUser() {
    return (
        <div>
            {/* Header section */}
            <header>
                <h1 className="mb-0">GitHub Notify</h1>
                <small>Update your data from here!</small>
            </header>
            <hr />
            <UpdateUserContent />
        </div>
    );
}

export default UpdateUser;
