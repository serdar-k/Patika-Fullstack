import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

const StyledLang = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.25rem;

  & > div:hover {
    transform: scale(1.1);
    transition: all 0.3s;
    cursor: pointer;
  }
`;

export function LangSelect() {
  const { i18n } = useTranslation();

  const selectLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("app-lang", lang);
  };

  return (
    <StyledLang>
      <div>
        <img
          src="https://flagcdn.com/w20/tr.jpg"
          width="28"
          alt="Turkish"
          onClick={() => selectLanguage("tr")}
        ></img>
      </div>
      <div>
        <img
          src="https://flagcdn.com/w20/us.png"
          width="28"
          alt="English"
          onClick={() => selectLanguage("us")}
        ></img>
      </div>
    </StyledLang>
  );
}
