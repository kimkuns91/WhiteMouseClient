import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {        
        background-color: ${(props) => props.theme.Backgourd01};
    }  
    .Header {
        border-bottom: 1px solid ${(props) => props.theme.Backgourd03}
    }
    .Footer {

    }
    .InnerHTML {
        color:${(props) => props.theme.HeadLine};
    }
    a {
        color:${(props) => props.theme.HeadLine};
    }

    .NavMenu {
        color:${(props) => props.theme.HeadLine};
    }
    .NavMenu:hover {
        color:${(props) => props.theme.Orange};
        transition: all 0.3s;
    }
    .Form {
        background-color: ${(props) => props.theme.Backgourd02};
        border: 1px solid ${(props) => props.theme.Backgourd03}
    }
    .ContentForm {
        background-color: ${(props) => props.theme.Backgourd02};
        border: 1px solid ${(props) => props.theme.Backgourd03}
    }
    .modeChangeWrap {
        border: 1px solid ${(props) => props.theme.Backgourd03}
    }
    .Card .CardBody {
        background-color: ${(props) => props.theme.Backgourd03};
    }
    .BG01 {
        background-color: ${(props) => props.theme.Backgourd01};
    }
    .BG02 {
        background-color: ${(props) => props.theme.Backgourd02};
    }
    .BG03 {
        background-color: ${(props) => props.theme.Backgourd03};
    }
    .ListHead, .ListBody {
        border: 1px solid ${(props) => props.theme.Backgourd03}
    }
    .PostHead {
        border-bottom: 1px solid ${(props) => props.theme.Backgourd03}
    }
    .Btn {
        background-color: ${(props) => props.theme.ButtonColor} !important;
        color:${(props) => props.theme.ButtonTextColor}
    }
    .LargeBtn {
        background-color: ${(props) => props.theme.ButtonColor} !important;
        color:${(props) => props.theme.ButtonTextColor}
    }

    .HL01 {
        color : ${(props) => props.theme.HeadLine};
    }
    .HL02 {
        color : ${(props) => props.theme.HeadLine};
    }
    .HL03 {
        color : ${(props) => props.theme.HeadLine};
    }
    .HL04 {
        color : ${(props) => props.theme.HeadLine};
    }
    .HL05 {
        color : ${(props) => props.theme.HeadLine};
    }
    .HL06 {
        color : ${(props) => props.theme.HeadLine};
    }
    .ST01 {
        color : ${(props) => props.theme.SubTitle};
    }
    .ST02 {
        color : ${(props) => props.theme.SubTitle};
    }
    .BD01 {
        color : ${(props) => props.theme.BodyText};
    }
    .BD02 {
        color : ${(props) => props.theme.BodyText};
    }
    .CT01 {
        color : ${(props) => props.theme.Caption};
    }
    .CT02 {
        color : ${(props) => props.theme.Caption};
    }
    .NT {
        color : ${(props) => props.theme.Orange};
    }
`;

export default GlobalStyle;