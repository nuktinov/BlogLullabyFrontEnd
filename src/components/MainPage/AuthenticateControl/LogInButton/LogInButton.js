import React from 'react';

export default function LogInButton({ authenticatePanelToggle, isPanelOn}) {
  return (
    <button onClick={authenticatePanelToggle}>
      {isPanelOn ? "SIGN IN" : "Sign in"}
    </button>
  )
}