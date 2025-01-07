const SignInButton = () => (
  <div style={{ textAlign: "center", margin: "20px" }}>
    <button
      style={{
        color: "#fff",
        padding: "15px 30px",
        fontSize: "18px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      className="bg-green-600"
    >
      Sign in
    </button>
  </div>
);

export const SignInButtonSmall = () => (
  <div style={{ textAlign: "center", }}>
    <button
      style={{
        color: "#fff",
        padding: "7px 15px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      className="bg-green-600"
    >
      Sign in
    </button>
  </div>
);

export default SignInButton;