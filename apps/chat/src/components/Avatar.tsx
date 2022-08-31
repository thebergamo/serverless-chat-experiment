import * as randomMC from "random-material-color";
interface Props {
  initials: string;
}

const colorsTable = ["aeiou", "bcdfg", "hjklm", "npqrs", "tvxwyz"];

function getBgClass(initials: string) {
  //   const bgColorHex = randomMC.getColor({ text: initials }).toLowerCase();
  const bgColorHex = colorsTable.find((c) =>
    c.includes(initials[0].toLowerCase())
  );
  const bgColor = `bg-${bgColorHex}`;
  return bgColor;
}
export const Avatar = ({ initials = "UK" }: Props) => {
  const bgColor = getBgClass(initials);
  return (
    <span
      className={`w-10 h-10 border-2 flex justify-center items-center rounded-full ${bgColor}`}
    >
      {initials}
    </span>
  );
};
