import React from "react";

const Project = () => (
  <>
    <section className="introduction">
      <h1>Introduktion</h1>
      <p>
        I mange år har deling af filer være en almindelig del af hverdagen for både privatpersoner og virksomheder. Men efter introduktionen af GDPR, har virksomheder skulle lede vidt og bredt efter nye måder at dele filer på. Mange virksomheder er pga. deres integration med gamle løsninger tvunget til, at indgå databehandleraftaler, hvis dette overhovedet er muligt.
    </p>
      <p>
        FileCompanion skal være virksomheders foretrukne løsning til fildeling. Det opnår vi ved at levere en løsning, som virksomheder selv kan hoste. Dette fjerner behovet for en databehandleraftale. For at imødekomme GDPR kravene er der taget nøje højde for valget af krypteringsmetoder og, hvor i processen det skal implementeres.
    </p>
      <p>
        Til kryptering af data har vi lavet løsninger der er baseret på både AES med GCM og, den nye ChaCha20 cipher stream. Til styring af processen bliver der anvendt forskellige agile artefakter fra de mest populære frameworks. Udviklingen af løsningen baserer vi på det mest anvendte programmeringssprog, JavaScript.
    </p>
    </section>
    <section className="references">
      <a href="https://github.com/sebkirller/Dissertation" target="_blank" rel="noopener noreferrer">
        <img src="/github.png" alt="Github" />
      </a>
    </section>
  </>
);

export default Project;