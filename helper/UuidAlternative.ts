export class UuidAlternative {
  private static numberArray: Array<string> = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  private static characterList: Array<string> = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    ...UuidAlternative.numberArray,
  ];

  public static idGeneratorString = (lengthOfId = 8): string => {
    const lengthOfList: number = this.characterList.length;
    const output: Array<string> = [];
    const lengthOfOutput = lengthOfId;
    for (let i = 0; i < lengthOfOutput; i++) {
      const index = Math.floor(Math.random() * lengthOfList);
      output.push(this.characterList[index]);
    }
    return output.join("");
  };

  private static _idGeneratorString = (lengthOfId: number): string => {
    const lengthOfList: number = this.characterList.length;
    const output: Array<string> = [];
    const lengthOfOutput = lengthOfId;
    for (let i = 0; i < lengthOfOutput; i++) {
      const index = Math.floor(Math.random() * lengthOfList);
      output.push(this.characterList[index]);
    }
    return output.join("");
  };

  private static _idGeneratorNumber = (lengthOfId: number): string => {
    const lengthOfList: number = UuidAlternative.numberArray.length;
    const output: Array<string> = [];
    const lengthOfOutput = lengthOfId;
    for (let i = 0; i < lengthOfOutput; i++) {
      const index = Math.floor(Math.random() * lengthOfList);
      output.push(UuidAlternative.numberArray[index]);
    }
    return output.join("");
  };

  public uuidGenerator = (): string => {
    const idOne = UuidAlternative._idGeneratorString(8);
    const idTwo = UuidAlternative._idGeneratorString(4);
    const idThree = UuidAlternative._idGeneratorString(4);
    const idFour = UuidAlternative._idGeneratorString(4);
    const idFive = UuidAlternative._idGeneratorNumber(12);

    const outputId = `${idOne}-${idTwo}-${idThree}-${idFour}-${idFive}`;

    return outputId;
  };
}

export default new UuidAlternative().uuidGenerator;
