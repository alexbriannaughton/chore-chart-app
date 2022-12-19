import styled from "styled-components";

const COLORS = {
    primary: {
        "--main": "rgb(242, 98, 255)",
        "--accent": "white",
        "--accent2": "rgb(250, 194, 255)"
    },
    secondary: {
        "--main": "chartreuse",
        "--accent": "black",
        "--accent2": "whitesmoke"
    },
};

function Button({ variant = "fill", color = "primary", ...props }) {
    let Component;
    if (variant === "fill") {
        Component = FillButton;
    } else if (variant === "outline") {
        Component = OutlineButton;
    }

    return <Component style={COLORS[color]} {...props} />;
}

const ButtonBase = styled.button`
  cursor: pointer;
  font-size: 1rem;
  /* border: 7px groove rgb(250, 194, 255); */
  border-radius: 10px;
  padding: 4px 10px;
  text-decoration: none;

`;

const FillButton = styled(ButtonBase)`
  background-color: var(--main);
  color: var(--accent);
  border: 7px groove var(--accent2);

  &:active {
  border-style: ridge;
  
}
span {
  position: relative;
}
span:active {
  top: 2px;
  left: 1px;
}
`;

const OutlineButton = styled(ButtonBase)`
  background-color: white;
  color: var(--main);
  border: 2px solid var(--main);

  &:hover {
    background: hsl(235deg 85% 97%);
  }
`;

export default Button;