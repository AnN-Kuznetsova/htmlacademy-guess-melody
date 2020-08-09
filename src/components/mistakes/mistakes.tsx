import * as React from "react";


interface Props {
  count: number;
};


export const Mistakes: React.FunctionComponent<Props> = (props: Props) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((mistake, index) => <div key={`mistake-${index}`} className="wrong" />)}
    </div>
  );
};
