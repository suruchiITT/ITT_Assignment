import "styled-components";

declare module "styled-components" {

export interface DefaultTheme {

colors: {
primary: string;
primaryHover: string;
background: string;
surface: string;
border: string;
text: string;
textLight: string;
};

font: string;

fontSize: string;

radius: string;

spacing: string;

shadow: string;

}

}
