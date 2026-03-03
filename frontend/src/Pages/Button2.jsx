import React from 'react';
import styled from 'styled-components';

const Button2 = () => {
  return (
    <StyledWrapper>
      <button className="styled-button">
        Register
        <div className="inner-button">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            width="18px"
            className="icon"
          >
            <defs>
              <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient">
                <stop style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} offset="0%" />
                <stop style={{ stopColor: '#AAAAAA', stopOpacity: 1 }} offset="100%" />
              </linearGradient>
            </defs>
            <path
              fill="url(#iconGradient)"
              d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
            />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .styled-button {
    position: relative;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(to bottom, #171717, #242424);
    border-radius: 9999px;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 1),
      0 6px 12px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #292929;
  }

  .styled-button::before {
    content: "";
    position: absolute;
    top: -2px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    background: linear-gradient(to bottom, #292929, #000000);
    z-index: -1;
    border-radius: 9999px;
  }

  .styled-button:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 1),
      0 4px 8px rgba(0, 0, 0, 0.4);
  }

  .inner-button {
    position: relative;
    width: 28px;
    height: 28px;
    margin-left: 8px;
    border-radius: 50%;
    background: linear-gradient(to bottom, #171717, #242424);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #252525;
    transition: all 0.2s ease;
  }

  .inner-button::before {
    content: "";
    position: absolute;
    inset: -2px -1px -1px -1px;
    background: linear-gradient(to bottom, #292929, #000000);
    z-index: -1;
    border-radius: 9999px;
  }

  .icon {
    filter: drop-shadow(0 6px 10px rgba(26, 25, 25, 0.9))
      drop-shadow(0 0 3px rgba(0, 0, 0, 1));
    transition: all 0.4s ease-in-out;
  }

  .icon:hover {
    transform: rotate(-35deg);
  }
`;

export default Button2;
