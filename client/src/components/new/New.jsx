import React, { useEffect, useState } from "react";
import axios from "axios";

const New = () => {
  const [name, setName] = useState({});

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => setName(res.data.users))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <h1>
        {name.map((item) => (
          <div>
            {item.firstName} {item.lastName}
          </div>
        ))}
      </h1>
    </div>
  );
};

export default New;
