import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;

  input {
    width: 100%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #24292e;
    vertical-align: middle;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: right 8px center;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    outline: none;
    box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);

    &:hover {
      border-color: #333;
      outline: none;
      box-shadow: 0 0 0 3px rgb(67, 188, 147, 0.3);
    }
  }

  svg {
    margin-right: 8px !important;
  }

  & {
    margin-bottom: 8px !important;
  }
`;
