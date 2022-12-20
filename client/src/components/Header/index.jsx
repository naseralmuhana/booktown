import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Header = () => {
  return (
    <Wrapper>
      <List>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </List>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.header`
  width: 100%;
  height: 5rem;
  margin-bottom: 1rem;

  background-color: #212121;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.5);
`
const List = styled.ul`
  width: 80%;
  height: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  li {
    padding-right: 1rem;
    &:last-child {
      padding-right: 0;
    }
    a {
      transition: all 250ms linear;
      &:hover {
        color: #c330e0;
      }
      &.active {
        color: #ea91fa;
      }
    }
  }
`
