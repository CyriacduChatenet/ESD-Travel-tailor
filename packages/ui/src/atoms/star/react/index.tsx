import { FC } from 'react'

export const WebStar: FC = () => {
  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '1.5em',
        height: '1.5em',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        style={{ width: '100%', height: '100%', fill: 'currentColor' }}
      >
        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
      </svg>
    </span>
  )
}
