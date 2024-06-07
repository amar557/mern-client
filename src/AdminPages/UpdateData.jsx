import { useState } from "react";

function UpdateData() {
  const [txt, setTxt] = useState("");

  return (
    <div>
      <input
        type="text"
        id="txt"
        onChange={(e) => setTxt(e.target.value)}
        defaultValue={txt}
        className="text-black"
      />
    </div>
  );
}

export default UpdateData;
