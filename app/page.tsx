import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-6xl font-bold">Welcome to Paradigm Clan!</h1>
            <p className="mb-5">
              Paradigm Clan is a platform for students to learn and grow. We
              provide resources for students to learn and grow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
