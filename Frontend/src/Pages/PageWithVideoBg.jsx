import bgVideo from "../assets/bg-video.mp4";

const PageWithVideoBg = ({ children }) => {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Optional overlay to keep text readable */}
      <div className="fixed inset-0 bg-black/50 -z-10"></div>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
};

export default PageWithVideoBg;
