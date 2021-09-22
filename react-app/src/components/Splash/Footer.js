import styled from "styled-components";

const FooterContainer = styled.footer`
    background: black;
    display: flex;
    color: white;
    justify-content: center;
`

const FooterContentContainer = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;
    max-width: 85%;
    width: 900px;
`

const FooterContent = styled.div`
    align-items: center;
    display: flex;
    padding: 10px 0;
    font-size: 14px;

    a {
        color: white;
        margin-left: 20px;
        font-size: 20px;
    }

    a:hover {
        color: lightgrey;
    }


`;


const Footer = () => {
    return (
        <FooterContainer>

            <FooterContentContainer>
                <FooterContent>
                    <p className='copy'>&copy; Copyright 2021, veryKenny-Labs</p>
                </FooterContent>
                <FooterContent>
                    <p>Kenneth Donahue</p>
                    <a href='https://github.com/veryKenny' target='blank'>
                        <i className="fab fa-github-square icon"></i>
                    </a>
                    <a href='https://www.linkedin.com/in/kenneth-donahue/' target='blank'>
                        <i className="fab fa-linkedin icon"></i>
                    </a>
                </FooterContent>
            </FooterContentContainer>
        </FooterContainer>
    )
}

export default Footer;
