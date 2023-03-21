import styled from "styled-components";

export const FormWrapper = styled.form`
  max-width: 400px;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const InputWrapper = styled.input`
  display: block;
  margin-bottom: 5px;
  width: 100%;
  padding: 5px 7px;
  border: 2px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

export const ButtonWrapper = styled.button`
  cursor: pointer;
  width: 100%;
  display: block;
  background-color: #555;
  border: 0;
  color: #fff;
  border-radius: 5px;
  padding: 7px 0;
`;

export const FormHeader = styled.h1`
  text-align: center;
`;

export const CreateFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
