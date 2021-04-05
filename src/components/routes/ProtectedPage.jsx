import React from "react";

function ProtectedPage() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>That's Not Fair!</h1>
      <p style={{ textAlign: "center" }}>
        You're trying to access protected page!
      </p>
      <p style={{ textAlign: "center" }}>Kindly login to access this page :)</p>
    </div>
  );
}

export default ProtectedPage;
