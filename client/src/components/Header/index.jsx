import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../../context"

const Header = () => {
  const { token, logout } = useAuth()

  return (
    <Wrapper>
      <List>
        <div className="left">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {token ? (
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </div>
        {token ? (
          <li>
            <p onClick={logout}>Logout</p>
          </li>
        ) : null}
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
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  li {
    padding-right: 1rem;
    &:last-child {
      padding-right: 0;
    }
    a,
    p {
      cursor: pointer;
      transition: all 250ms linear;
      &:hover {
        color: rgb(216, 74, 245);
      }
      &.active {
        color: rgb(216, 74, 245, 0.7);
      }
    }
  }
`
