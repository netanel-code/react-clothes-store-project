import styled from 'styled-components';
export const ButtonContainer = styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:solid 0.07rem var(--lightBlue);
border-color:var(--lightBlue);
border-color:${props => props.cart? "var(--mainYellow)":"var(--lightBlue)"};
border-radius:0.5rem;
color:${prop => prop.cart?"var(--mainYellow)":"var(--lightBlue)"};
padding:0.2rem 0.5rem;
margin:0.2rem 0.5rem 0.2rem 0;
transition:0.3s ease-in-out;
&:hover{
    background:${prop => prop.cart? "var(--mainYellow)":"var(--lightBlue)"};
    color:var(--mainWhite);
}
&:focus{
    outline:none;
}

`
