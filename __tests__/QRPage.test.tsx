import renderer from "react-test-renderer";
import { RecoilRoot } from "recoil";
import ModalScreen from "../app/QRPage";

jest.mock("expo-router", () => ({
  useNavigation: jest.fn().mockImplementation(() => {
    return { setOptions: jest.fn() };
  }),
}));

it("renders correctly", () => {
  const tree = renderer
    .create(
      <RecoilRoot>
        <ModalScreen />
      </RecoilRoot>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
