"use client";
import * as React from "react";
import './styles.scss';

const data = [
  {
    title: "Paramétrez votre CRA en 3 clicks",
    description:
      "Sélectionnez votre période, le prestataire qui réalise la mission et le client pour lequel vous travaillez : votre CRA est créé et prêt à être rempli.",
    video: "https://advaitlabs.com/wp-content/uploads/2025/03/WhatsApp-Video-2025-03-07-at-17.07.23_1f1b70b9.mp4",
  },
  {
    title: "Saissisez vos temps sans effort",
    description:
      "Que vous travailliez à l’heure ou à la journée, Timizer vous permet de remplir simplement et rapidement les temps que vous avez passés quotidiennement sur votre mission sur votre CRA.",
    video: "https://advaitlabs.com/wp-content/uploads/2025/03/WhatsApp-Video-2025-03-07-at-17.07.23_1f1b70b9.mp4",
  },
  {
    title: "Exportez votre CRA au format PDF",
    description:
      "Chaque fin de mois, générez un PDF contenant toutes les informations utiles de la mission, en y intégrant votre signature, avant de le soumettre à la validation de votre client.",
    video: "https://advaitlabs.com/wp-content/uploads/2025/03/WhatsApp-Video-2025-03-07-at-17.07.23_1f1b70b9.mp4",
  },
  {
    title: "Faites-le signer par votre client",
    description:
      "Une fois votre CRA validé, plus besoin de l’imprimer : partagez-le à votre client et faites-le signer directement en ligne depuis l’application Timizer dans une interface dédiée et sécurisée.",
    video: "https://advaitlabs.com/wp-content/uploads/2025/03/WhatsApp-Video-2025-03-07-at-17.07.23_1f1b70b9.mp4",
  },
];

const About = () => {
  const [active, setActive] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const videoRefs = React.useRef<HTMLVideoElement[] | null[]>([]);

  const handleShow = (index: number) => {
    setActive(index);
    setProgress(0);
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const updateProgress = () => {
    const video = videoRefs.current[active];
    if (video) {
      setProgress((prev) => (video.currentTime / video.duration) * 100);
    }
  };
  

  const handleVideoEnd = () => {
    setActive((prevActive) => {
      const nextActive = (prevActive + 1) % data.length;
      const nextVideo = videoRefs.current[nextActive];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play();
      }
      return nextActive;
    });
    setProgress(0);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 pt-16 xl:p-24 bg-white">
    <div className="w-full max-w-7xl flex flex-col xl:flex-row gap-6 items-center">
      <div className="space-y-4 w-full xl:w-5/12">
        {data.map((item, index) => (
          <button
            key={item.title}
            className={`
              relative bg-white border border-slate-50 py-6 px-4 rounded-2xl cursor-pointer overflow-hidden w-full duration-300 opacity-50
              ${active === index && "bg-yellow-50 border-white !opacity-100"}
            `}
            onClick={() => handleShow(index)}
            //onMouseEnter={() => handleShow(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleShow(index);
              }
            }}
          >
            <div className="w-full flex items-center justify-start gap-4">
              <div
                className={`w-10 h-10 shrink-0 border rounded-lg flex items-center justify-center duration-300
                ${
                  active === index
                    ? "bg-blue-600 text-white border-white"
                    : "bg-white"
                }
              `}
              >
                {index + 1}
              </div>
              <h3
                className={`
                  text-left font-bold text-xl leading-6
                  ${active === index ? "text-abyss" : "text-grey-light"}
                `}
              >
                {item.title}
              </h3>
            </div>
            <div
              className={`description
              ${active === index && "active"}
              `}
            >
              <p className=" text-base text-grey-light leading-6 text-left">
                {item.description}
              </p>
            </div>
            {active === index && (
              <div
                className="transition-all"
                style={{
                  width: `${progress}%`,
                  height: "5px",
                  background: "rgb(26, 115, 232)",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  transitionDuration: "0.5s",
                }}
              ></div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-3xl overflow-hidden  w-full xl:w-7/12 bg-blur-background border border-white backdrop-blur-2xl h-[560px] flex flex-col">
        {data.map((item, index) => (
          <div
            key={item.title}
            className="relative w-full h-[560px] shrink-0 bg-slate-50 flex items-center justify-center p-4 duration-300"
            style={{
              transform: `translateY(-${active * 100}%)`,
            }}
          >
            <video
  ref={(el) => {
    videoRefs.current[index] = el;
  }}
  className="w-full h-full object-cover rounded-2xl"
  autoPlay
  loop={false}
  muted
  onTimeUpdate={updateProgress}  
  onEnded={handleVideoEnd}
>
  <source src={item.video} type="video/mp4" />
</video>

          </div>
        ))}
      </div>
    </div>
  </main>
  );
};

export default About;
