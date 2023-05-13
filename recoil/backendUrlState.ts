import { atom } from "recoil";

export const urls = [
  {
    name: "BiletMajster",
    url: "https://biletmajster.azurewebsites.net",
  },
  {
    name: "Dionizos",
    url: "https://dionizos-backend-app.azurewebsites.net",
  },
  {
    name: "IO2Central",
    url: "http://io2central-env.eba-vfjwqcev.eu-north-1.elasticbeanstalk.com",
  },
  {
    name: "localhost",
    url: "10.0.2.2:8000",
  },
];

export const backendUrlState = atom<string>({
  key: "backendUrlState",
  default: urls[0].url,
});
