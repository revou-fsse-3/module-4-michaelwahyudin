const Icon = () => {
  return (
    <>
      <div className="flex gap-5 justify-center items-center m-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="60"
          height="60"
          viewBox="0 0 48 48"
        >
          {/* Smiley face icon */}
          <circle cx="24" cy="24" r="20" fill="#FFC107" />
          <circle cx="17" cy="20" r="2" fill="#000" />
          <circle cx="31" cy="20" r="2" fill="#000" />
          <path d="M16 30h16v2H16z" fill="#000" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="60"
          height="60"
          viewBox="0 0 48 48"
        >
          {/* Heart icon */}
          <path fill="#F44336" d="M24 44l-4-4-4 4V28H8v-4h4V12h4v4h4V12h4v12h4z" />
        </svg>
      </div>
    </>
  );
};

export default Icon;
