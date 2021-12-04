import React, { MouseEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "cogo-toast";
import qs from "query-string";

function RegisterContent() {
  const location = useLocation();

  let search = qs.parse(location.search) as { token?: string };

  function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (search.token) {
      toast.info(search.token, { position: "bottom-left" });
    } else {
      toast.error("Your registration url isn't valid!", {
        position: "bottom-left",
      });
    }
  }

  useEffect(() => {
    if (search.token) toast.info(search.token, { position: "bottom-left" });
    else
      toast.warn(
        "Your registration url isn't valid, go and get a new registration url from our telegram bot.",
        { hideAfter: 3000, position: "bottom-left" }
      );
  }, [search.token]);

  return (
    <article>
      <form className="mb-0">
        <label htmlFor="email">GitHub personal access token</label>
        <input
          type="text"
          name="personalAccessToken"
          placeholder="Personal access token"
          required
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </article>
  );
}

export default RegisterContent;
